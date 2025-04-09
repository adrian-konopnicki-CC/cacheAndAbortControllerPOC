import React from "react";

interface CacheStatusInfoProps {
  cacheStatus: string;
  lastUpdated: string;
  timeSinceUpdate: number;
}

export const CacheStatusInfo: React.FC<CacheStatusInfoProps> = ({
  cacheStatus,
  lastUpdated,
  timeSinceUpdate,
}) => {
  return (
    <div
      style={{
        padding: "6px",
        marginBottom: "10px",
        backgroundColor: cacheStatus.includes("Fresh") ? "#48d469" : "#f76c78",
        borderRadius: "4px",
      }}
    >
      <h3>Cache Status: {cacheStatus}</h3>
      <p>Last fetched at: {lastUpdated}</p>
      <p>Time since last fetch: {timeSinceUpdate} seconds</p>
    </div>
  );
};
