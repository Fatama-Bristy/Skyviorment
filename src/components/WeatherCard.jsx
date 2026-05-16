import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const EMOJI = { clear:'☀️', clouds:'☁️', rain:'🌧️', drizzle:'🌦️', thunderstorm:'⛈️', snow:'❄️', mist:'🌫️', fog:'🌫️', haze:'🌫️' };

export default function WeatherCard({ city, temp, desc, main, onClick }) {
  const { unit } = useContext(ThemeContext);
  const cvts = (c) => unit === 'f' ? Math.round(c*9/5+32)+'°' : c+'°';

  return (
    <div className="saved-card" onClick={onClick} style={{cursor:'pointer'}}>
      <div className="saved-top">
        <div><div className="saved-city">{city}</div><div className="saved-desc">{desc}</div></div>
        <div className="saved-temp">{cvts(temp)}</div>
      </div>
      <div style={{fontSize:'1.8rem',marginTop:8}}>{EMOJI[main] || '☁️'}</div>
    </div>
  );
}