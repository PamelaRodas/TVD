import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function Header() {
  const [theme, setTheme] = useState(() => localStorage.getItem('siteTheme') || 'nebula');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('siteTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'nebula' ? 'deep-space' : 'nebula'));
  };

  return (
    <header className="site-header">
      <nav className="topnav">
        <a className="brand" href="#home">
          <span className="brand-symbol">M</span>
          Diario de Crecimiento
        </a>

        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/diary">Diario</Link></li>
          <li><Link to="/photo-dump">Galería</Link></li>
          <li><Link to="/growth">Crecimiento</Link></li>
          <li><Link to="/about">Acerca de</Link></li>
          <li><Link to="/studio">Estudio</Link></li>
        </ul>

        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          {theme === 'nebula' ? 'Galaxia Púrpura' : 'Nebulosa'}
        </button>
      </nav>
    </header>
  );
}

