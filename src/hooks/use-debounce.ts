import { useEffect, useState } from 'react';

type useDebouceProps = {
  value: string;
  delay: number;
};
export function useDebounce({ value, delay }: useDebouceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
