import { normalizeNotebookMarkdown } from './markdown'

const markdownModules = import.meta.glob<string>('../generated/articles/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

/**
 * @description 从 Vite 构建期导入的内容快照读取文章，并执行最小 Markdown 标准化
 * @param slug 已通过精选文章清单确认的公开文章标识
 * @param pageTitle 精选清单维护的页面标题，用于移除源文件中的重复首标题
 * @returns 可交给 react-markdown 的正文，生成文件缺失时返回 undefined
 */
export function loadArticleMarkdown(slug: string, pageTitle: string): string | undefined {
  const modulePath = `../generated/articles/${slug}.md`
  const markdown = markdownModules[modulePath]
  return markdown === undefined ? undefined : normalizeNotebookMarkdown(markdown, pageTitle)
}
