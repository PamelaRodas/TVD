import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './pages/About';
import Diary from './pages/Diary';
import PhotoDump from './pages/Photo';
import Manifestation from './pages/Manifestation';
import SacredSpace from './pages/SacredSpace';
import Studio from './pages/Studio';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import EasterEggs from './components/EasterEggs';
import MetaphysicalDecor from './components/MetaphysicalDecor';

import './App.css'
import './theme.css'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <div className="page-transition fade-in">
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/photo-dump" element={<PhotoDump />} />
        <Route path="/growth" element={<Manifestation />} />
        <Route path="/sacred-space" element={<SacredSpace />} />
        <Route path="/studio" element={<Studio />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MetaphysicalDecor />
      <CustomCursor />
      <EasterEggs />
      <AppContent />
    </BrowserRouter>
  );
}

export default App


