import { Link } from 'react-router-dom'

import { ArticleCard } from '../components/ArticleCard'
import type { ArticleCardVariant } from '../components/ArticleCard'
import { HeroMechanism } from '../components/HeroMechanism'
import { SiteHeader } from '../components/SiteHeader'
import { articleSections } from '../content/articles'
import type { ArticleSectionLayout } from '../content/articles'
import { toNoteRoute } from '../notes/paths'

/**
 * @description 把主题布局和文章位置转换为卡片视觉层级
 * @param layout 当前主题采用的网格类型
 * @param index 文章在主题内的位置
 * @returns 标准、重点或紧凑卡片变体
 */
function getArticleCardVariant(
  layout: ArticleSectionLayout,
  index: number,
): ArticleCardVariant {
  if (layout === 'grid') {
    return 'standard'
  }

  if (index === 0) {
    return 'lead'
  }

  return 'compact'
}

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
          <div className="home-hero__copy">
            <h1 id="home-title">
              <span className="home-hero__title-line">看清边界、机制</span>
              <span className="home-hero__title-line">与运行链路</span>
            </h1>
            <p>工程实践中的系统性思考与记录，围绕责任边界、运行机制与可验证性，建立清晰的心智模型与可复用的方法。</p>
          </div>
          <HeroMechanism />
        </section>

        <section id="selected-articles" aria-label="精选文章">
          <nav className="topic-nav" aria-label="精选文章主题">
            {articleSections.map((section) => (
              <a href={`#topic-${section.id}`} key={section.id}>
                {section.title}
              </a>
            ))}
          </nav>

          <div className="article-sections">
            {articleSections.map((section) => (
              <section
                className={`article-section article-section--${section.layout}`}
                id={`topic-${section.id}`}
                key={section.id}
                aria-labelledby={`topic-${section.id}-title`}
              >
                <header className="article-section__header">
                  <div>
                    <h2 id={`topic-${section.id}-title`}>{section.title}</h2>
                    <p>{section.summary}</p>
                  </div>
                  <Link to={toNoteRoute(section.sourcePath)}>
                    查看全部 {section.title} <span aria-hidden="true">→</span>
                  </Link>
                </header>

                {section.layout === 'featured' && section.articles[0] ? (
                  <div className="article-grid article-grid--featured">
                    <ArticleCard article={section.articles[0]} variant="lead" />
                    <div className="article-grid__featured-side">
                      {section.articles.slice(1, 3).map((article, index) => (
                        <ArticleCard
                          article={article}
                          key={article.sourcePath}
                          variant={getArticleCardVariant(section.layout, index + 1)}
                        />
                      ))}
                    </div>
                    <div className="article-grid__featured-bottom">
                      {section.articles.slice(3).map((article, index) => (
                        <ArticleCard
                          article={article}
                          key={article.sourcePath}
                          variant={getArticleCardVariant(section.layout, index + 3)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="article-grid article-grid--grid">
                    {section.articles.map((article, index) => (
                      <ArticleCard
                        article={article}
                        key={article.sourcePath}
                        variant={getArticleCardVariant(section.layout, index)}
                      />
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
