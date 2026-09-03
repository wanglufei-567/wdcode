import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { SiteNavigationProvider } from './app/SiteNavigationContext'
import { IsolatedModuleRoute } from './app/SiteModuleErrorBoundary'
import { siteRegistry } from './app/siteModules'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

/**
 * @description 声明个人站核心路由，并装配构建时注册的站内业务模块
 * @returns 应用路由树
 */
export function App() {
  return (
    <BrowserRouter>
      <SiteNavigationProvider items={siteRegistry.navigation}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {siteRegistry.routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={(
                <IsolatedModuleRoute moduleId={route.moduleId}>
                  {route.element}
                </IsolatedModuleRoute>
              )}
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SiteNavigationProvider>
    </BrowserRouter>
  )
}
