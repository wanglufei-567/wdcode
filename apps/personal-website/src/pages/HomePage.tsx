import { ArticleCard } from '../components/ArticleCard'
import { SiteHeader } from '../components/SiteHeader'
import { articles } from '../content/articles'

/**
 * @description 个人站默认首页，只展示身份说明和明确策展的高质量文章
 * @returns 根路由页面
 */
export function HomePage() {
  return (
    <div className="page-shell">
      <a className="skip-link" href="#selected-articles">跳到精选文章</a>
      <SiteHeader />

      <main>
        <section className="home-hero" aria-labelledby="home-title">
          <p className="home-hero__label">THINK · BUILD · RECORD</p>
          <div className="home-hero__copy">
            <h1 id="home-title">
              <span className="home-hero__title-line">看清边界、机制</span>
              <span className="home-hero__title-line">与运行链路</span>
            </h1>
            <p>记录对软件系统、AI Agent 与 AI Coding 的长期观察和实践，把复杂技术整理成可验证、可复述的工程认知</p>
          </div>
        </section>

        <section id="selected-articles" aria-label="精选文章">
          <div className="article-grid">
            {articles.map((article) => (
              <ArticleCard article={article} key={article.sourcePath} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
