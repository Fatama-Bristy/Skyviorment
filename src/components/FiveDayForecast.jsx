import { useContext } from 'react';
import { FiCalendar } from '../icons';
import { ThemeContext } from '../context/ThemeContext';

const EMOJI = { clear:'☀️', clouds:'☁️', rain:'🌧️', drizzle:'🌦️', thunderstorm:'⛈️', snow:'❄️', mist:'🌫️', fog:'🌫️', haze:'🌫️' };

export default function FiveDayForecast({ data }) {
  const { unit } = useContext(ThemeContext);
  const cvts = (c) => unit === 'f' ? Math.round(c*9/5+32)+'°' : c+'°';
  if (!data?.length) return null;

  return (
    <section style={{marginBottom:24,animation:'fadeIn .6s .2s both'}}>
      <h2 className="sec-title"><FiCalendar size={15} /> 5-Day Forecast</h2>
      <div className="fd-grid">
        {data.map((d,i) => (
          <div key={i} className={`fd-card${i===0?' today':''}`} style={{animation:`fadeIn .4s ${i*.07}s both`}}>
            <div className="fd-day">{d.day}</div>
            <div className="fd-icon">{EMOJI[d.main]||'☁️'}</div>
            <div className="fd-hi">{cvts(d.hi)}</div>
            <div className="fd-lo">{cvts(d.lo)}</div>
            <div className="fd-desc">{d.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}