import { FiHome, FiMap, FiGlobe, FiCpu, FiBookmark, FiSettings, FiX } from '../icons';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const ITEMS = [
  { id: 'home', icon: FiHome, label: 'Home' },
  { id: 'map', icon: FiMap, label: 'Map' },
  { id: 'country', icon: FiGlobe, label: 'Country Details' },
  { id: 'ai', icon: FiCpu, label: 'AI Assistant' },
  { id: 'saved', icon: FiBookmark, label: 'Saved Locations' },
  { id: 'settings', icon: FiSettings, label: 'Settings' },
];

export default function Sidebar({ open, onClose, onNav, onProfileClick, currentPage }) {
  const { user, aiQ } = useContext(AuthContext);

  return (
    <>
      <div className={`side-overlay${open ? ' open' : ''}`} onClick={onClose} />
      {/* Sidebar now opens from RIGHT side */}
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <div className="side-head">
          <h2>Menu</h2>
          <button className="side-close" onClick={onClose}><FiX size={14} /></button>
        </div>
        <nav className="side-nav">
          {ITEMS.map(it => {
            const Icon = it.icon;
            const badge = it.id === 'ai' && !user ? Math.max(0, 2 - aiQ) : null;
            return (
              <div
                key={it.id}
                className={`side-item${currentPage === it.id ? ' active' : ''}`}
                onClick={() => { onNav(it.id); onClose(); }}
              >
                <Icon size={16} /> {it.label}
                {badge !== null && badge > 0 && <span className="side-badge">{badge}</span>}
              </div>
            );
          })}
        </nav>
        <div className="side-foot">
          <div className="side-user" onClick={onProfileClick}>
            <div className="side-user-av">{user ? user.name[0].toUpperCase() : '?'}</div>
            <div className="side-user-info">
              <p>{user ? user.name : 'Guest'}</p>
              <span>{user ? user.email : 'Not logged in'}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}