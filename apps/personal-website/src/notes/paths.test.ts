import { describe, expect, it } from 'vitest'

import {
  getNoteDisplayName,
  isNotePathWithin,
  resolveRelativeNotePath,
  toNoteContentUrl,
  toNoteDirectoryUrl,
  toNoteRoute,
} from './paths'

describe('note paths', () => {
  it('preserves directory structure while encoding public routes', () => {
    expect(toNoteRoute('19、AI 相关/01、AI 概念&技术/Agent Memory 相关.md')).toBe(
      '/notes/19%E3%80%81AI%20%E7%9B%B8%E5%85%B3/01%E3%80%81AI%20%E6%A6%82%E5%BF%B5%26%E6%8A%80%E6%9C%AF/Agent%20Memory%20%E7%9B%B8%E5%85%B3.md',
    )
  })

  it('uses trailing slash only for directory discovery', () => {
    expect(toNoteDirectoryUrl('19、AI 相关')).toMatch(/\/$/)
    expect(toNoteContentUrl('19、AI 相关/Agent.md')).not.toMatch(/\/$/)
  })

  it('resolves relative links within the current note directory', () => {
    expect(resolveRelativeNotePath('19、AI 相关/Hermes/当前.md', './下一篇.md')).toBe(
      '19、AI 相关/Hermes/下一篇.md',
    )
    expect(resolveRelativeNotePath('19、AI 相关/Hermes/当前.md', '../概念.md')).toBe(
      '19、AI 相关/概念.md',
    )
  })

  it('rejects relative paths that escape the content root', () => {
    expect(resolveRelativeNotePath('根目录.md', '../private.md')).toBeUndefined()
  })

  it('identifies the active directory ancestry without matching similar prefixes', () => {
    expect(isNotePathWithin('19、AI 相关', '19、AI 相关/01、AI 概念与技术/基础.md')).toBe(true)
    expect(isNotePathWithin('19、AI 相关', '19、AI 相关')).toBe(true)
    expect(isNotePathWithin('19、AI 相关', '19、AI 相关扩展/基础.md')).toBe(false)
  })

  it('removes Markdown extension from display names', () => {
    expect(getNoteDisplayName('19、AI 相关/Agent Memory.md')).toBe('Agent Memory')
  })
})
