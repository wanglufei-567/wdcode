import type { ArticleCoverKind } from '../content/articles'

interface ArticleCoverProps {
  kind: ArticleCoverKind
  label: string
}

/**
 * @description 为精选文章提供与其机制对应的轻量系统图，避免使用无语义装饰封面
 * @param props.kind 决定系统图结构的文章类型
 * @param props.label 封面中心使用的短技术标签
 * @returns 不参与辅助技术朗读的装饰性 SVG 封面
 */
export function ArticleCover({ kind, label }: ArticleCoverProps) {
  return (
    <div className={`article-cover article-cover--${kind}`} aria-hidden="true">
      {kind === 'architecture' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <rect x="36" y="104" width="54" height="28" rx="3" />
          <rect x="100" y="82" width="54" height="50" rx="3" />
          <rect x="164" y="60" width="54" height="72" rx="3" />
          <rect x="228" y="38" width="54" height="94" rx="3" />
          <path d="M90 118h10M154 107h10M218 96h10" />
          <text x="63" y="121" textAnchor="middle">RUN</text>
          <text x="127" y="110" textAnchor="middle">PERSIST</text>
          <text x="191" y="99" textAnchor="middle">LEARN</text>
          <text x="255" y="88" textAnchor="middle">COLLAB</text>
        </svg>
      )}

      {kind === 'routes' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <circle cx="160" cy="78" r="26" />
          <rect x="24" y="20" width="68" height="30" rx="4" />
          <rect x="228" y="20" width="68" height="30" rx="4" />
          <rect x="24" y="102" width="68" height="30" rx="4" />
          <rect x="228" y="102" width="68" height="30" rx="4" />
          <path d="M92 35l44 27M228 35l-44 27M92 117l44-25M228 117l-44-25" />
          <text x="160" y="84" textAnchor="middle">GOAL</text>
          <text x="58" y="40" textAnchor="middle">NATIVE</text>
          <text x="262" y="40" textAnchor="middle">SDK</text>
          <text x="58" y="122" textAnchor="middle">GRAPH</text>
          <text x="262" y="122" textAnchor="middle">RUNTIME</text>
        </svg>
      )}

      {kind === 'knowledge' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <rect x="20" y="60" width="68" height="32" rx="4" />
          <path d="M88 76h28M116 76l30-42M116 76h30M116 76l30 42" />
          <rect x="146" y="20" width="72" height="28" rx="4" />
          <rect x="146" y="62" width="72" height="28" rx="4" />
          <rect x="146" y="104" width="72" height="28" rx="4" />
          <path d="M218 34l28 42M218 76h28M218 118l28-42" />
          <circle cx="274" cy="76" r="28" />
          <text x="54" y="81" textAnchor="middle">INPUT</text>
          <text x="182" y="39" textAnchor="middle">SCENE</text>
          <text x="182" y="81" textAnchor="middle">FACET</text>
          <text x="182" y="123" textAnchor="middle">RULE</text>
          <text x="274" y="81" textAnchor="middle">DECIDE</text>
        </svg>
      )}

      {kind === 'memory' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <rect x="20" y="48" width="76" height="58" rx="4" />
          <rect x="122" y="48" width="76" height="58" rx="4" />
          <rect x="224" y="48" width="76" height="58" rx="4" />
          <path d="M96 77h26M114 71l8 6-8 6M198 77h26M216 71l8 6-8 6" />
          <text x="58" y="82" textAnchor="middle">STORE</text>
          <text x="160" y="82" textAnchor="middle">MEMORY</text>
          <text x="262" y="82" textAnchor="middle">CONTEXT</text>
        </svg>
      )}

      {kind === 'harness' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <circle cx="160" cy="78" r="32" />
          <rect x="32" y="18" width="68" height="30" rx="4" />
          <rect x="220" y="18" width="68" height="30" rx="4" />
          <rect x="32" y="104" width="68" height="30" rx="4" />
          <rect x="220" y="104" width="68" height="30" rx="4" />
          <path d="M100 35l35 26M220 35l-35 26M100 119l35-25M220 119l-35-25" />
          <text x="66" y="38" textAnchor="middle">CONTEXT</text>
          <text x="254" y="38" textAnchor="middle">TOOLS</text>
          <text x="66" y="124" textAnchor="middle">ACCESS</text>
          <text x="254" y="124" textAnchor="middle">CHECKS</text>
          <text x="160" y="84" textAnchor="middle">LLM</text>
        </svg>
      )}

      {kind === 'agent' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <circle cx="88" cy="90" r="32" />
          <circle cx="232" cy="90" r="32" />
          <path d="M120 75c24-23 56-23 80 0" />
          <path d="M200 105c-24 23-56 23-80 0" />
          <path d="M194 66l8 10-13 2M126 114l-8-10 13-2" />
          <text x="88" y="96" textAnchor="middle">LLM</text>
          <text x="232" y="96" textAnchor="middle">TOOL</text>
          <text x="160" y="39" textAnchor="middle">ACTION</text>
          <text x="160" y="150" textAnchor="middle">OBSERVE</text>
        </svg>
      )}

      <span className="article-cover__label">{label}</span>
    </div>
  )
}
