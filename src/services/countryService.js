const COUNTRIES = {
  US: { name:'United States', flag:'https://flagcdn.com/w320/us.png', cap:'Washington D.C.', pop:'331,900,000', cur:'USD (Dollar)', lang:'English' },
  GB: { name:'United Kingdom', flag:'https://flagcdn.com/w320/gb.png', cap:'London', pop:'67,800,000', cur:'GBP (Pound)', lang:'English' },
  JP: { name:'Japan', flag:'https://flagcdn.com/w320/jp.png', cap:'Tokyo', pop:'125,700,000', cur:'JPY (Yen)', lang:'Japanese' },
  FR: { name:'France', flag:'https://flagcdn.com/w320/fr.png', cap:'Paris', pop:'67,400,000', cur:'EUR (Euro)', lang:'French' },
  BD: { name:'Bangladesh', flag:'https://flagcdn.com/w320/bd.png', cap:'Dhaka', pop:'169,400,000', cur:'BDT (Taka)', lang:'Bengali' },
  IT: { name:'Italy', flag:'https://flagcdn.com/w320/it.png', cap:'Rome', pop:'60,300,000', cur:'EUR (Euro)', lang:'Italian' },
  AU: { name:'Australia', flag:'https://flagcdn.com/w320/au.png', cap:'Canberra', pop:'25,700,000', cur:'AUD (Dollar)', lang:'English' },
  AE: { name:'UAE', flag:'https://flagcdn.com/w320/ae.png', cap:'Abu Dhabi', pop:'9,900,000', cur:'AED (Dirham)', lang:'Arabic' },
  RU: { name:'Russia', flag:'https://flagcdn.com/w320/ru.png', cap:'Moscow', pop:'144,100,000', cur:'RUB (Ruble)', lang:'Russian' },
};

export async function fetchCountry(code) {
  try {
    const r = await fetch(`https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,capital,population,currencies,languages`);
    if (!r.ok) throw new Error();
    const d = await r.json();
    return {
      name: d.name?.common || code,
      flag: d.flags?.svg || d.flags?.png || `https://flagcdn.com/w320/${code.toLowerCase()}.png`,
      cap: Array.isArray(d.capital) ? d.capital[0] : (d.capital || 'N/A'),
      pop: d.population ? d.population.toLocaleString() : 'N/A',
      cur: d.currencies ? Object.values(d.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A',
      lang: d.languages ? Object.values(d.languages).join(', ') : 'N/A',
    };
  } catch {
    return COUNTRIES[code] || { name: code, flag: `https://flagcdn.com/w320/${code.toLowerCase()}.png`, cap:'N/A', pop:'N/A', cur:'N/A', lang:'N/A' };
  }
}