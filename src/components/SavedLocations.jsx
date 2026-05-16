import { useContext, useState } from 'react';
import { FiBookmark, FiLock, FiEye, FiShare2, FiTrash2 } from '../icons';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

export default function SavedLocations({ onLoadCity, onShare }) {
  const { user } = useContext(AuthContext);
  const { unit } = useContext(ThemeContext);
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('skyv_saved') || '[]'); } catch { return []; }
  });

  const cvts = (c) => unit === 'f' ? Math.round(c*9/5+32)+'°' : c+'°';

  const remove = (i) => {
    const s = [...saved]; s.splice(i, 1); setSaved(s);
    try { localStorage.setItem('skyv_saved', JSON.stringify(s)); } catch {}
  };

  if (!user) return <div className="glass"><div className="empty"><FiLock size={36} /><p>Sign in to view saved locations</p></div></div>;
  if (!saved.length) return <div className="glass"><div className="empty"><FiBookmark size={36} /><p>No saved locations yet</p></div></div>;

  return (
    <div className="saved-grid">
      {saved.map((s, i) => (
        <div key={i} className="saved-card" style={{animation:`fadeIn .4s ${i*.07}s both`}}>
          <div className="saved-top">
            <div><div className="saved-city">{s.city}</div><div className="saved-desc">{s.desc}</div></div>
            <div className="saved-temp">{cvts(s.temp)}</div>
          </div>
          <div className="saved-actions">
            <button onClick={() => onLoadCity(s.city)}><FiEye size={11} /> View</button>
            <button onClick={() => onShare(s.city, s.temp, s.desc)}><FiShare2 size={11} /> Share</button>
            <button className="rm" onClick={() => remove(i)}><FiTrash2 size={11} /> Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}