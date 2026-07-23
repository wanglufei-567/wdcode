import { access, mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const appDirectory = path.resolve(scriptDirectory, '..')
const manifestPath = path.join(appDirectory, 'src/content/articles.json')
const generatedDirectory = path.join(appDirectory, 'src/generated/articles')
const defaultDebrisRecordPath = path.resolve(scriptDirectory, '../../../../..', 'workData/DebrisRecord')
const debrisRecordPath = path.resolve(process.env.DEBRIS_RECORD_PATH ?? defaultDebrisRecordPath)

/**
 * @description 校验文章源文件位于配置的 DebrisRecord 根目录内，避免清单路径越过内容仓库边界
 * @param {string} sourcePath 文章清单中的相对路径
 * @returns {string} 已校验的绝对源文件路径
 */
function resolveSourcePath(sourcePath) {
  const absoluteSourcePath = path.resolve(debrisRecordPath, sourcePath)
  const allowedPrefix = `${debrisRecordPath}${path.sep}`

  if (!absoluteSourcePath.startsWith(allowedPrefix)) {
    throw new Error(`文章源路径越过 DebrisRecord 边界: ${sourcePath}`)
  }

  return absoluteSourcePath
}

/**
 * @description 读取精选文章清单并验证同步脚本依赖的最小字段
 * @returns {Promise<Array<{slug: string, sourcePath: string}>>} 可用于复制内容的文章条目
 */
async function readArticleManifest() {
  const manifestText = await readFile(manifestPath, 'utf8')
  const manifest = JSON.parse(manifestText)

  if (!Array.isArray(manifest)) {
    throw new Error('精选文章清单必须是数组')
  }

  return manifest.map((article, index) => {
    if (typeof article?.slug !== 'string' || typeof article?.sourcePath !== 'string') {
      throw new Error(`精选文章清单第 ${index + 1} 项缺少 slug 或 sourcePath`)
    }

    return article
  })
}

/**
 * @description 删除已经不在精选清单中的生成 Markdown，避免旧文章继续进入构建产物
 * @param {Set<string>} expectedFileNames 当前清单应生成的文件名集合
 * @returns {Promise<void>} 清理完成后结束
 */
async function removeStaleGeneratedFiles(expectedFileNames) {
  const existingFileNames = await readdir(generatedDirectory)

  await Promise.all(
    existingFileNames
      .filter((fileName) => fileName.endsWith('.md') && !expectedFileNames.has(fileName))
      .map((fileName) => unlink(path.join(generatedDirectory, fileName))),
  )
}

/**
 * @description 从 DebrisRecord 复制明确选定的 Markdown 到 Git 忽略的构建输入目录
 * @returns {Promise<void>} 所有文章写入完成后结束，任一源文件缺失时直接失败
 */
async function syncSelectedArticles() {
  await access(debrisRecordPath)
  const articles = await readArticleManifest()
  await mkdir(generatedDirectory, { recursive: true })

  const expectedFileNames = new Set(articles.map((article) => `${article.slug}.md`))
  await removeStaleGeneratedFiles(expectedFileNames)

  await Promise.all(
    articles.map(async (article) => {
      const sourcePath = resolveSourcePath(article.sourcePath)
      const markdown = await readFile(sourcePath, 'utf8')
      await writeFile(path.join(generatedDirectory, `${article.slug}.md`), markdown, 'utf8')
    }),
  )

  console.log(`已从 ${debrisRecordPath} 同步 ${articles.length} 篇精选文章`)
}

await syncSelectedArticles()
