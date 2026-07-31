const ICP_RECORD_URL = 'https://beian.miit.gov.cn/'
const PUBLIC_SECURITY_RECORD_URL =
  'https://beian.mps.gov.cn/#/query/webSearch?code=33010602014742'

/**
 * @description 在全站底部展示备案网站名称、工信部 ICP 与公安联网备案查询入口
 * @returns 个人站公共合规信息栏
 */
export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p>
        <span>© {currentYear} 编程实践笔记</span>
        <span aria-hidden="true">·</span>
        <a
          className="site-footer__public-security-record"
          href={PUBLIC_SECURITY_RECORD_URL}
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt=""
            height="20"
            src="/public-security-record.png"
            width="18"
          />
          <span>浙公网安备33010602014742号</span>
        </a>
        <span aria-hidden="true">·</span>
        <a href={ICP_RECORD_URL} rel="noreferrer" target="_blank">
          豫ICP备2026027889号-1
        </a>
      </p>
    </footer>
  )
}
