type MarkdownSegment = {
  isCodeFence: boolean
  value: string
}

/**
 * @description 把 Markdown 分为普通正文和围栏代码块，避免改写代码示例中的 HTML
 * @param markdown 原始 Markdown
 * @returns 保留原始换行和顺序的分段结果
 */
function splitFencedCode(markdown: string): readonly MarkdownSegment[] {
  const segments: MarkdownSegment[] = []
  const lines = markdown.match(/[^\n]*(?:\n|$)/g)?.filter(Boolean) ?? []
  let current = ''
  let isInsideFence = false
  let fenceCharacter = ''
  let fenceLength = 0

  const flush = () => {
    if (current === '') {
      return
    }

    segments.push({ isCodeFence: isInsideFence, value: current })
    current = ''
  }

  for (const line of lines) {
    const fence = line.match(/^\s{0,3}(`{3,}|~{3,})/)

    if (!isInsideFence && fence !== null) {
      const marker = fence[1] ?? ''
      flush()
      isInsideFence = true
      fenceCharacter = marker[0] ?? ''
      fenceLength = marker.length
      current = line
      continue
    }

    current += line

    if (
      isInsideFence
      && new RegExp(`^\\s{0,3}${fenceCharacter}{${fenceLength},}\\s*$`).test(line.trimEnd())
    ) {
      flush()
      isInsideFence = false
      fenceCharacter = ''
      fenceLength = 0
    }
  }

  flush()
  return segments
}

function readHtmlAttribute(tag: string, attribute: string): string | undefined {
  const match = tag.match(
    new RegExp(`\\b${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>\\x60]+))`, 'i'),
  )

  return match?.[1] ?? match?.[2] ?? match?.[3]
}

/**
 * @description 将笔记正文中的 HTML 图片转换为标准 Markdown 图片，交给统一图片组件处理路径
 * @param markdown 原始 Markdown
 * @returns 只改写代码块之外且包含 src 的 img 标签
 */
function normalizeHtmlImages(markdown: string): string {
  return splitFencedCode(markdown)
    .map((segment) => {
      if (segment.isCodeFence) {
        return segment.value
      }

      return segment.value.replace(/<img\b[\s\S]*?>/gi, (tag) => {
        const src = readHtmlAttribute(tag, 'src')

        if (src === undefined || src === '') {
          return tag
        }

        const alt = (readHtmlAttribute(tag, 'alt') ?? '').replace(/[[\]]/g, '')
        return `![${alt}](<${src}>)`
      })
    })
    .join('')
}

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
  const normalizedHighlights = normalizeHtmlImages(markdown).replace(/==([^\n]+?)==/g, '$1')

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
