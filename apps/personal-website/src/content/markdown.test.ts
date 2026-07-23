import { describe, expect, it } from 'vitest'

import { normalizeNotebookMarkdown } from './markdown'

describe('normalizeNotebookMarkdown', () => {
  it('removes paired highlight markers and preserves nested bold syntax', () => {
    expect(normalizeNotebookMarkdown('==**Agent Memory** 的风险==')).toBe('**Agent Memory** 的风险')
  })

  it('does not consume content across line boundaries', () => {
    expect(normalizeNotebookMarkdown('==first\nsecond==')).toBe('==first\nsecond==')
  })

  it('removes a matching source title and promotes section headings', () => {
    const markdown = '## Article title\n\n### Section\n\n#### Detail'

    expect(normalizeNotebookMarkdown(markdown, 'Article title')).toBe('## Section\n\n### Detail')
  })

  it('preserves heading-like text inside fenced code blocks', () => {
    const markdown = '## Article title\n\n### Section\n\n```md\n### Code heading\n```'

    expect(normalizeNotebookMarkdown(markdown, 'Article title')).toBe('## Section\n\n```md\n### Code heading\n```')
  })

  it('converts local HTML images to Markdown images', () => {
    const markdown = '<img src="./00、课件/images/diagram.png" alt="架构图" />'

    expect(normalizeNotebookMarkdown(markdown)).toBe(
      '![架构图](<./00、课件/images/diagram.png>)',
    )
  })

  it('converts multiline image-hosting tags and ignores presentation styles', () => {
    const markdown = [
      '<img',
      '  src="https://raw.githubusercontent.com/example/image.png"',
      '  alt="外部图片" style="zoom: 50%;" />',
    ].join('\n')

    expect(normalizeNotebookMarkdown(markdown)).toBe(
      '![外部图片](<https://raw.githubusercontent.com/example/image.png>)',
    )
  })

  it('preserves HTML image examples inside fenced code blocks', () => {
    const markdown = '```html\n<img src="./example.png" alt="示例" />\n```'

    expect(normalizeNotebookMarkdown(markdown)).toBe(markdown)
  })
})
