import { describe, expect, it } from 'vitest'

import { articleSections } from './articles'

describe('homepage article catalog', () => {
  it('keeps the approved topic order and article counts', () => {
    expect(articleSections.map((section) => section.id)).toEqual([
      'ai',
      'react',
      'javascript',
      'engineering',
    ])
    expect(articleSections.map((section) => section.articles.length)).toEqual([6, 3, 3, 3])
  })

  it('keeps Hermes as the first featured article', () => {
    expect(articleSections[0]?.layout).toBe('featured')
    expect(articleSections[0]?.articles[0]?.title).toBe('Hermes 认知模型与架构全景')
  })

  it('features Loop Engineering instead of the broader Agent evolution overview', () => {
    const aiArticles = articleSections[0]?.articles ?? []

    expect(aiArticles.at(-1)?.title).toBe('Loop Engineering')
    expect(aiArticles.at(-1)?.sourcePath).toBe(
      '19、AI 相关/01、AI 概念&技术/10、Loop Engineering 相关.md',
    )
    expect(aiArticles.some((article) => article.title === '从 Chat AI 到 Agent')).toBe(false)
  })

  it('does not project one source article into multiple cards', () => {
    const sourcePaths = articleSections.flatMap((section) =>
      section.articles.map((article) => article.sourcePath),
    )

    expect(new Set(sourcePaths).size).toBe(sourcePaths.length)
  })
})
