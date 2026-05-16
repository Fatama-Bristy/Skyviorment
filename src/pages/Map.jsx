import { FiMap } from '../icons';

export default function Map({ weather }) {

  const lat = weather?.lat || 23.81;
  const lon = weather?.lon || 90.41;
  const city = weather?.city || 'Dhaka';
  const country = weather?.cc || 'BD';
  
  
  const largeCountries = ['RU', 'US', 'CA', 'CN', 'AU', 'BR', 'IN'];
  const zoom = largeCountries.includes(country) ? 4 : 8;

 
  let overlay = 'clouds'; 
  if (weather) {
    const main = weather.main;
    if (['rain', 'drizzle', 'thunderstorm'].includes(main)) overlay = 'rain';
    else if (main === 'snow') overlay = 'snow';
    else if (main === 'clouds') overlay = 'clouds';
    else overlay = 'temp'; 
  }

  
  const src = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=${zoom}&level=surface&overlay=${overlay}&menu=&message=false&marker=true&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=${lat}&detailLon=${lon}&metricWind=default&metricTemp=default&radarRange=-1`;

  return (
    <div className="content-wrap">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <h2 className="sec-title" style={{ marginBottom: 0 }}><FiMap size={15} /> Weather Map</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: 'var(--skyblue)', fontWeight: 600 }}>
          📍 {city}, {country}
        </div>
      </div>
      
      <div className="glass" style={{ padding: 0, overflow: 'hidden', borderRadius: 16 }}>
        <iframe 
          src={src} 
          style={{ width: '100%', height: 500, border: 'none' }} 
          loading="lazy" 
          title="Weather Map" 
        />
      </div>
    </div>
  );
}