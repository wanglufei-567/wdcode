import { Link } from 'react-router-dom'

import type { ArticleMeta } from '../content/articles'
import { ArticleCover } from './ArticleCover'

interface ArticleCardProps {
  article: ArticleMeta
}

/**
 * @description 首页精选文章入口，把机制封面、标题和策展摘要组合成单一可点击区域
 * @param props.article 经过清单校验的文章展示元数据
 * @returns 指向正文路由的文章卡片
 */
export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="article-card">
      <Link className="article-card__link" to={`/articles/${article.slug}`}>
        <ArticleCover kind={article.coverKind} label={article.coverLabel} />
        <span className="article-card__body">
          <span>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
          </span>
          <span className="article-card__action">阅读文章 <span aria-hidden="true">→</span></span>
        </span>
      </Link>
    </article>
  )
}
