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
      {kind === 'memory' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <rect x="42" y="36" width="92" height="108" rx="4" />
          <rect x="114" y="52" width="92" height="76" rx="4" />
          <rect x="186" y="68" width="92" height="44" rx="4" />
          <path d="M92 90h22M206 90h-1" />
          <text x="88" y="96" textAnchor="middle">STORE</text>
          <text x="160" y="96" textAnchor="middle">MEMORY</text>
          <text x="232" y="96" textAnchor="middle">CONTEXT</text>
        </svg>
      )}

      {kind === 'harness' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <circle cx="160" cy="90" r="34" />
          <rect x="32" y="30" width="68" height="32" rx="4" />
          <rect x="220" y="30" width="68" height="32" rx="4" />
          <rect x="32" y="118" width="68" height="32" rx="4" />
          <rect x="220" y="118" width="68" height="32" rx="4" />
          <path d="M100 49l35 25M220 49l-35 25M100 134l35-27M220 134l-35-27" />
          <text x="66" y="51" textAnchor="middle">CONTEXT</text>
          <text x="254" y="51" textAnchor="middle">TOOLS</text>
          <text x="66" y="139" textAnchor="middle">ACCESS</text>
          <text x="254" y="139" textAnchor="middle">CHECKS</text>
          <text x="160" y="96" textAnchor="middle">LLM</text>
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
