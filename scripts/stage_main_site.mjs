import { mkdir, rm, cp, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = join(__dirname, '..')

const projectName = 'DaDablock-AI-Vision-Kit'
const distDir = join(repositoryRoot, 'docs/.vitepress/dist')
const builtIndex = await readFile(join(distDir, 'index.html'), 'utf-8')
const siteDataMatch = builtIndex.match(/window\.__VP_SITE_DATA__\s*=\s*JSON\.parse\(("(?:\\.|[^"\\])*")\)/)
if (!siteDataMatch) {
  throw new Error('Cannot identify the built version. Run npm run build:<version> first.')
}
const builtSiteData = JSON.parse(JSON.parse(siteDataMatch[1]))
const builtBase = String(builtSiteData.base || '')
const versionPrefix = `/projects/${projectName}/en/`
const builtVersion = builtBase.startsWith(versionPrefix) ? builtBase.slice(versionPrefix.length, -1) : ''
const validVersions = ['latest', 'standard-kit', 'advanced-kit', 'ultimate-kit']
if (!validVersions.includes(builtVersion) || builtBase !== `${versionPrefix}${builtVersion}/`) {
  throw new Error(`Unexpected build base: ${builtBase}. Run npm run build:<version> first.`)
}
const version = process.env.DOCS_VERSION || builtVersion
if (version !== builtVersion) {
  throw new Error(`Build version mismatch: output is ${builtVersion}, requested ${version}. Run npm run build:${version} first.`)
}
const targetDir = join(repositoryRoot, `projects/${projectName}/en/${version}`)
function resolveContentVersion(version) {
  const directContentDir = join(repositoryRoot, 'content', version)
  if (existsSync(directContentDir)) {
    return version
  }

  return version
}

await rm(targetDir, { recursive: true, force: true })
await mkdir(targetDir, { recursive: true })

await cp(
  distDir,
  targetDir,
  { recursive: true }
)

const contentVersion = resolveContentVersion(version)
const staticPdfDir = join(repositoryRoot, `content/${contentVersion}/_static/pdf`)
if (existsSync(staticPdfDir)) {
  const targetPdfDir = join(targetDir, '_static/pdf')
  await mkdir(targetPdfDir, { recursive: true })
  await cp(staticPdfDir, targetPdfDir, { recursive: true })
  console.log('Copied PDF files to:', targetPdfDir)
}

console.log('Staged files to:', targetDir)
