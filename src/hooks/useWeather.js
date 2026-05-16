import { useState, useCallback, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { fetchWeather } from '../services/weatherService';

export function useWeather() {
  const { apiKey } = useContext(ThemeContext);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (city) => {
    if (!city) return { data: null, suggestion: null };
    setLoading(true);
    try {
      const result = await fetchWeather(city, apiKey);
      setWeather(result.data);
      return result;
    } catch (e) {
      console.error('Weather fetch error:', e);
      return { data: null, suggestion: null };
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  return { weather, loading, load };
}