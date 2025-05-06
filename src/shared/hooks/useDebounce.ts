import { useMemo } from 'react';

export const useDebounce = (defaultMs = 500) =>
  useMemo(() => {
    let timeout: number | undefined;

    return (func: () => void, ms = defaultMs) => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(func, ms);
    };
  }, [defaultMs]);
