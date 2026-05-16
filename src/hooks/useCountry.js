import { useState, useCallback } from 'react';
import { fetchCountry } from '../services/countryService';

export function useCountry() {
  const [country, setCountry] = useState(null);
  const load = useCallback((code) => {
    if (!code) return;
    fetchCountry(code).then(setCountry).catch(() => setCountry(null));
  }, []);
  return { country, load };
}