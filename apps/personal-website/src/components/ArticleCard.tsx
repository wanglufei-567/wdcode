import { Link } from 'react-router-dom'

import { toNoteRoute } from '@wdcode/notes'

import type { ArticleMeta } from '../content/articles'
import { ArticleCover } from './ArticleCover'

export type ArticleCardVariant = 'standard' | 'lead' | 'compact'

interface ArticleCardProps {
  article: ArticleMeta
  variant?: ArticleCardVariant
}

/**
 * @description 首页精选文章入口，把设计稿机制封面、标题和策展摘要组合成单一可点击区域
 * @param props.article 经过清单校验的文章展示元数据
 * @param props.variant 卡片在当前主题网格中的视觉层级
 * @returns 指向正文路由的文章卡片
 */
export function ArticleCard({ article, variant = 'standard' }: ArticleCardProps) {
  return (
    <article className={`article-card article-card--${variant}`}>
      <Link className="article-card__link" to={toNoteRoute(article.sourcePath)}>
        <ArticleCover kind={article.coverKind} />
        <span className="article-card__body">
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
        </span>
      </Link>
    </article>
  )
}
