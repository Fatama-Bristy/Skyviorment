import { useEffect } from 'react';
import { FiGlobe, FiLandmark, FiUsers, FiDollarSign, FiMessageCircle } from '../icons';
import { useCountry } from '../hooks/useCountry';

export default function CountryDetails({ weather }) {
  const { country, load } = useCountry();

  useEffect(() => {
    if (weather?.cc) load(weather.cc);
  }, [weather?.cc]);

  if (!country) return null;

  return (
    <div className="glass country-wrap" style={{animation:'fadeIn .5s'}}>
      <img src={country.flag} alt={country.name} className="country-flag"
        onError={e => { e.target.src = 'https://flagcdn.com/w320/xx.png'; }} />
      <div className="country-info">
        <h3 className="country-name">{country.name}</h3>
        <div className="country-row"><FiLandmark size={15} /><span className="lbl">Capital</span><span className="val">{country.cap}</span></div>
        <div className="country-row"><FiUsers size={15} /><span className="lbl">Population</span><span className="val">{country.pop}</span></div>
        <div className="country-row"><FiDollarSign size={15} /><span className="lbl">Currency</span><span className="val">{country.cur}</span></div>
        <div className="country-row"><FiMessageCircle size={15} /><span className="lbl">Language</span><span className="val">{country.lang}</span></div>
      </div>
    </div>
  );
}