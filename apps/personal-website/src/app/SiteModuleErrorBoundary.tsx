import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface SiteModuleErrorBoundaryProps {
  children: ReactNode
  moduleId: string
}

interface SiteModuleErrorBoundaryState {
  hasError: boolean
}

class SiteModuleErrorBoundary extends Component<
  SiteModuleErrorBoundaryProps,
  SiteModuleErrorBoundaryState
> {
  public state: SiteModuleErrorBoundaryState = { hasError: false }

  public static getDerivedStateFromError(): SiteModuleErrorBoundaryState {
    return { hasError: true }
  }

  /**
   * @description 将模块异常保留在当前路由边界，并向控制台提供模块标识供定位
   * @param error 模块渲染阶段抛出的异常
   * @param errorInfo React 提供的组件调用栈
   * @returns 无返回值
   */
  public componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    console.error(`站点模块 ${this.props.moduleId} 渲染失败`, error, errorInfo)
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="note-reader-status note-reader-status--error" role="alert">
          <h1>当前模块暂时无法显示</h1>
          <p>请返回首页后重试，其他站点模块不受影响</p>
          <Link to="/">返回首页</Link>
        </main>
      )
    }

    return this.props.children
  }
}

interface IsolatedModuleRouteProps extends SiteModuleErrorBoundaryProps {}

/**
 * @description 按当前地址重建错误边界，避免一次模块异常污染后续页面导航
 * @param props.moduleId 注册表提供的模块标识
 * @param props.children 当前模块路由元素
 * @returns 带独立错误恢复边界的模块页面
 */
export function IsolatedModuleRoute({ children, moduleId }: IsolatedModuleRouteProps) {
  const location = useLocation()

  return (
    <SiteModuleErrorBoundary key={`${moduleId}:${location.pathname}`} moduleId={moduleId}>
      {children}
    </SiteModuleErrorBoundary>
  )
}
