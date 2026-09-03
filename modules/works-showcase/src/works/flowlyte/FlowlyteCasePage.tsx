import { Link } from 'react-router-dom'

import type { WorkDefinition } from '../../workRegistry'
import flowlyteMainWindow from './flowlyte-main.avif'
import flowlytePopover from './flowlyte-popover.avif'
import flowlyteSettings from './flowlyte-settings.avif'

const FLOWLYTE_REPOSITORY_URL = 'https://github.com/wanglufei-567/Flowlyte'
const FLOWLYTE_DOWNLOAD_URL = 'https://github.com/wanglufei-567/Flowlyte/releases/download/v0.1.0/Flowlyte-0.1.0.dmg'

const VERIFICATION_RECORDS = [
  {
    subject: '公开发布',
    source: 'GitHub Release v0.1.0',
    conclusion: '提供可下载的 macOS DMG 安装包',
  },
  {
    subject: '可重复构建',
    source: 'Package.swift 与发布提交源码',
    conclusion: '从干净源码执行 swift build 通过',
  },
  {
    subject: '自动化约束',
    source: 'ProjectStructure 测试套件',
    conclusion: '30 项检查覆盖资源、状态、交互与发布规则',
  },
  {
    subject: '离线边界',
    source: '应用资源与播放器实现',
    conclusion: '音频和背景随应用打包，运行时不请求外部内容',
  },
] as const

const CASE_NAVIGATION = [
  ['verification', '验证依据'],
  ['runtime-flow', '运行链路'],
  ['interface', '交互界面'],
  ['decisions', '工程取舍'],
  ['boundaries', '能力边界'],
] as const

/**
 * @description 在工程实践目录中展示 Flowlyte 的原生应用界面与公开发行入口
 * @param work 工程实践注册表提供的稳定路由和展示元数据
 * @returns Flowlyte 目录预览
 */
function FlowlyteIndexFeature({ work }: { work: WorkDefinition }) {
  return (
    <article className="work-feature work-feature--flowlyte">
      <div className="work-feature__body">
        <div className="work-feature__copy">
          <h2>{work.name}</h2>
          <p className="work-feature__lead">{work.summary}</p>
          <p className="work-feature__summary">{work.introduction}</p>
          <div className="work-feature__actions" aria-label={`${work.name} 项目入口`}>
            <Link className="work-button work-button--primary" to={`/works/${work.id}`} viewTransition>
              阅读工程案例 <span aria-hidden="true">→</span>
            </Link>
            <a className="work-button" href={FLOWLYTE_DOWNLOAD_URL} rel="noreferrer" target="_blank">
              下载 v0.1.0 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <figure className="work-feature__preview work-feature__preview--flowlyte">
          <img
            alt="Flowlyte 雨声音景主窗口，包含播放、音量、音景切换和休息计时控件"
            height="1042"
            loading="lazy"
            src={flowlyteMainWindow}
            width="1440"
          />
          <figcaption>雨声音景 · 原生 macOS 主窗口</figcaption>
        </figure>
      </div>
    </article>
  )
}

/**
 * @description 展示 Flowlyte 的原生界面、离线运行机制、发行证据和能力边界
 * @param work 工程实践注册表提供的展示元数据
 * @returns Flowlyte 工程案例页
 */
function FlowlyteCasePage({ work }: { work: WorkDefinition }) {
  return (
    <main className="work-case flowlyte-case">
      <Link className="work-case__back" to="/works" viewTransition>← 返回工程实践</Link>
      <h1 className="work-case__semantic-title">{work.name} 工程案例</h1>

      <section className="flowlyte-case__hero" aria-label="Flowlyte 应用界面与发布入口">
        <figure className="flowlyte-case__primary">
          <img
            alt="Flowlyte 雨声音景主窗口，声音在本地播放并显示剩余休息时间"
            height="1042"
            src={flowlyteMainWindow}
            width="1440"
          />
          <figcaption>雨声音景 · 主窗口</figcaption>
        </figure>

        <div className="flowlyte-case__rail">
          <div>
            <p className="flowlyte-case__lead">{work.summary}</p>
            <p className="flowlyte-case__summary">{work.introduction}</p>
            <dl className="flowlyte-case__facts">
              <div><dt>发布版本</dt><dd>v0.1.0</dd></div>
              <div><dt>系统要求</dt><dd>macOS 11+</dd></div>
            </dl>
            <div className="flowlyte-case__actions" aria-label="Flowlyte 外部入口">
              <a className="work-button work-button--primary" href={FLOWLYTE_DOWNLOAD_URL} rel="noreferrer" target="_blank">
                下载 DMG <span aria-hidden="true">↗</span>
              </a>
              <a className="work-button" href={work.repositoryUrl} rel="noreferrer" target="_blank">
                查看 GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <figure className="flowlyte-case__popover">
            <img
              alt="Flowlyte 菜单栏快捷播放器，显示音景切换、播放和音量控制"
              height="402"
              src={flowlytePopover}
              width="598"
            />
            <figcaption>菜单栏快捷播放器</figcaption>
          </figure>
        </div>
      </section>

      <div className="work-case__content">
        <nav className="work-case__index" aria-label="案例目录">
          <p>案例目录</p>
          {CASE_NAVIGATION.map(([id, label]) => (
            <a href={`#${id}`} key={id}>{label}</a>
          ))}
        </nav>

        <div className="work-case__article">
          <section className="work-case__section" id="verification" aria-labelledby="flowlyte-verification-title">
            <header className="work-section-heading">
              <p>证据来自公开发布、干净源码构建、测试套件与真实运行界面</p>
              <h2 id="flowlyte-verification-title">从源码延伸到安装包的验证闭环</h2>
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

          <section className="work-case__section" id="runtime-flow" aria-labelledby="flowlyte-runtime-title">
            <header className="work-section-heading">
              <p>同一份播放状态连接主窗口、菜单栏入口、本地资源和持久化设置</p>
              <h2 id="flowlyte-runtime-title">原生应用的离线运行链路</h2>
            </header>
            <ol className="work-mechanism">
              <li>
                <span>01</span>
                <div><strong>SwiftUI</strong><p>承载主窗口、设置面板和用户操作</p></div>
              </li>
              <li>
                <span>02</span>
                <div><strong>PlayerViewModel</strong><p>统一播放、计时、语言和可见音景状态</p></div>
              </li>
              <li>
                <span>03</span>
                <div><strong>AVFoundation</strong><p>从 App Bundle 加载 WAV 并循环播放</p></div>
              </li>
              <li>
                <span>04</span>
                <div><strong>AppKit + UserDefaults</strong><p>提供菜单栏入口并保存本地偏好</p></div>
              </li>
            </ol>
          </section>

          <section className="work-case__section" id="interface" aria-labelledby="flowlyte-interface-title">
            <header className="work-section-heading">
              <p>设置保持在当前音景之上，不把低频操作常驻到播放器主界面</p>
              <h2 id="flowlyte-interface-title">播放体验与配置边界分开</h2>
            </header>
            <div className="flowlyte-case__interface-media">
              <figure className="flowlyte-case__settings">
                <img
                  alt="Flowlyte 森林音景设置面板，可配置计时、可见音景和界面语言"
                  height="868"
                  loading="lazy"
                  src={flowlyteSettings}
                  width="1200"
                />
                <figcaption>设置面板覆盖在音景之上，关闭后回到单一播放任务</figcaption>
              </figure>
              <figure className="flowlyte-case__interface-popover">
                <img
                  alt="Flowlyte 菜单栏快捷播放器，显示音景切换、播放和音量控制"
                  height="402"
                  loading="lazy"
                  src={flowlytePopover}
                  width="598"
                />
                <figcaption>菜单栏快捷播放器</figcaption>
              </figure>
            </div>
          </section>

          <section className="work-case__section" id="decisions" aria-labelledby="flowlyte-decisions-title">
            <header className="work-section-heading">
              <p>关键实现围绕共享状态、听觉连续性与可重复发布展开</p>
              <h2 id="flowlyte-decisions-title">原生体验背后的工程取舍</h2>
            </header>
            <div className="work-decisions">
              <article>
                <span>状态边界</span>
                <h3>主窗口与菜单栏共享 PlayerViewModel</h3>
                <p>应用只建立一份播放状态，WindowGroup 与 NSStatusItem 弹窗观察同一个 ViewModel，切换入口不会产生两套音量、计时或当前音景</p>
              </article>
              <article>
                <span>听觉连续性</span>
                <h3>切换音景时保留旧播放器完成淡出</h3>
                <p>新 AVAudioPlayer 准备完成后启动渐入，旧播放器进入短暂保留队列并淡出停止，避免音景切换形成突兀断点</p>
              </article>
              <article>
                <span>发布稳定性</span>
                <h3>资源处理与正常构建保持分离</h3>
                <p>音频裁剪、首尾交叉淡化和图片生成属于显式开发流程，Release 构建只校验并打包已经确认的资源，不在发布时重新生成素材</p>
              </article>
            </div>
          </section>

          <section className="work-case__section" id="boundaries" aria-labelledby="flowlyte-boundaries-title">
            <header className="work-section-heading">
              <p>当前版本专注于本地单一音景播放，不延伸为在线内容或复杂效率系统</p>
              <h2 id="flowlyte-boundaries-title">已经实现与发布限制</h2>
            </header>
            <div className="work-boundaries">
              <article>
                <h3>已经实现</h3>
                <ul className="work-check-list">
                  <li>九种随 App 打包的离线音景与背景</li>
                  <li>主窗口和菜单栏快捷播放器共享状态</li>
                  <li>预设与自定义休息计时、结束前音量淡出</li>
                  <li>中文与英文界面、本地偏好持久化</li>
                  <li>公开源码、自动化检查和 DMG 发布链路</li>
                </ul>
              </article>
              <article className="work-boundary">
                <h3>当前限制</h3>
                <ul>
                  <li>不提供在线音景库、账号或跨设备同步</li>
                  <li>不支持多个音景混合播放</li>
                  <li>未通过 Mac App Store 分发</li>
                  <li>v0.1.0 未使用 Developer ID 签名和 Apple 公证</li>
                </ul>
              </article>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export const flowlyteWork: WorkDefinition = {
  id: 'flowlyte',
  name: 'Flowlyte',
  summary: '原生 macOS 白噪音播放器',
  introduction: '用本地音景、菜单栏控制与休息计时组成无需账户和网络的专注体验',
  technologies: ['Swift', 'SwiftUI', 'AppKit', 'AVFoundation'],
  repositoryUrl: FLOWLYTE_REPOSITORY_URL,
  IndexFeature: FlowlyteIndexFeature,
  CasePage: FlowlyteCasePage,
}
