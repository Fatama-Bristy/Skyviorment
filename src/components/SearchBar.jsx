import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiClock } from '../icons';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [dropOpen, setDropOpen] = useState(false);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('skyv_hist') || '[]'); } catch { return []; }
  });
  const ref = useRef(null);

  const doSearch = () => {
    const q = query.trim();
    if (!q) return;
    const h = [q, ...history.filter(c => c.toLowerCase() !== q.toLowerCase())].slice(0, 8);
    setHistory(h);
    try { localStorage.setItem('skyv_hist', JSON.stringify(h)); } catch {}
    onSearch(q);
    setQuery('');
    setDropOpen(false);
  };

  const pickHistory = (c) => { setQuery(''); setDropOpen(false); onSearch(c); };
  const clearHist = () => { setHistory([]); try { localStorage.setItem('skyv_hist', '[]'); } catch {} setDropOpen(false); };

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);

  const filtered = query ? history.filter(c => c.toLowerCase().includes(query.toLowerCase())) : history;

  return (
    <div className="nav-search-area">
      <div className="search-wrap" ref={ref}>
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setDropOpen(true); }}
          onFocus={() => setDropOpen(true)}
          onKeyDown={e => e.key === 'Enter' && doSearch()}
          placeholder="City Name"
          aria-label="Search city"
        />
        <button className="search-btn" onClick={doSearch} aria-label="Search">
          <FiSearch size={14} />
        </button>
        {dropOpen && filtered.length > 0 && (
          <div className="search-drop open">
            {filtered.map(c => (
              <div key={c} className="search-drop-item" onClick={() => pickHistory(c)}>
                <FiClock size={12} /> {c}
              </div>
            ))}
            <div className="search-drop-clear" onClick={clearHist}>Clear history</div>
          </div>
        )}
      </div>
    </div>
  );
}