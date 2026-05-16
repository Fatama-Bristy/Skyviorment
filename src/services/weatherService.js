
const HARDCODED_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; 

const CITIES = {
  // Bangladesh (UTC+6)
  'dhaka':       { temp:32, feels:38, lo:27, hi:35, hum:88, pres:1005, wind:10, vis:6,  desc:'Haze and humidity', main:'haze', rise:'05:18', set:'18:42', cc:'BD', tz:6, lat:23.81, lon:90.41 },
  'chittagong':  { temp:31, feels:36, lo:26, hi:33, hum:85, pres:1006, wind:14, vis:8,  desc:'Partly cloudy', main:'clouds', rise:'05:22', set:'18:38', cc:'BD', tz:6, lat:22.36, lon:91.80 },
  'chattogram':  { temp:31, feels:36, lo:26, hi:33, hum:85, pres:1006, wind:14, vis:8,  desc:'Partly cloudy', main:'clouds', rise:'05:22', set:'18:38', cc:'BD', tz:6, lat:22.36, lon:91.80 },
  'khulna':      { temp:33, feels:39, lo:28, hi:36, hum:82, pres:1004, wind:12, vis:7,  desc:'Warm and humid', main:'haze', rise:'05:20', set:'18:40', cc:'BD', tz:6, lat:22.84, lon:89.54 },
  'rajshahi':    { temp:35, feels:40, lo:29, hi:38, hum:70, pres:1006, wind:10, vis:8,  desc:'Hot and clear', main:'clear', rise:'05:24', set:'18:44', cc:'BD', tz:6, lat:24.37, lon:88.60 },
  'sylhet':      { temp:30, feels:35, lo:25, hi:32, hum:90, pres:1003, wind:8,  vis:6,  desc:'Light rain', main:'rain', rise:'05:16', set:'18:36', cc:'BD', tz:6, lat:24.89, lon:91.87 },
  'rangpur':     { temp:32, feels:37, lo:27, hi:34, hum:80, pres:1005, wind:9,  vis:9,  desc:'Partly cloudy', main:'clouds', rise:'05:26', set:'18:46', cc:'BD', tz:6, lat:25.74, lon:89.25 },
  'barisal':     { temp:31, feels:36, lo:26, hi:33, hum:85, pres:1004, wind:11, vis:7,  desc:'Mostly cloudy', main:'clouds', rise:'05:19', set:'18:39', cc:'BD', tz:6, lat:22.70, lon:90.37 },
  'mymensingh':  { temp:32, feels:38, lo:27, hi:35, hum:86, pres:1005, wind:8,  vis:7,  desc:'Haze', main:'haze', rise:'05:20', set:'18:41', cc:'BD', tz:6, lat:24.75, lon:90.41 },
  'comilla':     { temp:30, feels:34, lo:25, hi:33, hum:68, pres:1001, wind:14, vis:10, desc:'Mostly Cloudy', main:'clouds', rise:'05:13', set:'18:29', cc:'BD', tz:6, lat:23.46, lon:91.18 },
  "cox's bazar": { temp:30, feels:35, lo:26, hi:32, hum:88, pres:1008, wind:16, vis:9,  desc:'Breezy and humid', main:'clouds', rise:'05:25', set:'18:35', cc:'BD', tz:6, lat:21.43, lon:92.01 },
  
  // World
  'new york':    { temp:22, feels:20, lo:14, hi:29, hum:78, pres:1013, wind:12, vis:10, desc:'Partly cloudy', main:'clouds', rise:'06:12', set:'19:48', cc:'US', tz:-4, lat:40.71, lon:-74.01 },
  'london':      { temp:14, feels:11, lo:9,  hi:17, hum:85, pres:1008, wind:18, vis:7,  desc:'Overcast clouds', main:'clouds', rise:'05:45', set:'20:32', cc:'GB', tz:1, lat:51.51, lon:-0.13 },
  'tokyo':       { temp:24, feels:26, lo:18, hi:28, hum:65, pres:1015, wind:8,  vis:12, desc:'Clear sky', main:'clear', rise:'04:52', set:'18:55', cc:'JP', tz:9, lat:35.68, lon:139.69 },
  'paris':       { temp:18, feels:16, lo:12, hi:21, hum:72, pres:1010, wind:14, vis:9,  desc:'Light rain expected', main:'rain', rise:'06:05', set:'21:15', cc:'FR', tz:2, lat:48.86, lon:2.35 },
  'sydney':      { temp:19, feels:17, lo:14, hi:22, hum:60, pres:1020, wind:15, vis:14, desc:'Clear and pleasant', main:'clear', rise:'06:40', set:'17:15', cc:'AU', tz:10, lat:-33.87, lon:151.21 },
  'dubai':       { temp:38, feels:42, lo:32, hi:42, hum:45, pres:1008, wind:20, vis:8,  desc:'Hot and sunny', main:'clear', rise:'05:35', set:'19:05', cc:'AE', tz:4, lat:25.20, lon:55.27 },
  'moscow':      { temp:5,  feels:1,  lo:0,  hi:8,  hum:90, pres:1002, wind:22, vis:5,  desc:'Snow flurries', main:'snow', rise:'04:10', set:'20:50', cc:'RU', tz:3, lat:55.76, lon:37.62 },
  'berlin':      { temp:15, feels:13, lo:10, hi:19, hum:68, pres:1014, wind:16, vis:9,  desc:'Partly cloudy', main:'clouds', rise:'05:30', set:'21:00', cc:'DE', tz:2, lat:52.52, lon:13.41 },
  'rome':        { temp:23, feels:22, lo:17, hi:27, hum:55, pres:1016, wind:10, vis:12, desc:'Sunny', main:'clear', rise:'06:10', set:'20:20', cc:'IT', tz:2, lat:41.90, lon:12.50 },
  'istanbul':    { temp:20, feels:19, lo:15, hi:24, hum:62, pres:1011, wind:14, vis:10, desc:'Mostly cloudy', main:'clouds', rise:'06:15', set:'20:10', cc:'TR', tz:3, lat:41.01, lon:28.98 },
  'mumbai':      { temp:33, feels:39, lo:28, hi:36, hum:85, pres:1004, wind:12, vis:5,  desc:'Humid and hazy', main:'haze', rise:'06:05', set:'19:10', cc:'IN', tz:5.5, lat:19.08, lon:72.88 },
  'beijing':     { temp:26, feels:24, lo:20, hi:30, hum:50, pres:1012, wind:8,  vis:11, desc:'Clear', main:'clear', rise:'05:20', set:'19:40', cc:'CN', tz:8, lat:39.90, lon:116.40 },
  'seoul':       { temp:21, feels:20, lo:16, hi:25, hum:58, pres:1013, wind:9,  vis:10, desc:'Partly cloudy', main:'clouds', rise:'05:40', set:'19:30', cc:'KR', tz:9, lat:37.57, lon:126.98 },
  'bangkok':     { temp:34, feels:40, lo:28, hi:37, hum:80, pres:1007, wind:6,  vis:7,  desc:'Hot and humid', main:'haze', rise:'06:00', set:'18:45', cc:'TH', tz:7, lat:13.76, lon:100.50 },
  'cairo':       { temp:35, feels:33, lo:26, hi:39, hum:25, pres:1010, wind:18, vis:12, desc:'Sunny and dry', main:'clear', rise:'05:15', set:'18:55', cc:'EG', tz:2, lat:30.04, lon:31.24 },
  'toronto':     { temp:17, feels:15, lo:12, hi:21, hum:65, pres:1015, wind:14, vis:11, desc:'Partly cloudy', main:'clouds', rise:'06:20', set:'20:30', cc:'CA', tz:-4, lat:43.65, lon:-79.38 },
};

const COUNTRY_ALIASES = {
  'bangladesh': 'dhaka', 'bd': 'dhaka',
  'united states': 'new york', 'usa': 'new york', 'us': 'new york',
  'united kingdom': 'london', 'uk': 'london', 'britain': 'london',
  'japan': 'tokyo', 'jp': 'tokyo',
  'france': 'paris', 'italy': 'rome',
  'australia': 'sydney', 'uae': 'dubai', 'united arab emirates': 'dubai',
  'russia': 'moscow', 'germany': 'berlin',
  'turkey': 'istanbul', 'turkiye': 'istanbul',
  'india': 'mumbai', 'china': 'beijing',
  'south korea': 'seoul', 'korea': 'seoul',
  'thailand': 'bangkok', 'egypt': 'cairo', 'canada': 'toronto',
};

function makeHourly(currentTemp, main, lo, hi, tzOffsetHours) {
  const hours = []; 
  const now = new Date();
  
  // ✅ Bulletproof UTC Math to get exact local hour
  const totalUtcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const localMinutes = totalUtcMinutes + (tzOffsetHours * 60);
  const currentHour = Math.floor(((localMinutes % 1440) + 1440) % 1440 / 60);
  
  const conds = ['clear', 'clouds', 'rain', 'clouds', 'clear', 'clouds', 'drizzle'];
  for (let i = 0; i < 24; i++) {
    const hour = (currentHour + i) % 24; 
    let temp;
    if (i === 0) { temp = currentTemp; } else {
      const avg = (lo + hi) / 2; const amp = (hi - lo) / 2;
      temp = Math.round(avg + amp * Math.cos(2 * Math.PI * (hour - 14) / 24));
      if (Math.random() > 0.5) temp += Math.random() > 0.5 ? 1 : -1;
      temp = Math.max(lo, Math.min(hi, temp));
    }
    hours.push({
      time: hour.toString().padStart(2, '0') + ':00',
      temp,
      main: i < 3 ? main : conds[Math.floor(Math.random() * conds.length)],
      now: i === 0,
    });
  }
  return hours;
}

function makeDaily(currentTemp, main, lo, hi) {
  const days = []; const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const ms = [main, 'clouds', 'rain', 'clear', 'clouds'];
  const descs = { clear:'Sunny', rain:'Rainy', snow:'Snowy', clouds:'Cloudy', drizzle:'Drizzle', thunderstorm:'Stormy', haze:'Hazy', mist:'Misty', fog:'Foggy' };
  for (let i = 0; i < 5; i++) {
    const dt = new Date(); dt.setDate(dt.getDate() + i); const m = ms[i % ms.length];
    if (i === 0) { days.push({ day: 'Today', hi, lo, main: m, desc: descs[m] || 'Cloudy' }); } else {
      const dayHi = Math.round(hi + (Math.random() - 0.5) * 6); const dayLo = Math.round(lo + (Math.random() - 0.5) * 4);
      days.push({ day: dayNames[dt.getDay()], hi: Math.max(dayLo + 3, dayHi), lo: Math.min(dayHi - 3, dayLo), main: m, desc: descs[m] || 'Cloudy' });
    }
  }
  return days;
}

function getCityLocalTime(unixTimestamp, offsetSeconds) {
  const date = new Date((unixTimestamp + offsetSeconds) * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function transformApiData(d) {
  const m = d.weather[0].main.toLowerCase(); const temp = Math.round(d.main.temp);
  const lo = Math.round(d.main.temp_min); const hi = Math.round(d.main.temp_max);
  return {
    city: d.name, temp, feels: Math.round(d.main.feels_like), lo, hi,
    hum: d.main.humidity, pres: d.main.pressure, wind: Math.round(d.wind.speed * 3.6),
    vis: Math.round((d.visibility || 10000) / 1000), desc: d.weather[0].description, main: m,
    rise: getCityLocalTime(d.sys.sunrise, d.timezone), 
    set: getCityLocalTime(d.sys.sunset, d.timezone),  
    cc: d.sys.country, 
    tz: d.timezone / 3600,
    lat: d.coord.lat,
    lon: d.coord.lon, 
    hourly: makeHourly(temp, m, lo, hi, d.timezone / 3600), 
    daily: makeDaily(temp, m, lo, hi),
  };
}

async function getCapitalFromCountry(query) {
  try {
    const r = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(query)}?fields=capital`);
    if (r.ok) {
      const data = await r.json();
      if (data.length > 0 && data[0].capital && data[0].capital.length > 0) return data[0].capital[0];
    }
  } catch (e) {}
  return null;
}

export async function fetchWeather(city) {
  let trimmed = city.trim();
  if (!trimmed) return { data: null, suggestion: null };

  const lowerTrimmed = trimmed.toLowerCase();
  const resolvedCity = COUNTRY_ALIASES[lowerTrimmed] || trimmed;

  if (HARDCODED_API_KEY && HARDCODED_API_KEY !== 'YOUR_OPENWEATHERMAP_API_KEY') {
    try {
      let r = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(resolvedCity)}&appid=${HARDCODED_API_KEY}&units=metric`);
      if (r.ok) { const d = await r.json(); return { data: transformApiData(d), suggestion: null }; }

      if (r.status === 404) {
        const capitalCity = await getCapitalFromCountry(trimmed);
        if (capitalCity) {
          const r2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(capitalCity)}&appid=${HARDCODED_API_KEY}&units=metric`);
          if (r2.ok) { const d2 = await r2.json(); return { data: transformApiData(d2), suggestion: null }; }
        }
      }
      return { data: null, suggestion: null };
    } catch (e) { return { data: null, suggestion: null }; }
  }

  await new Promise(r => setTimeout(r, 150));
  let finalCity = resolvedCity;
  if (!CITIES[resolvedCity.toLowerCase()]) {
    const capital = await getCapitalFromCountry(trimmed);
    if (capital) finalCity = capital;
  }

  const key = finalCity.toLowerCase().trim();
  const m = CITIES[key];

  if (m) {
    return {
      data: {
        city: COUNTRY_ALIASES[lowerTrimmed] ? finalCity.charAt(0).toUpperCase() + finalCity.slice(1) : trimmed,
        temp: m.temp, feels: m.feels, lo: m.lo, hi: m.hi,
        hum: m.hum, pres: m.pres, wind: m.wind, vis: m.vis,
        desc: m.desc, main: m.main, rise: m.rise, set: m.set, cc: m.cc, tz: m.tz,
        hourly: makeHourly(m.temp, m.main, m.lo, m.hi, m.tz),
        daily: makeDaily(m.temp, m.main, m.lo, m.hi),
      },
      suggestion: null,
    };
  }

  return { data: null, suggestion: null };
}