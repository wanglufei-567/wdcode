import rawArticles from './articles.json'

export type ArticleCoverKind =
  | 'architecture'
  | 'routes'
  | 'knowledge'
  | 'memory'
  | 'harness'
  | 'agent'

export interface ArticleMeta {
  title: string
  summary: string
  sourcePath: string
  coverKind: ArticleCoverKind
  coverLabel: string
}

const coverKinds = new Set<ArticleCoverKind>([
  'architecture',
  'routes',
  'knowledge',
  'memory',
  'harness',
  'agent',
])

/**
 * @description 把 JSON 清单校验为页面可消费的精选文章元数据，避免无效封面类型进入组件分支
 * @param article 未经校验的 JSON 条目
 * @param index 条目在清单中的位置，用于生成可定位错误
 * @returns 已校验的精选文章元数据
 */
function parseArticleMeta(article: (typeof rawArticles)[number], index: number): ArticleMeta {
  if (!coverKinds.has(article.coverKind as ArticleCoverKind)) {
    throw new Error(`精选文章清单第 ${index + 1} 项包含未知 coverKind`)
  }

  return {
    ...article,
    coverKind: article.coverKind as ArticleCoverKind,
  }
}

export const articles: readonly ArticleMeta[] = rawArticles.map(parseArticleMeta)
