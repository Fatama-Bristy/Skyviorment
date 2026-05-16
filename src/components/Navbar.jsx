import { useContext } from 'react';
import { FiMoon, FiSun, FiMenu, FiUser } from '../icons';
import { SkyviormentLogo } from '../icons';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import SearchBar from './SearchBar';

export default function Navbar({ onSearch, onToggleSidebar, onProfileClick }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      {/* LEFT — Logo + Name */}
      <div className="nav-brand" onClick={() => onSearch('New York')}>
        <SkyviormentLogo size={28} />
        <span>Skyviorment</span>
      </div>

      {/* CENTER — Search */}
      <SearchBar onSearch={onSearch} />

      {/* RIGHT — Theme, Profile, Menu */}
      <div className="nav-right">
        <button className="nav-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <FiMoon size={16} /> : <FiSun size={16} />}
        </button>
        <div className="nav-avatar" onClick={onProfileClick} title={user ? user.name : 'Sign in'}>
          {user ? (
            <span style={{ fontWeight: 700, fontSize: '.78rem', color: 'var(--skyblue)' }}>
              {user.name[0].toUpperCase()}
            </span>
          ) : (
            <FiUser size={14} />
          )}
        </div>
        <button className="nav-btn" onClick={onToggleSidebar} aria-label="Menu">
          <FiMenu size={16} />
        </button>
      </div>
    </nav>
  );
}