import { useMaxAge } from "../api/queries/dogs";
import { CacheStatusInfo } from "../components/CacheStatusInfo";
import { DogImage } from "../components/DogImage";
import { useCacheStatus } from "../hooks/useCacheStatus";

const MaxAge = () => {
  const { data, refetch, isFetching, dataUpdatedAt } = useMaxAge();

  const { lastUpdated, timeSinceUpdate, cacheStatus } =
    useCacheStatus(dataUpdatedAt);

  return (
    <div>
      <h1>Max Age</h1>
      <CacheStatusInfo
        cacheStatus={cacheStatus}
        lastUpdated={lastUpdated}
        timeSinceUpdate={timeSinceUpdate}
      />

      <DogImage
        imageUrl={data?.message}
        isFetching={isFetching}
        onRefetch={refetch}
      />

      <p>
        This endpoint uses <code>Cache-Control: public, max-age=5</code>
      </p>
    </div>
  );
};

export { MaxAge };
