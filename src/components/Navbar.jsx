import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          &lt;MI /&gt;
        </NavLink>
        <div className="navbar-links">
          <NavLink to="/" end>
            Accueil
          </NavLink>
          <NavLink to="/projects">Projets</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}
