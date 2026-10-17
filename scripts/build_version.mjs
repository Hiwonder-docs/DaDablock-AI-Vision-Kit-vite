import { rm, cp, writeFile, rename } from 'fs/promises'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { execSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = join(__dirname, '..')

const version = process.argv[2]
if (!version) {
  console.error('Usage: node scripts/build_version.mjs <version>')
  console.error('Example: node scripts/build_version.mjs latest')
  process.exit(1)
}

const validVersions = ['latest', 'standard-kit', 'advanced-kit', 'ultimate-kit']
if (!validVersions.includes(version)) {
  console.error(`Invalid version: ${version}`)
  console.error(`Valid versions: ${validVersions.join(', ')}`)
  process.exit(1)
}

const projectName = 'DaDablock-AI-Vision-Kit'
const docsBase = `/projects/${projectName}/en/${version}/`
const missingMediaPlaceholder =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221%22 height=%221%22 viewBox=%220 0 1 1%22%3E%3C/svg%3E'
function resolveContentDir(version) {
  const directContentDir = join(repositoryRoot, 'content', version)
  if (existsSync(directContentDir)) {
    return directContentDir
  }

  console.error(`Content directory not found for version: ${version}`)
  process.exit(1)
}

async function normalizeWorkingDocFilenames(docsDocsDir) {
  const source = join(docsDocsDir, '1_Kit_Overview.md')
  const target = join(docsDocsDir, '1_Product_Introduction.md')
  if (existsSync(source) && !existsSync(target)) {
    await rename(source, target)
  }
}

function getMarkdownFiles(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => join(dir, entry.name))
}

function resolveMarkdownAsset(markdownFile, src) {
  return join(dirname(markdownFile), src.replace(/\//g, '\\'))
}

function normalizeMissingMediaPath(markdownFile, src) {
  if (!src.startsWith('../_static/media/') || existsSync(resolveMarkdownAsset(markdownFile, src))) {
    return src
  }

  const candidates = [
    src.replace(/\/section_(\d+)\/media\//g, '/section_$1/'),
    src.replace(/\/chapter_1\/section_\d+\/media\//g, '/chapter_1/')
  ]

  return candidates.find((candidate) => existsSync(resolveMarkdownAsset(markdownFile, candidate))) || missingMediaPlaceholder
}

function normalizeWorkingMediaPaths(docsDocsDir) {
  for (const markdownFile of getMarkdownFiles(docsDocsDir)) {
    const text = readFileSync(markdownFile, 'utf-8')
    const updated = text.replace(/src="([^"]+)"/g, (match, src) => {
      const normalizedSrc = normalizeMissingMediaPath(markdownFile, src)
      return normalizedSrc === src ? match : `src="${normalizedSrc}"`
    })

    if (updated !== text) {
      writeFileSync(markdownFile, updated, 'utf-8')
    }
  }
}

console.log(`\n========== Building ${version} ==========`)
console.log(`DOCS_BASE: ${docsBase}`)

// 1. Copy content to docs working directory
const contentDir = resolveContentDir(version)
const docsDir = join(repositoryRoot, 'docs')
const docsDocsDir = join(docsDir, 'docs')
const docsStaticDir = join(docsDir, '_static')
const docsRootIndex = join(docsDir, 'index.md')
const contentRootIndex = join(contentDir, 'index.md')

console.log('\n[1/3] Copying content files...')
await rm(docsDocsDir, { recursive: true, force: true })
await rm(docsStaticDir, { recursive: true, force: true })
if (existsSync(docsRootIndex)) {
  await rm(docsRootIndex, { force: true })
}
await cp(join(contentDir, 'docs'), docsDocsDir, { recursive: true })
await cp(join(contentDir, '_static'), docsStaticDir, { recursive: true })
await normalizeWorkingDocFilenames(docsDocsDir)
normalizeWorkingMediaPaths(docsDocsDir)
if (existsSync(contentRootIndex)) {
  await cp(contentRootIndex, docsRootIndex)
} else {
  await writeFile(
    docsRootIndex,
    `---\nlayout: page-redirect\nredirectTo: /docs/index.html\n---\n\nRedirecting to content page...\n`,
    'utf-8'
  )
}
console.log('  Done.')

// 2. Build with VitePress
console.log('\n[2/3] Building with VitePress...')
execSync('npx vitepress build docs', {
  stdio: 'inherit',
  cwd: repositoryRoot,
  env: { ...process.env, DOCS_BASE: docsBase, DOCS_VERSION: version }
})
console.log('  Done.')

// 3. Stage to projects directory
console.log('\n[3/3] Staging to projects directory...')
execSync('node scripts/stage_main_site.mjs', {
  stdio: 'inherit',
  cwd: repositoryRoot,
  env: { ...process.env, DOCS_VERSION: version }
})
console.log('  Done.')


console.log(`\n========== ${version} build complete ==========\n`)
