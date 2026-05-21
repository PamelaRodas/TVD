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
          Growth Journal
        </a>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/diary">Diary</Link></li>
          <li><Link to="/photo-dump">Photo Dump</Link></li>
          <li><Link to="/growth">Growth</Link></li>
          <li><Link to="/about">About Me</Link></li>
          <li><Link to="/studio">Studio</Link></li>
        </ul>

        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          {theme === 'nebula' ? 'Purple Galaxy' : 'Nebula'}
        </button>
      </nav>
    </header>
  );
}

