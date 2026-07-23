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
})
