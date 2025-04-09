import { useCallback, useState } from "react";
import { Dogs } from "../models";

const ETag = () => {
  const [data, setData] = useState<Dogs>();
  const [breed, setBreed] = useState("");

  const fetchData = useCallback(async (breed: string, forceRefetch = false) => {
    const cachedETag = localStorage.getItem("ETag");
    const headers: HeadersInit = { "Cache-Control": "no-cache" };

    if (cachedETag && !forceRefetch) {
      headers["If-None-Match"] = cachedETag;
    }

    const response = await fetch(`http://localhost:3000/dogs/etag/${breed}`, {
      headers,
    });

    if (response.status === 304) {
      return null;
    }

    const etag =
      response.headers.get("etag") ||
      response.headers.get("ETag") ||
      response.headers.get("Etag");

    const items = await response.json();

    if (etag) {
      localStorage.setItem("ETag", etag);
    }

    setData(items);
  }, []);

  return (
    <div>
      <h1>ETag</h1>

      <p>Copy and paste 1 of breeds to input:</p>
      <code>hound</code>
      <code> mountain</code>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data &&
          data.message.map((imageUrl, index) => (
            <img
              src={imageUrl}
              alt="Random Dog"
              height={30}
              width={30}
              style={{ objectFit: "cover" }}
              key={index}
            />
          ))}
      </div>

      <br />
      <div style={{ marginTop: "15px" }}>
        <input type="text" onChange={(v) => setBreed(v.target.value)} />
        <br />
        <br />
        <button
          onClick={() => fetchData(breed)}
          style={{ padding: "8px 16px", fontSize: "16px", marginRight: "10px" }}
        >
          Fetch
        </button>
        <button
          onClick={() => fetchData(breed, true)}
          style={{ padding: "8px 16px", fontSize: "16px" }}
        >
          Force Refresh
        </button>
      </div>
      <p>
        This endpoint uses
        <code> Cache-Control: no-cache, etag</code>
      </p>
    </div>
  );
};

export { ETag };
