import { useState, useEffect } from "react";

interface CacheStatusOptions {
  maxAge: number;
}

interface CacheStatusResult {
  lastUpdated: string;
  timeSinceUpdate: number;
  cacheStatus: string;
}

export const useCacheStatus = (
  dataUpdatedAt: number | undefined,
  options: CacheStatusOptions = { maxAge: 5 }
): CacheStatusResult => {
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [timeSinceUpdate, setTimeSinceUpdate] = useState<number>(0);
  const [cacheStatus, setCacheStatus] = useState<string>("Fresh");

  // Update the time since last fetch
  useEffect(() => {
    if (!dataUpdatedAt) return;

    setLastUpdated(new Date(dataUpdatedAt).toLocaleTimeString());

    const interval = setInterval(() => {
      const secondsElapsed = Math.floor((Date.now() - dataUpdatedAt) / 1000);
      setTimeSinceUpdate(secondsElapsed);

      // Update cache status based on max-age value
      if (secondsElapsed <= options.maxAge) {
        setCacheStatus("Fresh (using cached data)");
      } else {
        setCacheStatus("Stale (must revalidate)");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dataUpdatedAt, options.maxAge]);

  return {
    lastUpdated,
    timeSinceUpdate,
    cacheStatus,
  };
};
