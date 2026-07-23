import type { ArticleCoverKind } from '../content/articles'

interface ArticleCoverProps {
  kind: ArticleCoverKind
}

/**
 * @description 为精选文章提供与其机制对应的轻量系统图，避免使用无语义装饰封面
 * @param props.kind 决定系统图结构的文章类型
 * @returns 不参与辅助技术朗读的装饰性 SVG 封面
 */
export function ArticleCover({ kind }: ArticleCoverProps) {
  return (
    <div className={`article-cover article-cover--${kind}`} aria-hidden="true">
      {kind === 'architecture' && (
        <svg viewBox="0 0 420 260" role="presentation">
          <defs>
            <marker id="architecture-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M1 0l4 3-4 3" className="article-cover__arrowhead" />
            </marker>
          </defs>

          <rect x="20" y="20" width="125" height="105" rx="5" />
          <rect x="30" y="52" width="50" height="32" rx="3" />
          <rect x="86" y="52" width="50" height="32" rx="3" />
          <rect x="59" y="91" width="47" height="26" rx="3" />

          <rect x="180" y="20" width="86" height="105" rx="5" />
          <rect x="191" y="52" width="64" height="32" rx="3" />
          <rect x="191" y="91" width="64" height="26" rx="3" />

          <rect x="286" y="20" width="110" height="105" rx="5" />
          <rect x="297" y="48" width="88" height="28" rx="3" />
          <rect x="297" y="82" width="88" height="28" rx="3" />

          <rect x="20" y="174" width="150" height="67" rx="5" />
          <rect x="30" y="203" width="58" height="28" rx="3" />
          <rect x="96" y="203" width="58" height="28" rx="3" />

          <rect x="201" y="174" width="170" height="67" rx="5" />
          <rect x="213" y="203" width="48" height="28" rx="3" />
          <rect x="269" y="203" width="48" height="28" rx="3" />
          <rect x="325" y="203" width="36" height="28" rx="3" />

          <g className="article-cover__connector" markerStart="url(#architecture-arrow)" markerEnd="url(#architecture-arrow)">
            <path d="M150 72h25" />
            <path d="M271 72h10" />
            <path d="M82 130v39" />
            <path d="M175 207h21" />
          </g>
          <path d="M84 68h2" className="article-cover__connector" markerEnd="url(#architecture-arrow)" />
          <path d="M132 174v-14q0-12 12-12h78q10 0 10-10v-8" className="article-cover__connector article-cover__connector--dash" markerEnd="url(#architecture-arrow)" />

          <text x="82.5" y="39" textAnchor="middle">Agent</text>
          <text x="55" y="72" textAnchor="middle">Planner</text>
          <text x="111" y="72" textAnchor="middle">Tools</text>
          <text x="82.5" y="108" textAnchor="middle">Memory</text>
          <text x="223" y="39" textAnchor="middle">Runtime</text>
          <text x="223" y="72" textAnchor="middle">Scheduler</text>
          <text x="223" y="108" textAnchor="middle">Executor</text>
          <text x="341" y="39" textAnchor="middle">Tools &amp; Services</text>
          <text x="341" y="66" textAnchor="middle">Search</text>
          <text x="341" y="100" textAnchor="middle">API</text>
          <text x="341" y="120" textAnchor="middle">...</text>
          <text x="95" y="193" textAnchor="middle">Memory Layer</text>
          <text x="59" y="221" textAnchor="middle">Short-term</text>
          <text x="125" y="221" textAnchor="middle">Long-term</text>
          <text x="286" y="193" textAnchor="middle">Knowledge</text>
          <text x="237" y="221" textAnchor="middle">KB</text>
          <text x="293" y="221" textAnchor="middle">Docs</text>
          <text x="343" y="221" textAnchor="middle">...</text>
        </svg>
      )}

      {kind === 'routes' && (
        <svg viewBox="0 0 260 180" role="presentation">
          <rect x="26" y="22" width="72" height="22" rx="4" className="article-cover__fill" />
          <rect x="162" y="22" width="72" height="22" rx="4" />
          <rect x="26" y="76" width="72" height="22" rx="4" />
          <rect x="162" y="76" width="72" height="22" rx="4" className="article-cover__fill" />
          <rect x="26" y="130" width="72" height="22" rx="4" className="article-cover__fill" />
          <rect x="162" y="130" width="72" height="22" rx="4" />
          <path d="M62 44v32M57 68l5 8 5-8M198 44v32M193 68l5 8 5-8M62 98v32M57 122l5 8 5-8M198 98v32M193 122l5 8 5-8M98 87h64M154 82l8 5-8 5" />
          <path d="M98 33h64M154 28l8 5-8 5M98 141h64M154 136l8 5-8 5" className="article-cover__dash" />
          <text x="62" y="36" textAnchor="middle" className="article-cover__label--inverse">NATIVE</text>
          <text x="198" y="36" textAnchor="middle">SDK</text>
          <text x="62" y="90" textAnchor="middle">GRAPH</text>
          <text x="198" y="90" textAnchor="middle" className="article-cover__label--inverse">RUNTIME</text>
          <text x="62" y="144" textAnchor="middle" className="article-cover__label--inverse">CONTROL</text>
          <text x="198" y="144" textAnchor="middle">COST</text>
        </svg>
      )}

      {kind === 'knowledge' && (
        <svg viewBox="0 0 260 180" role="presentation">
          <ellipse cx="62" cy="42" rx="28" ry="10" />
          <path d="M34 42v50c0 6 13 10 28 10s28-4 28-10V42M34 58c0 6 13 10 28 10s28-4 28-10M34 75c0 6 13 10 28 10s28-4 28-10" />
          <path d="M62 102v22q0 14 14 14h30" />
          <circle cx="142" cy="44" r="9" />
          <circle cx="178" cy="82" r="9" />
          <circle cx="142" cy="120" r="9" />
          <circle cx="216" cy="120" r="9" />
          <path d="M148 51l24 24M172 89l-24 24M187 84l24 29M151 120h56" />
          <text x="62" y="90" textAnchor="middle">INPUT</text>
          <text x="142" y="25" textAnchor="middle">AXIS</text>
          <text x="178" y="62" textAnchor="middle">FACET</text>
          <text x="142" y="146" textAnchor="middle">ENTITY</text>
          <text x="216" y="146" textAnchor="middle">DECIDE</text>
        </svg>
      )}

      {kind === 'memory' && (
        <svg viewBox="0 0 220 180" role="presentation">
          <path d="M110 14l66 18-66 18-66-18 66-18Z" className="article-cover__fill article-cover__fill--amber" />
          <path d="M110 52l66 18-66 18-66-18 66-18Z" className="article-cover__plane" />
          <path d="M110 90l66 18-66 18-66-18 66-18Z" className="article-cover__plane" />
          <path d="M110 128l66 18-66 18-66-18 66-18Z" className="article-cover__plane" />
          <text x="110" y="35" textAnchor="middle">MEMORY</text>
          <text x="110" y="73" textAnchor="middle">CONTEXT</text>
          <text x="110" y="111" textAnchor="middle">NOISE</text>
          <text x="110" y="149" textAnchor="middle">GOVERN</text>
        </svg>
      )}

      {kind === 'harness' && (
        <svg viewBox="0 0 240 180" role="presentation">
          <rect x="20" y="18" width="200" height="144" rx="8" className="article-cover__boundary" />
          <rect x="36" y="52" width="64" height="28" rx="5" />
          <rect x="140" y="52" width="64" height="28" rx="5" />
          <rect x="140" y="110" width="64" height="28" rx="5" />
          <rect x="36" y="110" width="64" height="28" rx="5" />
          <path d="M100 66h40M132 61l8 5-8 5M172 80v30M167 102l5 8 5-8M140 124h-40M108 119l-8 5 8 5M68 110V80M63 88l5-8 5 8" />
          <text x="120" y="39" textAnchor="middle">HARNESS</text>
          <text x="68" y="70" textAnchor="middle">CONTEXT</text>
          <text x="172" y="70" textAnchor="middle">AGENT</text>
          <text x="172" y="128" textAnchor="middle">VERIFY</text>
          <text x="68" y="128" textAnchor="middle">CLEANUP</text>
        </svg>
      )}

      {kind === 'agent' && (
        <svg viewBox="0 0 240 180" role="presentation">
          <path d="M28 28h88a10 10 0 0 1 10 10v46a10 10 0 0 1-10 10H70l-22 18V94H28a10 10 0 0 1-10-10V38a10 10 0 0 1 10-10Z" />
          <circle cx="48" cy="56" r="8" className="article-cover__fill" />
          <path d="M106 88h94a10 10 0 0 1 10 10v42a10 10 0 0 1-10 10h-20v16l-20-16h-54a10 10 0 0 1-10-10V98a10 10 0 0 1 10-10Z" />
          <path d="M24 126h54a10 10 0 0 1 10 10v20H34l-16 12v-32a10 10 0 0 1 10-10Z" />
          <text x="84" y="61" textAnchor="middle">CHAT AI</text>
          <text x="153" y="116" textAnchor="middle">AGENT</text>
          <text x="153" y="131" textAnchor="middle">LOOP</text>
          <text x="53" y="145" textAnchor="middle">TOOLS</text>
        </svg>
      )}

      {kind === 'reactArchitecture' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <defs>
            <marker id="react-architecture-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M1 0l4 3-4 3" className="article-cover__marker" />
            </marker>
          </defs>
          <rect x="20" y="59" width="78" height="34" rx="5" />
          <circle cx="160" cy="76" r="40" className="article-cover__fill--soft" />
          <rect x="222" y="59" width="78" height="34" rx="5" />
          <rect x="127" y="128" width="66" height="26" rx="5" />
          <path d="M98 76h20M202 76h20M160 116v12" markerEnd="url(#react-architecture-arrow)" />
          <path d="M127 141H88q-29 0-29-29V93" className="article-cover__dash" markerEnd="url(#react-architecture-arrow)" />
          <text x="59" y="80" textAnchor="middle">SCHEDULE</text>
          <text x="160" y="73" textAnchor="middle">RECONCILE</text>
          <text x="160" y="88" textAnchor="middle">WORK LOOP</text>
          <text x="261" y="80" textAnchor="middle">RENDER</text>
          <text x="160" y="145" textAnchor="middle">COMMIT</text>
        </svg>
      )}

      {kind === 'fiber' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <defs>
            <marker id="fiber-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M1 0l4 3-4 3" className="article-cover__marker" />
            </marker>
          </defs>
          <circle cx="160" cy="32" r="16" className="article-cover__fill--soft" />
          <circle cx="92" cy="92" r="18" className="article-cover__fill--soft" />
          <circle cx="228" cy="92" r="18" />
          <circle cx="56" cy="146" r="16" />
          <circle cx="128" cy="146" r="16" />
          <path d="M148 43l-43 36M110 92h100M82 108l-16 23M72 146h40" markerEnd="url(#fiber-arrow)" />
          <path d="M228 74c0-38-27-52-52-46" className="article-cover__dash" markerEnd="url(#fiber-arrow)" />
          <text x="160" y="36" textAnchor="middle">A</text>
          <text x="92" y="96" textAnchor="middle">B</text>
          <text x="228" y="96" textAnchor="middle">C</text>
          <text x="56" y="150" textAnchor="middle">D</text>
          <text x="128" y="150" textAnchor="middle">E</text>
          <text x="109" y="57" textAnchor="middle" className="article-cover__pointer-label">CHILD</text>
          <text x="160" y="82" textAnchor="middle" className="article-cover__pointer-label">SIBLING</text>
          <text x="211" y="30" textAnchor="middle" className="article-cover__pointer-label">RETURN</text>
        </svg>
      )}

      {kind === 'lanes' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <path d="M34 42h162c22 0 24 18 40 30M34 84h196M34 126h144c34 0 42-13 58-20" />
          <circle cx="34" cy="42" r="4" className="article-cover__signal-dot" />
          <circle cx="34" cy="84" r="4" className="article-cover__signal-dot" />
          <circle cx="34" cy="126" r="4" className="article-cover__signal-dot" />
          <circle cx="196" cy="42" r="4" className="article-cover__open-dot" />
          <circle cx="230" cy="84" r="4" className="article-cover__open-dot" />
          <circle cx="178" cy="126" r="4" className="article-cover__open-dot" />
          <circle cx="260" cy="90" r="30" className="article-cover__fill--soft" />
          <text x="34" y="30">SYNC</text>
          <text x="34" y="72">DEFAULT</text>
          <text x="34" y="114">IDLE</text>
          <text x="260" y="87" textAnchor="middle">SELECT</text>
          <text x="260" y="102" textAnchor="middle">NEXT</text>
        </svg>
      )}

      {kind === 'promise' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <circle cx="70" cy="78" r="30" />
          <rect x="198" y="26" width="92" height="34" rx="4" />
          <rect x="198" y="96" width="92" height="34" rx="4" />
          <path d="M100 68l98-25M100 88l98 25M190 37l8 6-10 2M188 108l10 5-8 6" />
          <text x="70" y="83" textAnchor="middle">PENDING</text>
          <text x="244" y="48" textAnchor="middle">FULFILLED</text>
          <text x="244" y="118" textAnchor="middle">REJECTED</text>
          <text x="145" y="46" textAnchor="middle">resolve</text>
          <text x="145" y="118" textAnchor="middle">reject</text>
        </svg>
      )}

      {kind === 'async' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <rect x="20" y="58" width="76" height="38" rx="4" />
          <rect x="122" y="58" width="76" height="38" rx="4" />
          <rect x="224" y="58" width="76" height="38" rx="4" />
          <path d="M96 77h26M114 71l8 6-8 6M198 77h26M216 71l8 6-8 6" />
          <path d="M262 104c0 34-204 34-204 0M66 111l-8-7-6 9" />
          <text x="58" y="82" textAnchor="middle">GENERATOR</text>
          <text x="160" y="82" textAnchor="middle">PROMISE</text>
          <text x="262" y="82" textAnchor="middle">RESUME</text>
          <text x="160" y="143" textAnchor="middle">AWAIT</text>
        </svg>
      )}

      {kind === 'eventLoop' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <rect x="28" y="25" width="74" height="34" rx="4" />
          <rect x="218" y="25" width="74" height="34" rx="4" />
          <rect x="218" y="106" width="74" height="34" rx="4" />
          <rect x="28" y="106" width="74" height="34" rx="4" />
          <path d="M102 42h116M210 36l8 6-8 6M255 59v47M249 98l6 8 6-8M218 123H102M110 117l-8 6 8 6M65 106V59M59 67l6-8 6 8" />
          <text x="65" y="47" textAnchor="middle">TASK</text>
          <text x="255" y="47" textAnchor="middle">STACK</text>
          <text x="255" y="128" textAnchor="middle">MICROTASK</text>
          <text x="65" y="128" textAnchor="middle">RENDER</text>
        </svg>
      )}

      {kind === 'webpack' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <rect x="22" y="58" width="68" height="38" rx="4" />
          <circle cx="158" cy="42" r="18" />
          <circle cx="128" cy="91" r="18" />
          <circle cx="188" cy="91" r="18" />
          <rect x="230" y="46" width="68" height="62" rx="4" />
          <path d="M90 70l52-22M90 84l20 6M167 59l12 16M146 91h24M206 91l24-8" />
          <text x="56" y="82" textAnchor="middle">ENTRY</text>
          <text x="158" y="46" textAnchor="middle">A</text>
          <text x="128" y="95" textAnchor="middle">B</text>
          <text x="188" y="95" textAnchor="middle">C</text>
          <text x="264" y="73" textAnchor="middle">CHUNKS</text>
          <text x="264" y="88" textAnchor="middle">ASSETS</text>
        </svg>
      )}

      {kind === 'federation' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <rect x="20" y="28" width="84" height="50" rx="4" />
          <rect x="216" y="28" width="84" height="50" rx="4" />
          <rect x="118" y="108" width="84" height="42" rx="4" />
          <circle cx="160" cy="68" r="24" />
          <path d="M104 53l32 9M216 53l-32 9M160 92v16" />
          <text x="62" y="57" textAnchor="middle">HOST</text>
          <text x="258" y="57" textAnchor="middle">REMOTE</text>
          <text x="160" y="73" textAnchor="middle">RUNTIME</text>
          <text x="160" y="134" textAnchor="middle">SHARED</text>
        </svg>
      )}

      {kind === 'rollup' && (
        <svg viewBox="0 0 320 180" role="presentation">
          <rect x="20" y="24" width="72" height="28" rx="4" />
          <rect x="20" y="63" width="72" height="28" rx="4" />
          <rect x="20" y="102" width="72" height="28" rx="4" />
          <circle cx="160" cy="77" r="32" />
          <rect x="228" y="48" width="72" height="58" rx="4" />
          <path d="M92 38l40 25M92 77h36M92 116l40-25M192 77h36M220 71l8 6-8 6" />
          <text x="56" y="43" textAnchor="middle">MODULE A</text>
          <text x="56" y="82" textAnchor="middle">MODULE B</text>
          <text x="56" y="121" textAnchor="middle">MODULE C</text>
          <text x="160" y="73" textAnchor="middle">AST</text>
          <text x="160" y="88" textAnchor="middle">GRAPH</text>
          <text x="264" y="74" textAnchor="middle">FINAL</text>
          <text x="264" y="89" textAnchor="middle">BUNDLE</text>
        </svg>
      )}

    </div>
  )
}
