/**
 * @description 复现首页设计稿右侧的路径节点机制图
 * @returns 不参与辅助技术朗读的装饰性 SVG
 */
export function HeroMechanism() {
  return (
    <div className="hero-mechanism" aria-hidden="true">
      <svg viewBox="0 0 620 272" preserveAspectRatio="none" role="presentation">
        <g transform="translate(0 -13) scale(1 1.106)">
          <g className="hero-mechanism__grid">
            <path d="M156 82v182M377 10v256M445 10v256M500 10v256M555 10v256" />
            <path d="M140 74h430M140 134h430M140 194h430M140 254h430" />
          </g>

          <g className="hero-mechanism__primary">
            <path d="M38 214h54q18 0 18-18v-26q0-18 18-18h61q18 0 18-18v-31q0-18 18-18h87q18 0 18-18V58" />
            <path d="M294 248v-96q0-18 18-18h47q18 0 18-18V92q0-18 18-18h50" />
            <path d="M80 58h250" />
          </g>

          <g className="hero-mechanism__secondary">
            <path d="M80 58l76 47h174" />
            <path d="M294 178h153" />
            <path d="M407 108h160" />
            <path d="M500 108v140" />
            <path d="M445 74v180" />
            <path d="M500 248h70" />
          </g>

          <g className="hero-mechanism__dots">
            <circle cx="38" cy="214" r="7" />
            <circle cx="80" cy="58" r="4" />
            <circle cx="156" cy="105" r="7" className="hero-mechanism__dot--open" />
            <rect x="148" y="144" width="16" height="16" rx="3" />
            <circle cx="330" cy="58" r="7" className="hero-mechanism__dot--soft" />
            <circle cx="294" cy="248" r="7" />
            <rect x="285" y="169" width="18" height="18" rx="5" className="hero-mechanism__node" />
            <circle cx="447" cy="178" r="6" className="hero-mechanism__dot--open" />
            <circle cx="500" cy="108" r="6" className="hero-mechanism__dot--open" />
            <circle cx="500" cy="248" r="4" />
            <rect x="439" y="242" width="12" height="12" />
            <circle cx="568" cy="178" r="5" className="hero-mechanism__dot--soft" />
          </g>

          <g className="hero-mechanism__microdots">
            <circle cx="176" cy="198" r="2" />
            <circle cx="192" cy="198" r="2" />
            <circle cx="208" cy="198" r="2" />
            <circle cx="224" cy="198" r="2" />
            <circle cx="176" cy="214" r="2" />
            <circle cx="192" cy="214" r="2" />
            <circle cx="208" cy="214" r="2" />
            <circle cx="224" cy="214" r="2" />
            <circle cx="176" cy="230" r="2" />
            <circle cx="192" cy="230" r="2" />
            <circle cx="208" cy="230" r="2" />
            <circle cx="224" cy="230" r="2" />
          </g>

          <g className="hero-mechanism__ghost">
            <path d="M156 105L80 58M330 58L207 152M377 134L568 252M447 178L555 114" />
            <circle cx="253" cy="134" r="3" />
            <circle cx="377" cy="194" r="3" />
            <circle cx="445" cy="134" r="3" />
            <circle cx="555" cy="194" r="4" className="hero-mechanism__dot--open" />
          </g>
        </g>
      </svg>
    </div>
  )
}
