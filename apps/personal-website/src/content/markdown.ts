/**
 * @description 在移除源文件标题后提升后续标题层级，同时避开围栏代码块中的井号文本
 * @param markdown 已移除首标题的 Markdown 正文
 * @returns 从二级标题开始组织章节的 Markdown
 */
function promoteSectionHeadings(markdown: string): string {
  let isInsideCodeFence = false

  return markdown
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        isInsideCodeFence = !isInsideCodeFence
        return line
      }

      return isInsideCodeFence ? line : line.replace(/^(#{2,6})(\s+)/, (_, hashes: string, spacing: string) => `${hashes.slice(1)}${spacing}`)
    })
    .join('\n')
}

/**
 * @description 清理个人笔记中的非标准高亮和重复首标题，让 react-markdown 按页面语义稳定渲染
 * @param markdown 从构建期内容快照读取的原始 Markdown
 * @param pageTitle 由精选清单维护的页面标题，用于识别可安全移除的源文件首标题
 * @returns 保留内部强调语法、移除双等号包裹并从二级章节开始的 Markdown
 */
export function normalizeNotebookMarkdown(markdown: string, pageTitle?: string): string {
  const normalizedHighlights = markdown.replace(/==([^\n]+?)==/g, '$1')

  if (pageTitle === undefined) {
    return normalizedHighlights
  }

  const titleMatch = normalizedHighlights.match(/^\s{0,3}#{1,6}\s+(.+?)\s*\r?\n/)
  const sourceTitle = titleMatch?.[1]?.replace(/(\*\*|__|`)/g, '')

  if (titleMatch === null || sourceTitle !== pageTitle) {
    return normalizedHighlights
  }

  const contentWithoutTitle = normalizedHighlights.slice(titleMatch[0].length).replace(/^\s*\r?\n/, '')
  return promoteSectionHeadings(contentWithoutTitle)
}
