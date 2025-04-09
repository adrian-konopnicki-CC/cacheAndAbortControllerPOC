import { useCallback, useState } from "react";
// import { useStaleWhileRevalidate } from "../api/queries/dogs";
// import { CacheStatusInfo } from "../components/CacheStatusInfo";
// import { DogImage } from "../components/DogImage";
// import { useCacheStatus } from "../hooks/useCacheStatus";
import { Dog } from "../models";

const StaleWhileRevalidate = () => {
  const [data, setData] = useState<Dog>();

  const refetch = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3000/dogs/staleWhileRevalidate`
    );
    const data = await response.json();
    setData(data);
  }, []);

  // const { data, refetch, isFetching, dataUpdatedAt } =
  //   useStaleWhileRevalidate();

  // const { lastUpdated, timeSinceUpdate, cacheStatus } = useCacheStatus(
  //   dataUpdatedAt,
  //   { maxAge: 5 }
  // );

  return (
    <div>
      <h1>Stale While Revalidate</h1>
      {/* <CacheStatusInfo
        cacheStatus={cacheStatus}
        lastUpdated={lastUpdated}
        timeSinceUpdate={timeSinceUpdate}
      />

      <DogImage
        imageUrl={data?.message}
        isFetching={isFetching}
        onRefetch={refetch}
      /> */}
      <img
        src={data?.message}
        alt="Random Dog"
        height={500}
        width={500}
        style={{ objectFit: "cover" }}
      />
      <p>{data?.message}</p>
      <br />
      <div style={{ marginTop: "15px" }}>
        <button
          onClick={refetch}
          style={{ padding: "8px 16px", fontSize: "16px" }}
        >
          Get New Dog
        </button>
      </div>
      <p>
        This endpoint uses
        <code> Cache-Control: public, max-age=5 stale-while-revalidate=10</code>
      </p>
    </div>
  );
};

export { StaleWhileRevalidate };
