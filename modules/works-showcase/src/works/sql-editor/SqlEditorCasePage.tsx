import { useState } from 'react'
import { Link } from 'react-router-dom'

import type { WorkDefinition } from '../../workRegistry'
import sqlEditorDemoPreview from './sql-editor-demo.png'

const SQL_EDITOR_REPOSITORY_URL = 'https://github.com/wanglufei-567/SQLEditor'
const SQL_EDITOR_DEMO_URL = 'https://wanglufei-567.github.io/SQLEditor/'

const DIALECTS = ['MySQL', 'PostgreSQL', 'Hive', 'Spark', 'Trino', 'Generic'] as const

const VERIFICATION_RECORDS = [
  {
    subject: '自动化测试',
    source: '仓库测试命令与通过结果',
    conclusion: '47 项测试覆盖编辑器与方言行为',
  },
  {
    subject: '方言支持',
    source: '解析器与格式化器公开配置',
    conclusion: '六种 SQL 方言使用一致的公开契约',
  },
  {
    subject: '工作区边界',
    source: 'pnpm workspace 与构建配置',
    conclusion: '组件包和 Playground 分为两个独立工作区',
  },
  {
    subject: '工程闭环',
    source: '类型检查与生产构建命令',
    conclusion: '测试、类型检查和生产构建均可通过',
  },
] as const

const CASE_NAVIGATION = [
  ['verification', '验证依据'],
  ['runtime-flow', '运行链路'],
  ['decisions', '工程取舍'],
  ['boundaries', '能力边界'],
] as const

/**
 * @description 在作品目录中完整预览 SQLEditor，由项目适配器自行拥有截图、入口与验证摘要
 * @param work 作品注册表提供的稳定路由和展示元数据
 * @returns SQLEditor 作品目录预览
 */
function SqlEditorIndexFeature({ work }: { work: WorkDefinition }) {
  return (
    <article className="work-feature">
      <div className="work-feature__body">
        <figure className="work-feature__preview work-feature__preview--sql-editor">
          <img
            alt="SQLEditor 深色主题在线演示，显示 SQL 语法错误、高亮、格式化与方言切换界面"
            height="900"
            src={sqlEditorDemoPreview}
            width="1440"
          />
          <figcaption>MySQL 方言错误诊断</figcaption>
        </figure>

        <div className="work-feature__copy">
          <h2>{work.name}</h2>
          <p className="work-feature__lead">{work.summary}</p>
          <p className="work-feature__summary">
            {work.introduction}，并用独立 Playground 验证接入体验
          </p>
          <div className="work-feature__actions" aria-label={`${work.name} 项目入口`}>
            <Link className="work-button work-button--primary" to={`/works/${work.id}`} viewTransition>
              阅读工程案例 <span aria-hidden="true">→</span>
            </Link>
            <a className="work-button" href={SQL_EDITOR_DEMO_URL} rel="noreferrer" target="_blank">
              打开在线 Demo <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * @description 展示 SQLEditor 的可验证能力、真实在线演示、实现机制和明确边界
 * @param work 作品注册表提供的展示元数据
 * @returns SQLEditor 工程案例页
 */
function SqlEditorCasePage({ work }: { work: WorkDefinition }) {
  const [isDemoReady, setIsDemoReady] = useState(false)

  return (
    <main className="work-case">
      <Link className="work-case__back" to="/works" viewTransition>← 返回工程实践</Link>
      <h1 className="work-case__semantic-title">{work.name} 工程案例</h1>

      <div className={`work-case__demo-stage${isDemoReady ? ' is-ready' : ''}`}>
        <div className="work-case__demo-poster" aria-hidden="true">
          <img
            alt=""
            height="900"
            src={sqlEditorDemoPreview}
            width="1440"
          />
          <span>正在连接在线演示</span>
        </div>
        <iframe
          allow="clipboard-write"
          className="work-case__demo-frame"
          loading="eager"
          onLoad={() => setIsDemoReady(true)}
          sandbox="allow-scripts allow-same-origin allow-popups"
          src={SQL_EDITOR_DEMO_URL}
          title="SQLEditor 在线演示"
        />
      </div>

      <div className="work-case__content">
        <nav className="work-case__index" aria-label="案例目录">
          <p>案例目录</p>
          {CASE_NAVIGATION.map(([id, label]) => (
            <a href={`#${id}`} key={id}>{label}</a>
          ))}
        </nav>

        <div className="work-case__article">
          <section className="work-case__section" id="verification" aria-labelledby="verification-title">
            <header className="work-section-heading">
              <p>证据来自仓库配置、测试结果与真实运行界面</p>
              <h2 id="verification-title">能够复查的工程结论</h2>
            </header>
            <dl className="work-verification-records">
              {VERIFICATION_RECORDS.map((record) => (
                <div key={record.subject}>
                  <dt>{record.subject}</dt>
                  <dd>{record.source}</dd>
                  <dd>{record.conclusion}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="work-case__section" id="runtime-flow" aria-labelledby="runtime-flow-title">
            <header className="work-section-heading">
              <p>输入经过方言适配后形成可定位诊断，演示应用验证最终接入</p>
              <h2 id="runtime-flow-title">从输入到诊断的运行链路</h2>
            </header>
            <ol className="work-mechanism">
              <li>
                <span>01</span>
                <div><strong>CodeMirror 6</strong><p>承载编辑状态、语法高亮和诊断标记</p></div>
              </li>
              <li>
                <span>02</span>
                <div><strong>Dialect Adapter</strong><p>为当前方言选择解析与格式化规则</p></div>
              </li>
              <li>
                <span>03</span>
                <div><strong>Parser Diagnostics</strong><p>把解析异常转换为编辑器内可定位诊断</p></div>
              </li>
              <li>
                <span>04</span>
                <div><strong>Playground</strong><p>验证组件配置、交互和构建产物</p></div>
              </li>
            </ol>
          </section>

          <section className="work-case__section" id="decisions" aria-labelledby="decisions-title">
            <header className="work-section-heading">
              <p>这些选择直接决定组件的控制边界、一致性与并发正确性</p>
              <h2 id="decisions-title">影响可复用性的关键取舍</h2>
            </header>
            <div className="work-decisions">
              <article>
                <span>控制边界</span>
                <h3>直接管理 CodeMirror 生命周期</h3>
                <p>组件自行建立 EditorState、EditorView 与 Compartment，在 React 属性变化时精确重配方言、主题、诊断和高亮扩展</p>
              </article>
              <article>
                <span>契约一致性</span>
                <h3>方言同时支持格式化与诊断</h3>
                <p>只有同时满足 parser 和 formatter 的方言进入公开能力，避免同一选项只实现一半功能</p>
              </article>
              <article>
                <span>并发正确性</span>
                <h3>异步诊断只接受最新结果</h3>
                <p>每次请求递增版本标识，只有最新解析结果可以更新错误数量，避免快速输入时旧任务覆盖新状态</p>
              </article>
            </div>
          </section>

          <section className="work-case__section" id="boundaries" aria-labelledby="boundaries-title">
            <header className="work-section-heading">
              <p>能力与限制使用相同的信息密度，避免把组件误读成完整数据平台</p>
              <h2 id="boundaries-title">已经实现与明确不承担</h2>
            </header>
            <div className="work-boundaries">
              <article>
                <h3>已经实现</h3>
                <ul className="work-check-list">
                  <li>编辑、格式化、复制、主题和关键字大小写控制</li>
                  <li>{DIALECTS.join('、')} 六种方言切换</li>
                  <li>基于解析器的语法错误定位与编辑器内反馈</li>
                  <li>组件包与演示应用分离的 pnpm workspace</li>
                  <li>自动化测试、类型检查和生产构建闭环</li>
                </ul>
              </article>
              <article className="work-boundary">
                <h3>明确不承担</h3>
                <ul>
                  <li>不连接数据库，也不执行 SQL</li>
                  <li>不提供表结构补全或数据库语义分析</li>
                  <li>不把 Playground 伪装成完整数据平台</li>
                  <li>展示页不复制项目业务源码与 README 真值</li>
                </ul>
              </article>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}

export const sqlEditorWork: WorkDefinition = {
  id: 'sql-editor',
  name: 'SQLEditor',
  summary: '可嵌入的多方言 SQL 编辑器组件',
  introduction: '把 SQL 编辑、格式化、解析诊断与多方言适配组织成可复用前端能力',
  technologies: ['React', 'TypeScript', 'CodeMirror 6', 'ANTLR4'],
  repositoryUrl: SQL_EDITOR_REPOSITORY_URL,
  demoUrl: SQL_EDITOR_DEMO_URL,
  IndexFeature: SqlEditorIndexFeature,
  CasePage: SqlEditorCasePage,
}
