import { useNoCache } from "../api/queries/dogs";
import { DogImage } from "../components/DogImage";

const NoCache = () => {
  const { data, refetch, isFetching } = useNoCache();

  return (
    <div>
      <h1>Stale While Revalidate Example</h1>

      <DogImage
        imageUrl={data?.message}
        isFetching={isFetching}
        onRefetch={refetch}
      />
      <p>
        This endpoint uses: {""}
        <code>Cache-Control: public, no-cache</code>
      </p>
    </div>
  );
};

export { NoCache };
