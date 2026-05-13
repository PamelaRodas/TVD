import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="topnav">
        <a className="brand" href="#home">
          <span className="brand-symbol">T</span>
          tvd journal
        </a>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/diary">Diary</Link></li>
          <li><Link to="/photo-dump">Photo Dump</Link></li>
          <li><Link to="/manifestation">Manifestation</Link></li>
          <li><Link to="/about">About Me</Link></li>
          <li><Link to="/studio">Studio</Link></li>
        </ul>
      </nav>
    </header>
  );
}
