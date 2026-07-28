const ICP_RECORD_URL = 'https://beian.miit.gov.cn/'

/**
 * @description 在全站底部展示备案网站名称和工信部 ICP 备案查询入口
 * @returns 个人站公共合规信息栏
 */
export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p>
        <span>© {currentYear} 编程实践笔记</span>
        <span aria-hidden="true">·</span>
        <a href={ICP_RECORD_URL} rel="noreferrer" target="_blank">
          豫ICP备2026027889号-1
        </a>
      </p>
    </footer>
  )
}
