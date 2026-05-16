import { FiSunrise, FiSunset } from '../icons';
import HeroSection from '../components/HeroSection';
import HourlyForecast from '../components/HourlyForecast';
import FiveDayForecast from '../components/FiveDayForecast';
import WeatherDetails from '../components/WeatherDetails';
import TemperatureGraph from '../components/TemperatureGraph';

function SunriseSunset({ weather }) {
  if (!weather) return null;
  const toMin = s => { const [h,m] = s.split(':').map(Number); return h*60+m; };
  const now = new Date();
  const nowMin = now.getHours()*60 + now.getMinutes();
  const riseMin = toMin(weather.rise);
  const setMin = toMin(weather.set);
  const dayLen = Math.max(1, setMin - riseMin);
  const pct = Math.max(0, Math.min(1, (nowMin - riseMin) / dayLen));
  const angle = Math.PI * pct;
  const dotX = 90 * Math.cos(Math.PI - angle);
  const dotY = 90 * Math.sin(Math.PI - angle);

  return (
    <section style={{marginBottom:24,animation:'fadeIn .6s .4s both'}}>
      <h2 className="sec-title"><FiSunrise size={15} /> Sunrise & Sunset</h2>
      <div className="glass sun-wrap">
        <div className="sun-item"><FiSunrise size={22} style={{color:'var(--warm)'}} /><span className="sun-time">{weather.rise}</span><span className="sun-label">Sunrise</span></div>
        <div className="sun-arc">
          <div className="sun-arc-bg" />
          <div className="sun-arc-fill" style={{clipPath:`inset(0 ${100-pct*100}% 50% 0)`}} />
          <div className="sun-dot" style={{left:(90-dotX)+'px',top:(90-dotY)+'px'}} />
        </div>
        <div className="sun-item"><FiSunset size={22} style={{color:'var(--warm)'}} /><span className="sun-time">{weather.set}</span><span className="sun-label">Sunset</span></div>
      </div>
    </section>
  );
}

export default function Home({ weather, loading, onSave }) {
  return (
    <>
      <HeroSection weather={weather} onSave={onSave} />
      <div className="content-wrap">
        {loading ? (
          <div className="spinner"><div className="spin" /></div>
        ) : weather ? (
          <>
            <HourlyForecast data={weather.hourly} />
            <FiveDayForecast data={weather.daily} />
            <WeatherDetails weather={weather} />
            <SunriseSunset weather={weather} />
            <TemperatureGraph data={weather.hourly} />
          </>
        ) : (
          <div className="empty"><p>Search for a city to get started</p></div>
        )}
      </div>
    </>
  );
}