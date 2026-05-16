import { useContext } from 'react';
import { FiBarChart2, FiWind, FiDroplet, FiActivity, FiThermometer, FiEye, FiCloudRain } from '../icons';
import { ThemeContext } from '../context/ThemeContext';

export default function WeatherDetails({ weather }) {
  const { unit } = useContext(ThemeContext);
  const cvt = (c) => unit === 'f' ? Math.round(c*9/5+32)+'°F' : c+'°C';
  if (!weather) return null;

  const items = [
    { icon:FiWind, label:'Wind Speed', val:weather.wind+' km/h', sub:'Speed varies', pct:Math.min(weather.wind/50*100,100) },
    { icon:FiDroplet, label:'Humidity', val:weather.hum+'%', sub:weather.hum>70?'High humidity':'Comfortable', pct:weather.hum },
    { icon:FiActivity, label:'Pressure', val:weather.pres+' hPa', sub:weather.pres>1013?'Above normal':'Below normal', pct:Math.min((weather.pres-950)/100*100,100) },
    { icon:FiThermometer, label:'Feels Like', val:cvt(weather.feels), sub:weather.feels>weather.temp?'Feels warmer':'Feels cooler', pct:Math.min(Math.abs(weather.feels)/50*100,100) },
    { icon:FiEye, label:'Visibility', val:weather.vis+' km', sub:weather.vis>10?'Excellent':'Reduced', pct:Math.min(weather.vis/20*100,100) },
    { icon:FiCloudRain, label:'Precipitation', val:Math.round(Math.random()*55)+'%', sub:'Chance of rain', pct:Math.round(Math.random()*55) },
  ];

  return (
    <section style={{marginBottom:24,animation:'fadeIn .6s .3s both'}}>
      <h2 className="sec-title"><FiBarChart2 size={15} /> Weather Details</h2>
      <div className="det-grid">
        {items.map((d,i) => {
          const Icon = d.icon;
          return (
            <div key={i} className="det-card" style={{animation:`fadeIn .4s ${i*.05}s both`}}>
              <div className="det-head"><Icon size={14} /><span>{d.label}</span></div>
              <div className="det-val">{d.val}</div>
              <div className="det-sub">{d.sub}</div>
              <div className="det-bar"><div className="det-bar-fill" style={{width:d.pct+'%'}} /></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}