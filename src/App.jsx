import { useState, useCallback, useContext, createContext, useEffect, useRef } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo, FiCpu, FiGlobe, FiBookmark, FiCopy } from './icons';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useWeather } from './hooks/useWeather';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginModal from './components/LoginModal';
import SavedLocations from './components/SavedLocations';
import CountryDetails from './components/CountryDetails';
import Footer from './components/Footer';
import Home from './pages/Home';
import Map from './pages/Map';
import Settings from './pages/Settings';

export const WeatherCtx = createContext();

function AIAssistant({ loadWeather }) { 
  const { user, aiQ, setAiQ } = useContext(AuthContext);
  const { weather } = useContext(WeatherCtx);
  const [msgs, setMsgs] = useState([{ type: 'bot', text: 'Hello! 👋 Ask me anything about the weather. You can ask "weather in London", "temperature of Dhaka", or just type a city name like "Tokyo".' }]);
  const [input, setInput] = useState('');

  
  const extractCity = (q) => {
    const ql = q.toLowerCase().trim();
    const weatherKeywords = ['weather', 'temp', 'temperature', 'rain', 'climate', 'umbrella', 'wear', 'cloth', 'jacket', 'hot', 'cold', 'wind', 'humid', 'sunrise', 'sunset', 'visibility', 'today', 'hi', 'hello', 'hey', 'thanks', 'what', 'how', 'is', 'it', 'tell', 'me', 'about'];

    // Pattern 1: "weather in [city]", "rain of [city]", "about [city]"
    const match1 = ql.match(/(?:weather|temp|temperature|rain|climate|about|tell me about)\s+(?:in|of|for)?\s*([a-zA-Z\s]+)$/i);
    if (match1 && match1[1].trim()) return match1[1].trim();
    
    // Pattern 2: "[city] weather"
    const match2 = ql.match(/([a-zA-Z\s]+)\s+(?:weather|temp|temperature|rain|climate)$/i);
    if (match2 && match2[1].trim()) return match2[1].trim();

    
    const words = ql.split(/\s+/);
    if (words.length <= 3 && !weatherKeywords.some(kw => ql.includes(kw))) {
        return q.trim(); 
    }

    return null;
  };

  
  const isRainy = (main) => ['rain', 'drizzle', 'thunderstorm'].includes(main?.toLowerCase());

  const respond = async (q) => { 
    const ql = q.toLowerCase().trim();
    const w = weather;

    
    const askedCity = extractCity(q);
    
    if (askedCity) {
      if (w && askedCity.toLowerCase() === w.city.toLowerCase()) {
        
        let reply = `Currently in ${w.city}: ${w.desc}, ${w.temp}° (feels like ${w.feels}°).`;
        if (isRainy(w.main)) reply += ` Since it's raining, you should carry an umbrella! ☔`;
        return reply;
      } else {
        
        try {
          const result = await loadWeather(askedCity);
          if (result.data) {
            const ad = result.data;
            let reply = `The temperature in ${ad.city} is ${ad.temp}° and it's currently ${ad.desc.toLowerCase()}.`;
            if (isRainy(ad.main)) {
              reply += ` Since it's raining there, you should carry an umbrella! ☔`;
            }
            return reply;
          } else {
            const suggestion = result.suggestion;
            const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
            if (suggestion) {
              return `I couldn't find "${askedCity}". Did you mean "${capitalize(suggestion)}"? Please write the correct city or country name. 🏙️`;
            }
            return `I couldn't find "${askedCity}". Please write the correct city or country name. 🏙️`;
          }
        } catch {
          return `Failed to fetch weather for ${askedCity}. Please check your connection.`;
        }
      }
    }

    if (!w) return 'Please search for a city first or ask "weather in [city name]"!';

    // Greetings
    if (['hi', 'hello', 'hey', 'yo', 'assalamu'].some(g => ql.includes(g))) {
      let reply = `Hello! 👋 The weather in ${w.city} is currently ${w.desc.toLowerCase()} at ${w.temp}°.`;
      if (isRainy(w.main)) reply += ` It's raining, so don't forget your umbrella! ☔`;
      return reply;
    }

    // Thanks
    if (['thanks', 'thank you', 'thx'].some(g => ql.includes(g))) {
      return `You're welcome! Let me know if you need anything else about ${w.city}'s weather.`;
    }

    // Rain / Umbrella
    if (ql.includes('rain') || ql.includes('umbrella') || ql.includes('drizzle')) {
      if (isRainy(w.main)) return `Yes, it looks like ${w.desc.toLowerCase()} in ${w.city}. You should definitely take an umbrella! ☔`;
      if (w.hum > 80) return `No rain right now, but humidity is ${w.hum}%, so it might drizzle. Keep an umbrella handy just in case.`;
      return `No rain in ${w.city} right now. The sky is clear from rain! ☀️`;
    }

    // Clothing / What to wear
    if (ql.includes('wear') || ql.includes('cloth') || ql.includes('jacket') || ql.includes('outfit')) {
      let reply = '';
      if (w.temp < 5) reply = `It's freezing at ${w.temp}° in ${w.city}! Wear a heavy winter jacket, scarf, and gloves. 🧥`;
      else if (w.temp < 15) reply = `It's chilly at ${w.temp}°. A warm jacket or sweater is a good choice. 🧣`;
      else if (w.temp < 25) reply = `The temperature is pleasant at ${w.temp}°. Light casual clothing is perfect! 👕`;
      else if (w.temp < 35) reply = `It's warm at ${w.temp}°. Wear light, breathable cotton clothes. 🌤️`;
      else reply = `It's very hot at ${w.temp}°! Wear minimal, light-colored clothing and stay hydrated! 🌞`;

      if (isRainy(w.main)) reply += ` Also, since it's raining, carry an umbrella! ☔`;
      return reply;
    }

    // Hot / Cold / Temperature / Today Weather
    if (ql.includes('hot') || ql.includes('warm') || ql.includes('cold') || ql.includes('cool') || ql.includes('temp') || ql.includes('degree') || ql.includes('today') || ql.includes('weather')) {
      let reply = `Currently in ${w.city}: ${w.desc}, ${w.temp}° (feels like ${w.feels}°). Humidity: ${w.hum}%, Wind: ${w.wind} km/h. 🌡️`;
      if (isRainy(w.main)) reply += ` Since it's raining, you should carry an umbrella! ☔`;
      return reply;
    }

    // Wind / Storm
    if (ql.includes('wind') || ql.includes('breeze') || ql.includes('storm')) {
      if (w.wind > 30) return `It's very windy in ${w.city} at ${w.wind} km/h! Be careful if you're going outside. 🌪️`;
      if (w.wind > 15) return `There's a moderate breeze of ${w.wind} km/h in ${w.city}. Quite refreshing! 🍃`;
      return `The wind is calm at ${w.wind} km/h in ${w.city}. 🍃`;
    }

    // Humidity / Sweat
    if (ql.includes('humid') || ql.includes('moisture') || ql.includes('sweat')) {
      if (w.hum > 80) return `It's very humid at ${w.hum}% in ${w.city}. You might sweat a lot outside! 💧`;
      if (w.hum > 50) return `The humidity is ${w.hum}%, which is fairly comfortable. 😌`;
      return `Humidity is low at ${w.hum}%. The air feels quite dry. 🏜️`;
    }

    // Sunrise / Morning
    if (ql.includes('sunrise') || ql.includes('morning') || ql.includes('dawn')) {
      return `Sunrise in ${w.city} is at ${w.rise}. 🌅`;
    }

    // Sunset / Evening
    if (ql.includes('sunset') || ql.includes('evening') || ql.includes('dusk')) {
      return `Sunset in ${w.city} is at ${w.set}. 🌇`;
    }

    // Visibility / Fog
    if (ql.includes('visibility') || ql.includes('see') || ql.includes('fog') || ql.includes('mist')) {
      if (w.vis < 5) return `Visibility is very low at ${w.vis} km in ${w.city}. Drive carefully! 🌫️`;
      return `Visibility is ${w.vis} km, which is good. 👁️`;
    }

    // Smart Fallback
    return `I can tell you about the weather in ${w.city} or any other city! Try asking:
    - "What is the temperature in London?"
    - "Is it raining in Dhaka?"
    - "What should I wear?"
    (Or just type a city name like "Tokyo")`;
  };

  const ask = () => {
    if (!input.trim()) return;
    if (!user) {
      if (aiQ >= 2) { setMsgs(m => [...m, { type: 'bot', text: 'No free questions left. Sign in for unlimited!' }]); return; }
      setAiQ(aiQ + 1);
    }
    const q = input.trim(); setInput('');
    setMsgs(m => [...m, { type: 'user', text: q }]);
    
    setTimeout(async () => {
      const reply = await respond(q);
      setMsgs(m => [...m, { type: 'bot', text: reply }]);
    }, 500);
  };

  const limit = user ? null : 2 - aiQ;

  return (
    <div className="content-wrap" style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 600 }}>
        <h2 className="sec-title"><FiCpu size={15} /> AI Weather Assistant</h2>
        <div className="glass ai-wrap" style={{ margin: '0 auto' }}>
          <div className="ai-msgs">{msgs.map((m, i) => <div key={i} className={`ai-msg ${m.type}`}>{m.text}</div>)}</div>
          <div className="ai-row">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && ask()} placeholder="Ask about the weather..." />
            <button onClick={ask}>Ask</button>
          </div>
          {user ? <p className="ai-limit" style={{ color: 'var(--accent)' }}>Unlimited — signed in</p> : <p className="ai-limit">{limit > 0 ? `${limit} free question${limit > 1 ? 's' : ''} left. Sign in for unlimited.` : 'No free questions left. Please sign in.'}</p>}
        </div>
      </div>
    </div>
  );
}

function ShareModal({ open, onClose, city, temp, desc }) {
  const { unit } = useContext(ThemeContext);
  const cvt = (c) => unit === 'f' ? Math.round(c * 9 / 5 + 32) + '°F' : c + '°C';
  const txt = `Weather in ${city}: ${cvt(temp)}, ${desc}. — Skyviorment`;
  if (!open) return null;

  const copy = () => {
    const ta = document.getElementById('shareTa');
    if (!ta) return;
    navigator.clipboard.writeText(ta.value).then(onClose).catch(() => { ta.select(); document.execCommand('copy'); onClose(); });
  };

  return (
    <div className="modal-ov open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <h2 className="modal-title">Share Weather</h2>
        <p className="modal-sub">Share weather for {city}</p>
        <textarea id="shareTa" className="share-ta" defaultValue={txt} />
        <button className="btn-p" onClick={copy}><FiCopy size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Copy to Clipboard</button>
        <button className="btn-s" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function Toast({ toasts }) {
  return (
    <div className="toast-box">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.icon ? <span className="toast-icon">{t.icon}</span> : <FiInfo size={14} />}
          <div className="toast-text">
            {t.title && <div className="toast-title">{t.title}</div>}
            <div className="toast-msg">{t.msg}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AppInner() {
  const { setUser, logout } = useContext(AuthContext);
  const { weather, loading, load } = useWeather();

  const [page, setPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareData, setShareData] = useState({ city: '', temp: 0, desc: '' });
  const [toasts, setToasts] = useState([]);

  const lastCityRef = useRef('Dhaka'); 

  const toast = (type, msg, title, icon) => {
    const id = Date.now();
    setToasts(t => [...t, { id, type, msg, title, icon }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  };

  const handleSearch = useCallback((city) => {
    const trimmed = city.trim();

    if (!trimmed) {
      toast('warn', 'Please type a city name to search.', 'Empty Search', '⚠️');
      return;
    }

    lastCityRef.current = trimmed;
    load(trimmed).then(result => {
      if (result.data) {
        toast('ok', `Weather loaded for ${result.data.city}`, undefined, '✅');
      } else {
        const suggestion = result.suggestion;
        const suggestionText = suggestion
          ? ` Did you mean "${suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}"?`
          : '';
        toast(
          'err',
          `City not found: "${trimmed}".${suggestionText} Try another name.`,
          'Something went wrong',
          '❌'
        );
      }
    }).catch(() => {
      toast('err', 'Network error. Check your connection.', 'Something went wrong', '❌');
    });
  }, [load]);

  const saveLocation = () => {
    if (!weather) return toast('warn', 'No weather data to save.', undefined, '⚠️');
    let user = null;
    try { user = JSON.parse(localStorage.getItem('skyv_user')); } catch {}
    if (!user) { setLoginOpen(true); return; }
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem('skyv_saved') || '[]'); } catch {}
    if (saved.find(s => s.city.toLowerCase() === weather.city.toLowerCase())) { toast('inf', 'Already saved', undefined, 'ℹ️'); return; }
    saved.push({ city: weather.city, temp: weather.temp, desc: weather.desc, main: weather.main });
    try { localStorage.setItem('skyv_saved', JSON.stringify(saved)); } catch {}
    toast('ok', `${weather.city} saved!`, undefined, '✅');
  };

  const profileClick = () => {
    let user = null;
    try { user = JSON.parse(localStorage.getItem('skyv_user')); } catch {}
    if (user) { logout(); toast('inf', 'Signed out', undefined, '👋'); }
    else setLoginOpen(true);
  };

  useEffect(() => {
    load('Dhaka'); 
  }, []); // eslint-disable-line

  return (
    <WeatherCtx.Provider value={{ weather }}>
      <Navbar onSearch={handleSearch} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onProfileClick={profileClick} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onNav={setPage} onProfileClick={profileClick} currentPage={page} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={(u) => { setUser(u); toast('ok', `Welcome, ${u.name}!`, undefined, '👋'); }} />
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} {...shareData} />
      <Toast toasts={toasts} />

      <main style={{ marginTop: 60 }}>
        <div className={`page${page === 'home' ? ' on' : ''}`}><Home weather={weather} loading={loading} onSave={saveLocation} /></div>
        <div className={`page${page === 'map' ? ' on' : ''}`}><Map weather={weather} /></div>
        <div className={`page${page === 'country' ? ' on' : ''}`}>
          <div className="content-wrap">
            <h2 className="sec-title"><FiGlobe size={15} /> Country Details</h2>
            {weather ? <CountryDetails weather={weather} /> : <div className="glass"><div className="empty"><p>Search for a city first</p></div></div>}
          </div>
        </div>
        
        
        <div className={`page${page === 'ai' ? ' on' : ''}`}><AIAssistant loadWeather={load} /></div>
        
        <div className={`page${page === 'saved' ? ' on' : ''}`}>
          <div className="content-wrap">
            <h2 className="sec-title"><FiBookmark size={15} /> Saved Locations</h2>
            <SavedLocations
              onLoadCity={(c) => { handleSearch(c); setPage('home'); }}
              onShare={(city, temp, desc) => { setShareData({ city, temp, desc }); setShareOpen(true); }}
            />
          </div>
        </div>
        <div className={`page${page === 'settings' ? ' on' : ''}`}><Settings /></div>
      </main>

      <Footer />
    </WeatherCtx.Provider>
  );
}

export default function App() {
  return <ThemeProvider><AuthProvider><AppInner /></AuthProvider></ThemeProvider>;
}