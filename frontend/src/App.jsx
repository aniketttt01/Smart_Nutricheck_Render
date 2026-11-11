import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import ChatBot from './components/ChatBot'
import Home from './pages/Home'
import Screening from './pages/Screening'
import Awareness from './pages/Awareness'
import './App.css'

function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="mr">मराठी</option>
      </select>
    </div>
  )
}

function AppShell() {
  const location = useLocation()

  return (
    <div className="page-layout">
      <Navbar />
      <LanguageToggle />
      <main className="main-area">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/screening" element={<Screening />} />
            <Route path="/awareness" element={<Awareness />} />
          </Routes>
        </AnimatePresence>
      </main>
      <ChatBot />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </ThemeProvider>
  )
}
