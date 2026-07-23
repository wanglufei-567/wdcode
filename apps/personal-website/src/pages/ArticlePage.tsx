import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { SiteHeader } from '../components/SiteHeader'
import { getArticleBySlug } from '../content/articles'
import { loadArticleMarkdown } from '../content/loadArticle'
import { NotFoundPage } from './NotFoundPage'

/**
 * @description 渲染精选文章的标题、摘要和构建期 Markdown 正文，不接收任意文件路径
 * @returns 文章正文页，slug 未收录或内容快照缺失时返回不存在页面
 */
export function ArticlePage() {
  const { slug = '' } = useParams()
  const article = getArticleBySlug(slug)
  const markdown = article === undefined ? undefined : loadArticleMarkdown(article.slug, article.title)

  if (article === undefined || markdown === undefined) {
    return <NotFoundPage />
  }

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="article-page">
        <Link className="back-link" to="/">
          <span aria-hidden="true">←</span> 返回精选文章
        </Link>

        <header className="article-header">
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
        </header>

        <article className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      </main>
    </div>
  )
}
