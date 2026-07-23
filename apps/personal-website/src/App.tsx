import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { NotesPage } from './pages/NotesPage'
import { NotFoundPage } from './pages/NotFoundPage'

/**
 * @description 声明个人站最小路由边界，只包含首页、完整笔记和不存在页面
 * @returns 应用路由树
 */
export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/*" element={<NotesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
