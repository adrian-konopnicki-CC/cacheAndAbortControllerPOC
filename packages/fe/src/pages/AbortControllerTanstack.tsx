import { useAbortController } from "../api/queries/abort";
import { DogImage } from "../components/DogImage";
import { queryClient } from "../main";

const AbortControllerTanstack = () => {
  const { data, refetch, isFetching } = useAbortController();

  return (
    <div>
      <h1>Abort controller</h1>

      <DogImage
        imageUrl={data?.message}
        isFetching={isFetching}
        onRefetch={refetch}
      />
      <button
        style={{ marginTop: "10px" }}
        onClick={(e) => {
          e.preventDefault();
          queryClient.cancelQueries({ queryKey: ["abortController"] });
        }}
      >
        Cancel query
      </button>
    </div>
  );
};

export { AbortControllerTanstack };
