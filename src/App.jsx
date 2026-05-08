import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './pages/About';
import Diary from './pages/Diary';
import PhotoDump from './pages/Photo';
import Playlists from './pages/Playlist';

import Manifestation from './pages/Manifestation';
import SacredSpace from './pages/SacredSpace';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import EasterEggs from './components/EasterEggs';
import MetaphysicalDecor from './components/MetaphysicalDecor';
import CosmicRain from './components/CosmicRain';

import './App.css'

function AppContent() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className={`page-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/photo-dump" element={<PhotoDump />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/manifestation" element={<Manifestation />} />
        <Route path="/sacred-space" element={<SacredSpace />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MetaphysicalDecor />
        <CosmicRain />
      <CustomCursor />
      <EasterEggs />
      <AppContent />
    </BrowserRouter>
  );
}

export default App
