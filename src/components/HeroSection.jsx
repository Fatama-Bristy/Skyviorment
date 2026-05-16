import { useContext, useEffect, useRef } from 'react';
import { FiBookmark, FiAlertTriangle, FiArrowUp, FiArrowDown, FiDroplet, FiWind, FiEye, FiActivity } from '../icons';
import { ThemeContext } from '../context/ThemeContext';

function getTimePeriod(rise, set, tz) {
  try {
    const now = new Date();
    const totalUtcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
    const localMinutes = totalUtcMinutes + (tz * 60);
    const nowMin = ((localMinutes % 1440) + 1440) % 1440; 

    const [rh, rm] = rise.split(':').map(Number);
    const [sh, sm] = set.split(':').map(Number);
    const riseMin = rh * 60 + rm;
    const setMin = sh * 60 + sm;

    if (nowMin >= riseMin - 30 && nowMin < riseMin + 60) return 'dawn';
    if (nowMin >= riseMin + 60 && nowMin < setMin - 60) return 'day';
    if (nowMin >= setMin - 60 && nowMin < setMin + 60) return 'evening';
    return 'night';
  } catch {
    const now = new Date();
    const totalUtcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
    const localMinutes = totalUtcMinutes + (tz * 60);
    const h = Math.floor(((localMinutes % 1440) + 1440) % 1440 / 60);
    if (h >= 5 && h < 7) return 'dawn';
    if (h >= 7 && h < 17) return 'day';
    if (h >= 17 && h < 19) return 'evening';
    return 'night';
  }
}

// ✨ New Function: Time-based Label instead of Emoji
function getTimeLabel(period, tz) {
  if (period === 'dawn') return 'Morning';
  if (period === 'evening') return 'Evening';
  if (period === 'night') return 'Night';
  
  // If period is 'day', check the local hour to split Morning/Afternoon
  const now = new Date();
  const totalUtcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const localMinutes = totalUtcMinutes + (tz * 60);
  const hour = Math.floor(((localMinutes % 1440) + 1440) % 1440 / 60);
  
  if (hour < 12) return 'Morning';
  return 'Afternoon';
}

function getWeatherTip(w) {
  if (!w) return '';
  const tips = { thunderstorm: 'Thunderstorms expected. Stay indoors!', rain: 'Rain expected. Keep an umbrella handy!', drizzle: 'Light drizzle throughout the day.', snow: 'Snowfall expected. Drive carefully!', clear: 'Clear skies. Enjoy the beautiful day!', clouds: 'Cloudy skies. Might clear up later.', haze: 'Low visibility due to haze.', mist: 'Misty conditions. Drive carefully!', fog: 'Dense fog. Low visibility.' };
  return tips[w.main] || '';
}

export default function HeroSection({ weather, onSave }) {
  const { unit } = useContext(ThemeContext);
  const rainRef = useRef(null);
  const snowRef = useRef(null);
  const starsRef = useRef(null);
  const cloudsRef = useRef(null);

  const cvts = c => unit === 'f' ? Math.round(c * 9 / 5 + 32) + '°' : c + '°';

  const period = weather ? getTimePeriod(weather.rise, weather.set, weather.tz || 0) : 'day';
  const main = weather?.main || 'clouds';
  const night = period === 'night';

  const showRain = ['rain', 'drizzle', 'thunderstorm'].includes(main);
  const showLightning = main === 'thunderstorm';
  const showFog = ['fog', 'mist', 'haze'].includes(main);
  const showSnow = main === 'snow';
  const showSun = period === 'day' && main === 'clear';
  const showStars = period === 'night';

  let skyClass = 'sky-day';
  if (period === 'dawn') skyClass = 'sky-dawn';
  else if (period === 'evening') skyClass = 'sky-evening';
  else if (period === 'night') skyClass = 'sky-night';

  useEffect(() => {
    const el = rainRef.current; if (!el) return; el.innerHTML = '';
    if (!weather || !showRain) return;
    const n = main === 'thunderstorm' ? 120 : 70;
    for (let i = 0; i < n; i++) {
      const d = document.createElement('div'); d.className = 'rdrop';
      d.style.cssText = `left:${Math.random() * 100}%;height:${18 + Math.random() * 24}px;animation-duration:${0.3 + Math.random() * 0.5}s;animation-delay:${Math.random() * 2}s;opacity:${0.3 + Math.random() * 0.5}`;
      el.appendChild(d);
    }
  }, [weather?.main, period]);

  useEffect(() => {
    const el = snowRef.current; if (!el) return; el.innerHTML = '';
    if (!showSnow) return;
    for (let i = 0; i < 60; i++) {
      const s = document.createElement('div'); s.className = 'snowflake'; const sz = 3 + Math.random() * 5;
      s.style.cssText = `left:${Math.random() * 100}%;width:${sz}px;height:${sz}px;animation-duration:${3 + Math.random() * 5}s;animation-delay:${Math.random() * 5}s;opacity:${0.4 + Math.random() * 0.5}`;
      el.appendChild(s);
    }
  }, [weather?.main]);

  useEffect(() => {
    const el = starsRef.current; if (!el) return; el.innerHTML = '';
    if (!showStars) return;
    const count = main === 'clouds' || showRain ? 30 : 120;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div'); s.className = 'star'; const sz = 1 + Math.random() * 3;
      s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 75}%;width:${sz}px;height:${sz}px;animation-duration:${2 + Math.random() * 4}s;animation-delay:${Math.random() * 4}s`;
      el.appendChild(s);
    }
  }, [showStars, weather?.main]);
  useEffect(() => {
    const el = cloudsRef.current; if (!el) return; el.innerHTML = '';
    
    
    const mainLower = main.toLowerCase();
    
    let totalClouds = 0;
    if (['rain', 'drizzle', 'thunderstorm'].includes(mainLower)) totalClouds = 10;
    else if (mainLower === 'clouds') totalClouds = 8;
    else if (mainLower === 'snow') totalClouds = 6;
    else if (['mist', 'fog', 'haze'].includes(mainLower)) totalClouds = 4; // ✅ ঢাকার জন্য Haze/Mist যোগ করা হলো
    else if (mainLower === 'clear' && !night) totalClouds = 3; 
    else return;

    // ✨ 3D Parallax Layers (Far = Slow/Small, Near = Fast/Large) ✨
    const layers = [
      { count: Math.ceil(totalClouds * 0.3), minSize: 40, maxSize: 80, minSpeed: 70, maxSpeed: 110, topMin: 5, topMax: 35, opacity: night ? 0.15 : 0.35, z: 2 },
      { count: Math.ceil(totalClouds * 0.4), minSize: 90, maxSize: 160, minSpeed: 40, maxSpeed: 60, topMin: 10, topMax: 50, opacity: night ? 0.35 : 0.65, z: 3 },
      { count: Math.ceil(totalClouds * 0.3), minSize: 160, maxSize: 260, minSpeed: 20, maxSpeed: 35, topMin: 25, topMax: 65, opacity: night ? 0.6 : 0.9, z: 4 }
    ];

    layers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'sky-cloud';
        
        // Dark and Night class additions
        if (['rain', 'drizzle', 'thunderstorm'].includes(mainLower)) cloud.classList.add('dark-cloud');
        if (night) cloud.classList.add('night-cloud');

        const size = layer.minSize + Math.random() * (layer.maxSize - layer.minSize);
        const top = layer.topMin + Math.random() * (layer.topMax - layer.topMin);
        const duration = layer.minSpeed + Math.random() * (layer.maxSpeed - layer.minSpeed);
        const delay = -(Math.random() * duration);

        // ✨ Realistic Lighting Gradients ✨
        let gradientBg = '';
        if (night) {
          gradientBg = 'linear-gradient(180deg, rgba(80,100,140,0.8), rgba(40,55,80,0.9))';
        } else if (['rain', 'drizzle', 'thunderstorm'].includes(mainLower)) {
          gradientBg = 'linear-gradient(180deg, rgba(160,175,195,0.95), rgba(110,120,140,0.98))';
        } else if (mainLower === 'snow') {
          gradientBg = 'linear-gradient(180deg, rgba(240,248,255,0.95), rgba(210,225,240,0.98))';
        } else if (['mist', 'fog', 'haze'].includes(mainLower)) {
          
          gradientBg = 'linear-gradient(180deg, rgba(220,225,235,0.8), rgba(190,200,215,0.85))';
        } else {
          gradientBg = 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(235,245,255,0.98))';
        }

        cloud.style.cssText = `
          width:${size}px;
          height:${size * 0.4}px;
          top:${top}%;
          animation-duration:${duration}s;
          animation-delay:${delay}s;
          background:${gradientBg};
          opacity:${layer.opacity};
          z-index:${layer.z};
        `;
        el.appendChild(cloud);
      }
    });
  }, [weather?.main, period]);

  if (!weather) {
    return (
      <section className="hero">
        <div className={`sky-base ${skyClass}`} />
        <div className="hero-overlay" />
        <div className="hero-content"><p style={{ opacity: 0.7, fontSize: '1rem', color: '#fff' }}>Search for a city to see weather</p></div>
      </section>
    );
  }

  const hasWarn = showRain || showLightning;
  const tip = getWeatherTip(weather);

  return (
    <section className="hero">
      <div className={`sky-base ${skyClass}`} />
      {showSun && <div className="sky-sun" />}
      {showStars && <div className="sky-stars-container" ref={starsRef} />}
      <div className="sky-clouds-container" ref={cloudsRef} />
      <div className="sky-rain-container" ref={rainRef} />
      <div className="sky-snow-container" ref={snowRef} />
      {showLightning && <div className="sky-lightning" />}
      {showFog && <div className="sky-fog-overlay" />}
      <div className="hero-overlay" />
      
      <div className="hero-content">
       
        <div className="hero-time-badge">
          {getTimeLabel(period, weather.tz || 0)}
        </div>
        
        <h1 className="hero-city">{weather.city}</h1>
        <div className="hero-temp">{cvts(weather.temp)}</div>
        <p className="hero-cond">{weather.desc}</p>
        <div className="hero-range">
          <span><FiArrowUp size={12} style={{ color: '#FF8C42' }} /> H:{cvts(weather.hi)}</span>
          <span><FiArrowDown size={12} style={{ color: '#4ECDC4' }} /> L:{cvts(weather.lo)}</span>
        </div>
        <div className="hero-meta">
          <div className="hero-meta-item"><FiDroplet size={13} /> {weather.hum}%</div>
          <div className="hero-meta-item"><FiWind size={13} /> {weather.wind} km/h</div>
          <div className="hero-meta-item"><FiEye size={13} /> {weather.vis} km</div>
          <div className="hero-meta-item"><FiActivity size={13} /> {weather.pres} hPa</div>
        </div>
        {tip && <p className="hero-tip">{tip}</p>}
        {hasWarn && (<div className="hero-warn"><FiAlertTriangle size={12} /><span>{main === 'thunderstorm' ? 'Thunderstorm Warning' : 'Yellow Warning for Rain'}</span></div>)}
        <button className="hero-save-btn" onClick={onSave}><FiBookmark size={12} /> Save</button>
      </div>
    </section>
  );
}