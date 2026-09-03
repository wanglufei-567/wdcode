import type { SiteChrome } from '@wdcode/site-module-contract'
import { Link, useParams } from 'react-router-dom'

import { createWorkRegistry } from './workRegistry'
import { controlledContentAgentWork } from './works/content-agent/ControlledContentAgentCasePage'
import { flowlyteWork } from './works/flowlyte/FlowlyteCasePage'
import { sqlEditorWork } from './works/sql-editor/SqlEditorCasePage'
import './works.css'

const workRegistry = createWorkRegistry([controlledContentAgentWork, sqlEditorWork, flowlyteWork])

function WorksIndexPage() {
  return (
    <main className="works-index">
      <section className="works-index__intro" aria-labelledby="works-title">
        <h1 id="works-title">工程实践</h1>
        <p>从问题定义到实现验证，记录工程项目的取舍与边界</p>
      </section>
      <section className="works-collection" aria-label="工程实践项目">
        {workRegistry.works.map((work) => {
          const IndexFeature = work.IndexFeature

          return <IndexFeature key={work.id} work={work} />
        })}
      </section>
    </main>
  )
}

interface UnknownWorkPageProps {
  workId: string
}

function UnknownWorkPage({ workId }: UnknownWorkPageProps) {
  return (
    <main className="note-reader-status note-reader-status--error">
      <h1>项目不存在</h1>
      <p>没有找到标识为 {workId} 的工程案例</p>
      <Link to="/works">返回工程实践</Link>
    </main>
  )
}

/**
 * @description 根据 `/works/*` 剩余路径展示作品目录或对应案例
 * @param chrome 主应用注入的全站公共页头与页脚
 * @returns 作品目录、案例详情或模块内未找到状态
 */
export function WorksRoutes({ Header, Footer }: SiteChrome) {
  const params = useParams()
  const workId = (params['*'] ?? '').replace(/^\/+|\/+$/g, '')
  const work = workId === '' ? undefined : workRegistry.findById(workId)
  const CasePage = work?.CasePage

  return (
    <div className="page-shell">
      <a className="skip-link" href="#works-content">跳到工程实践内容</a>
      <Header />
      <div id="works-content">
        {workId === '' ? (
          <WorksIndexPage />
        ) : CasePage && work ? (
          <CasePage work={work} />
        ) : (
          <UnknownWorkPage workId={workId} />
        )}
      </div>
      <Footer />
    </div>
  )
}
