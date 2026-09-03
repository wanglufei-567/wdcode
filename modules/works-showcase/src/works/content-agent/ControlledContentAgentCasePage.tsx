import { Link } from 'react-router-dom'

import type { WorkDefinition } from '../../workRegistry'
import adjudicationLoop from './controlled-adjudication-loop.avif'
import contentProductionOverview from './content-production-overview.avif'
import executionStack from './controlled-execution-stack.avif'
import facetedSingleAxisRouting from './faceted-single-axis-routing.avif'
import productionAuthority from './controlled-production-authority.avif'

const CASE_NAVIGATION = [
  ['architecture', '系统架构'],
  ['routing', '路由裁决'],
  ['control-chain', '控制链路'],
  ['adjudication', '生产裁决'],
  ['governance', '知识治理'],
  ['verification', '验证记录'],
  ['boundaries', '能力边界'],
] as const

const STAGE_GROUPS = [
  ['S01', '路由与证据定界', 'RouteDecision 与 EvidencePack', '唯一有效 SKU 成立并复核后才进入研究阶段'],
  ['S02–S06 · H01', '研究与策略收敛', '候选、分析、策略与 PatternBrief', '研究对象通过首次人工节点后继续'],
  ['S07 · H02', '生产计划裁决', 'ContentPlan 与形成记录', '计划经人工确认后才允许生产'],
  ['S08–S11 · H03', '正文、视觉与治理', '双生产对象与 GateReport', '发布前门禁失败时回到责任阶段修复'],
  ['S12–S13', '版本化发布与同步', 'ReleaseManifest 与交付文件集', '外部同步只消费已经授权的清单'],
] as const

const VERIFICATION_RECORDS = [
  ['仓库门禁', '2026-09-03 干净审计副本', '13 项知识、契约、运行与交付检查全部通过'],
  ['行为回归', 'pytest 测试套件', '806 项测试覆盖主链、失败、恢复、授权与发布路径'],
  ['交付边界', '外部同步运维测试', '17 项测试验证过期授权、过期门禁和文件漂移拒绝'],
  ['执行入口', 'Profile 自检', '6 项检查验证角色、Stage、配置、密钥与包导入契约'],
] as const

/**
 * @description 在工程实践目录中展示匿名化的受控内容生产 Agent 架构案例
 * @param work 工程实践注册表提供的稳定路由和展示元数据
 * @returns 受控内容生产 Agent 目录预览
 */
function ControlledContentAgentIndexFeature({ work }: { work: WorkDefinition }) {
  return (
    <article className="work-feature work-feature--content-agent">
      <div className="work-feature__body">
        <figure className="work-feature__preview work-feature__preview--content-agent">
          <img
            alt="多种疤痕护理 SKU 经过知识、策略、图文生产与人工审核流程，形成内容并分发到多个社媒平台"
            height="900"
            loading="lazy"
            src={contentProductionOverview}
            width="1600"
          />
          <figcaption>SKU 输入 · 受控生产 · 多渠道发布</figcaption>
        </figure>

        <div className="work-feature__copy">
          <h2>{work.name}</h2>
          <p className="work-feature__lead">{work.summary}</p>
          <p className="work-feature__summary">{work.introduction}</p>
          <div className="work-feature__actions" aria-label={`${work.name} 项目入口`}>
            <Link className="work-button work-button--primary" to={`/works/${work.id}`} viewTransition>
              阅读架构案例 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * @description 展示受控内容生产 Agent 的知识架构、控制链、治理机制和验证证据
 * @param work 工程实践注册表提供的展示元数据
 * @returns 匿名化的内容生产 Agent 工程案例页
 */
function ControlledContentAgentCasePage({ work }: { work: WorkDefinition }) {
  return (
    <main className="work-case content-agent-case">
      <Link className="work-case__back" to="/works" viewTransition>← 返回工程实践</Link>

      <section className="content-agent-case__hero" aria-labelledby="content-agent-title">
        <div className="content-agent-case__intro">
          <h1 id="content-agent-title">{work.name}</h1>
          <p className="content-agent-case__lead">{work.summary}</p>
          <p className="content-agent-case__summary">{work.introduction}</p>
        </div>

        <figure className="content-agent-case__cover">
          <img
            alt="多种疤痕护理 SKU 与来源资料经过知识约束、内容生产和三个人工节点，形成图文内容并分发到多个社媒平台"
            height="900"
            src={contentProductionOverview}
            width="1600"
          />
          <figcaption>从商品与业务真值出发，经受控生产链形成可发布的图文内容</figcaption>
        </figure>
      </section>

      <div className="work-case__content content-agent-case__content">
        <nav className="work-case__index" aria-label="案例目录">
          <p>案例目录</p>
          {CASE_NAVIGATION.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </nav>

        <div className="work-case__article">
          <section className="work-case__section" id="architecture" aria-labelledby="content-agent-architecture-title">
            <header className="work-section-heading">
              <p>系统解决的不是“让模型生成内容”，而是让候选内容经过可检查的决定链成为可交付结果</p>
              <h2 id="content-agent-architecture-title">业务真值、执行约束与运行环境各守边界</h2>
            </header>
            <div className="content-agent-case__architecture-model" aria-label="受控内容生产 Agent 架构关系">
              <div><strong>Knowledge Bundle</strong><span>定义事实、政策、契约与稳定资产</span></div>
              <div><strong>Profile</strong><span>约束对象、阶段、角色、授权与恢复</span></div>
              <div><strong>Runtime</strong><span>承载模型、工具、进程和外部调用</span></div>
              <div><strong>Outputs</strong><span>保存本次运行事实、证据与发布清单</span></div>
            </div>
            <p className="content-agent-case__principle">核心不变量：对象先成立，状态再推进；副作用先授权，交付只认 ReleaseManifest</p>
            <figure className="content-agent-case__architecture-figure">
              <img
                alt="受控执行面分为责任输入、控制闭环和受控结果，Agent 语义编排经确定性执行与状态授权形成运行事实"
                height="1080"
                loading="lazy"
                src={executionStack}
                width="1920"
              />
              <figcaption>分层执行架构：语义判断进入确定性执行，并由状态和授权约束副作用</figcaption>
            </figure>
          </section>

          <section className="work-case__section" id="routing" aria-labelledby="content-agent-routing-title">
            <header className="work-section-heading">
              <p>自然语言同时携带场景、人群、部位、分型和阶段，全部嵌入一棵树会造成组合爆炸与规则重复</p>
              <h2 id="content-agent-routing-title">分面单轴漏斗把语义理解收敛为唯一可执行路由</h2>
            </header>
            <ol className="content-agent-case__routing-model" aria-label="分面单轴漏斗路由的裁决顺序">
              <li><span>01</span><strong>scenario 场景主轴</strong><p>沿唯一层级轴下钻到最深有效场景，必要时按父级规则回退</p></li>
              <li><span>02</span><strong>facet 横向收敛</strong><p>人群、部位、分型、阶段与症状保持平铺，在运行时相交约束</p></li>
              <li><span>03</span><strong>资格硬闸</strong><p>先排除不满足人群和业务规则的候选，不让排序覆盖资格判断</p></li>
              <li><span>04</span><strong>SKU 唯一裁决</strong><p>只在有效候选内选定一个 SKU，并将依据固化为 RouteDecision</p></li>
            </ol>
            <p className="content-agent-case__principle">scenario 管定位，facet 管收窄，硬闸管资格，SKU 管裁决</p>
            <figure className="content-agent-case__routing-figure">
              <img
                alt="多轴嵌套树会产生组合爆炸，分面单轴模型只让场景纵向下钻，并将人群和疤痕分型作为平铺标签相交收敛到唯一 SKU"
                height="1396"
                loading="lazy"
                src={facetedSingleAxisRouting}
                width="1920"
              />
              <figcaption>结构取舍：单一场景轴负责层级定位，正交分面在运行时相交完成 SKU 收口</figcaption>
            </figure>
          </section>

          <section className="work-case__section" id="control-chain" aria-labelledby="content-agent-control-title">
            <header className="work-section-heading">
              <p>一条持久化状态机连接业务对象、人工节点、失败恢复与最终交付</p>
              <h2 id="content-agent-control-title">S01–S13 不是步骤清单，而是控制权交接链</h2>
            </header>
            <ol className="content-agent-case__stages">
              {STAGE_GROUPS.map(([range, title, output, control]) => (
                <li key={range}>
                  <span>{range}</span>
                  <strong>{title}</strong>
                  <p>{output}</p>
                  <p>{control}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="work-case__section" id="adjudication" aria-labelledby="content-agent-adjudication-title">
            <header className="work-section-heading">
              <p>来源事实、结构建议与生产规则不能直接混成 Prompt，必须形成唯一可执行政策并保留形成依据</p>
              <h2 id="content-agent-adjudication-title">在策略与执行之间建立生产裁决层</h2>
            </header>
            <div className="content-agent-case__document-spread">
              <figure>
                <img alt="四类责任来源汇入生产裁决，输出 ContentPlan 和形成记录" height="1080" loading="lazy" src={productionAuthority} width="1920" />
                <figcaption>静态模型：四类责任来源汇入同一裁决层</figcaption>
              </figure>
              <figure>
                <img alt="生产裁决验证上下文、解析约束、适配结构、检测冲突并冻结执行政策" height="1160" loading="lazy" src={adjudicationLoop} width="1920" />
                <figcaption>运行机制：冲突不可替代时停止物化并返回责任位置</figcaption>
              </figure>
            </div>
          </section>

          <section className="work-case__section" id="governance" aria-labelledby="content-agent-governance-title">
            <header className="work-section-heading">
              <p>来源材料、维护真值、编译产物与运行事实拥有不同的生产者、看守者和修改权限</p>
              <h2 id="content-agent-governance-title">运行结果不能直接升级为长期知识</h2>
            </header>
            <div className="work-decisions content-agent-case__truths">
              <article><span>来源层</span><h3>原始资料保持可追溯</h3><p>清洗和入库流水线保存来源关系，但运行时不把原始材料当作优先业务真值</p></article>
              <article><span>维护层</span><h3>Knowledge Bundle 保存稳定裁决</h3><p>事实、路由、内容规则与治理门禁分别归属权威平面，修改后经过专项审计</p></article>
              <article><span>编译层</span><h3>机器词表由维护真值生成</h3><p>生成文件禁止手改，编译验证负责发现源文件与运行消费格式之间的漂移</p></article>
              <article><span>运行层</span><h3>Outputs 只记录本次运行事实</h3><p>优秀结果仍需经过人工判断和治理准入，才可能沉淀为后续任务可复用的策略资产</p></article>
            </div>
          </section>

          <section className="work-case__section" id="verification" aria-labelledby="content-agent-verification-title">
            <header className="work-section-heading">
              <p>以下结果来自锁定依赖后的干净审计副本，不以文档声明替代实际执行</p>
              <h2 id="content-agent-verification-title">架构约束由门禁与失败路径共同证明</h2>
            </header>
            <dl className="work-verification-records">
              {VERIFICATION_RECORDS.map(([subject, source, conclusion]) => (
                <div key={subject}><dt>{subject}</dt><dd>{source}</dd><dd>{conclusion}</dd></div>
              ))}
            </dl>
          </section>

          <section className="work-case__section" id="boundaries" aria-labelledby="content-agent-boundaries-title">
            <header className="work-section-heading">
              <p>案例只陈述仓库、测试和本地门禁能够证明的工程事实，不把生成能力外推为运营结果</p>
              <h2 id="content-agent-boundaries-title">已经验证的系统能力与未证明结果</h2>
            </header>
            <div className="work-boundaries">
              <article>
                <h3>已经验证</h3>
                <ul className="work-check-list">
                  <li>知识真值、执行逻辑、运行产物与正式文档分层</li>
                  <li>对象契约、原子写入、状态推进和失败恢复</li>
                  <li>三个人工节点约束计划、生产与发布决定权</li>
                  <li>正文与视觉并行后汇聚到同一治理门禁</li>
                  <li>发布清单约束外部同步的文件全集</li>
                </ul>
              </article>
              <article className="work-boundary">
                <h3>不作外推</h3>
                <ul>
                  <li>本地测试不证明外部模型和平台长期可用</li>
                  <li>内容通过门禁不等于真实运营效果已经成立</li>
                  <li>仓库未提供转化率、推荐率或 ROI 归因实验</li>
                  <li>高风险业务事实仍保留人工确认和合规责任</li>
                </ul>
              </article>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export const controlledContentAgentWork: WorkDefinition = {
  id: 'content-agent',
  name: '受控内容生产 Agent',
  summary: '面向电商社媒运营的知识驱动内容生产系统',
  introduction: '把来源资料、业务真值、开放判断、确定性执行、人工审核与发布清单组织成一条可恢复、可追溯、可治理的生产链',
  technologies: ['Python', 'Hermes', 'JSON Schema', 'pytest'],
  IndexFeature: ControlledContentAgentIndexFeature,
  CasePage: ControlledContentAgentCasePage,
}
