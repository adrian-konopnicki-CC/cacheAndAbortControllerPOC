import { useNoStore } from "../api/queries/dogs";

const NoStore = () => {
  const { data, refetch, isFetching } = useNoStore();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Stale While Revalidate Example</h1>
      <img
        src={data?.message}
        alt="Random Dog"
        height={600}
        width={600}
        style={{ objectFit: "cover" }}
      />
      <br />
      <button onClick={() => refetch()}>Get New Dog</button>
      <p>This endpoint uses Cache-Control: public, no-store</p>
    </div>
  );
};

export { NoStore };
