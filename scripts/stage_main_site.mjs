import { mkdir, rm, cp } from 'fs/promises'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = join(__dirname, '..')

const projectName = 'DaDablock-AI-Vision-Kit'
const version = process.env.DOCS_VERSION || 'latest'
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
  join(repositoryRoot, 'docs/.vitepress/dist'),
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
