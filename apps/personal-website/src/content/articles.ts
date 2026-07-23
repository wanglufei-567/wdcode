import rawArticleCatalog from './articles.json'

export type ArticleCoverKind =
  | 'architecture'
  | 'routes'
  | 'knowledge'
  | 'memory'
  | 'harness'
  | 'agent'
  | 'reactArchitecture'
  | 'fiber'
  | 'lanes'
  | 'promise'
  | 'async'
  | 'eventLoop'
  | 'webpack'
  | 'federation'
  | 'rollup'

export type ArticleSectionId = 'ai' | 'react' | 'javascript' | 'engineering'
export type ArticleSectionLayout = 'featured' | 'grid'

export interface ArticleMeta {
  title: string
  summary: string
  sourcePath: string
  coverKind: ArticleCoverKind
  coverLabel: string
}

export interface ArticleSection {
  id: ArticleSectionId
  title: string
  summary: string
  sourcePath: string
  layout: ArticleSectionLayout
  articles: readonly ArticleMeta[]
}

const coverKinds = new Set<ArticleCoverKind>([
  'architecture',
  'routes',
  'knowledge',
  'memory',
  'harness',
  'agent',
  'reactArchitecture',
  'fiber',
  'lanes',
  'promise',
  'async',
  'eventLoop',
  'webpack',
  'federation',
  'rollup',
])

const sectionIds = new Set<ArticleSectionId>(['ai', 'react', 'javascript', 'engineering'])
const sectionLayouts = new Set<ArticleSectionLayout>(['featured', 'grid'])

/**
 * @description 把 JSON 条目校验为页面可消费的精选文章元数据
 * @param article 未经校验的 JSON 文章条目
 * @param location 条目在主题清单中的可定位位置
 * @returns 已校验的精选文章元数据
 */
function parseArticleMeta(
  article: (typeof rawArticleCatalog.sections)[number]['articles'][number],
  location: string,
): ArticleMeta {
  if (!coverKinds.has(article.coverKind as ArticleCoverKind)) {
    throw new Error(`${location} 包含未知 coverKind`)
  }

  return {
    ...article,
    coverKind: article.coverKind as ArticleCoverKind,
  }
}

/**
 * @description 校验首页主题分组及其文章，阻止无效分组配置进入布局组件
 * @param section 未经校验的 JSON 主题分组
 * @param index 分组在清单中的位置
 * @returns 已校验的主题分组
 */
function parseArticleSection(
  section: (typeof rawArticleCatalog.sections)[number],
  index: number,
): ArticleSection {
  if (!sectionIds.has(section.id as ArticleSectionId)) {
    throw new Error(`精选文章第 ${index + 1} 个分组包含未知 id`)
  }

  if (!sectionLayouts.has(section.layout as ArticleSectionLayout)) {
    throw new Error(`精选文章第 ${index + 1} 个分组包含未知 layout`)
  }

  return {
    ...section,
    id: section.id as ArticleSectionId,
    layout: section.layout as ArticleSectionLayout,
    articles: section.articles.map((article, articleIndex) =>
      parseArticleMeta(article, `精选文章第 ${index + 1} 个分组第 ${articleIndex + 1} 项`),
    ),
  }
}

export const articleSections: readonly ArticleSection[] =
  rawArticleCatalog.sections.map(parseArticleSection)
