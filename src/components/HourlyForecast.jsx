import { useContext } from 'react';
import { FiClock } from '../icons';
import { ThemeContext } from '../context/ThemeContext';

const EMOJI = { clear:'☀️', clouds:'☁️', rain:'🌧️', drizzle:'🌦️', thunderstorm:'⛈️', snow:'❄️', mist:'🌫️', fog:'🌫️', haze:'🌫️' };

export default function HourlyForecast({ data }) {
  const { unit } = useContext(ThemeContext);
  const cvts = (c) => unit === 'f' ? Math.round(c*9/5+32)+'°' : c+'°';
  if (!data?.length) return null;

  return (
    <section style={{marginBottom:24,animation:'fadeIn .6s .1s both'}}>
      <h2 className="sec-title"><FiClock size={15} /> Hourly Forecast</h2>
      <div className="hourly-scroll">
        {data.map((h,i) => (
          <div key={i} className={`h-item${h.now?' now':''}`}>
            <span className="h-time">{h.now?'Now':h.time}</span>
            <span className="h-icon">{EMOJI[h.main]||'☁️'}</span>
            <span className="h-temp">{cvts(h.temp)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}