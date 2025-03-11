import { useState, useEffect } from "react";

export const useDebounce = (text: string, delay: number) => {
  const [debounce, setDebounce] = useState(text);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(text);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return debounce;
};
