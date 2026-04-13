import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import PackagingPage from './pages/packaging.tsx'
import PortfolioPage from './pages/portfolio/page/[sitename].tsx'
import './index.css'

const rootElement = document.getElementById('root')!

const Root = () => (
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/packaging" element={<PackagingPage />} />
        <Route path="/portfolio/page/:sitename" element={<PortfolioPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <Root />)
} else {
  createRoot(rootElement).render(<Root />)
}