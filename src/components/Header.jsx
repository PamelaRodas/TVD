import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="site-header">
      <nav className="topnav">
        <a className="brand" href="#home">
          <span className="brand-symbol">✦</span>
          tvd journal
        </a>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/diary">Diary</Link></li>
          <li><Link to="/photo-dump">Photo Dump</Link></li>
          <li><Link to="/playlists">Playlists</Link></li>
                    <li><Link to="/manifestation">Manifestation</Link></li>
          <li><Link to="/about">About Me</Link></li>
        </ul>

        <a className="nav-pill" href="#playlists">
          <span className="mood-icon">🌙</span>
          midnight mood
        </a>
      </nav>
    </header>
  );
}
