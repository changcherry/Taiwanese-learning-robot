import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import StoryModePage from './components/StoryModePage.tsx'
import FavoritePage from './components/FavoritePage.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/story" element={<StoryModePage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)