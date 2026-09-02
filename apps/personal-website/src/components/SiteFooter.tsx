import { useEffect, useState } from 'react'

const ICP_RECORD_URL = 'https://beian.miit.gov.cn/'
const PUBLIC_SECURITY_RECORD_URL =
  'https://beian.mps.gov.cn/#/query/webSearch?code=33010602014742'
const GITHUB_PROFILE_URL = 'https://github.com/wanglufei-567'
const CONTACT_EMAIL = 'wanglufei561@163.com'
const COPY_FEEDBACK_DURATION_MS = 2200

type EmailCopyFeedback = {
  status: 'copied' | 'failed'
}

/**
 * @description 在全站底部分层展示对外联系入口和网站备案信息
 * @returns 个人站公共页脚
 */
export function SiteFooter() {
  const currentYear = new Date().getFullYear()
  const [emailCopyFeedback, setEmailCopyFeedback] =
    useState<EmailCopyFeedback | null>(null)

  useEffect(() => {
    if (!emailCopyFeedback) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setEmailCopyFeedback(null)
    }, COPY_FEEDBACK_DURATION_MS)

    return () => window.clearTimeout(timeoutId)
  }, [emailCopyFeedback])

  /**
   * @description 把公开工作邮箱写入系统剪贴板，避免依赖本地邮件客户端
   * @returns 剪贴板操作完成后更新为成功或失败反馈
   */
  async function handleEmailCopy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setEmailCopyFeedback({ status: 'copied' })
    } catch {
      setEmailCopyFeedback({ status: 'failed' })
    }
  }

  const emailCopyMessage =
    emailCopyFeedback?.status === 'copied'
      ? '邮箱地址已复制'
      : '复制失败，请重试'

  return (
    <footer className="site-footer">
      <address className="site-footer__contact" aria-label="联系方式">
        <a
          className="site-footer__contact-item"
          aria-label="查看 wanglufei-567 的 GitHub 主页"
          href={GITHUB_PROFILE_URL}
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt=""
            className="site-footer__contact-icon"
            height="16"
            src="/github-invertocat-black.svg"
            width="16"
          />
          <span>GitHub</span>
        </a>
        <span aria-hidden="true">·</span>
        <button
          aria-label={`复制邮箱地址：${CONTACT_EMAIL}`}
          className="site-footer__contact-item"
          onClick={handleEmailCopy}
          type="button"
        >
          <img
            alt=""
            className="site-footer__contact-icon"
            height="16"
            src="/email.svg"
            width="16"
          />
          <span>邮件</span>
        </button>
      </address>
      {emailCopyFeedback ? (
        <div
          className={`copy-toast copy-toast--${emailCopyFeedback.status}`}
          role="status"
          aria-live="polite"
        >
          {emailCopyMessage}
        </div>
      ) : null}
      <p className="site-footer__records">
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
