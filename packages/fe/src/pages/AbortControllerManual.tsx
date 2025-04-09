import { useEffect, useRef, useState } from "react";
import { DogImage } from "../components/DogImage";
import { Dog } from "../models";
import { apiClient } from "../api/apiClient";
import { AxiosError } from "axios";

const AbortControllerManual = () => {
  const [data, setData] = useState<Dog | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = async () => {
    setIsFetching(true);
    controllerRef.current = new AbortController();

    try {
      const response = await apiClient.get("/dogs/abortController", {
        signal: controllerRef.current.signal,
        // signal: AbortSignal.timeout(1000),
        // signal: AbortSignal.any([
        //   controllerRef.current.signal,
        //   AbortSignal.timeout(2000),
        // ]),
      });

      setData(response.data);
    } catch (error) {
      if (error instanceof AxiosError && error.code === "ERR_CANCELED") {
        console.log("Fetch aborted");
      } else {
        throw error;
      }
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    // Cleanup function to abort the fetch when the component unmounts
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  // Abort Event listeners - uncomment to add abort event listeners
  // useEffect(() => {
  //   const controller = new AbortController();
  //   const { signal } = controller;

  //   const handleClick = () => console.log("Click");
  //   const handleMouseMove = () => console.log("Mouse move");

  //   document.addEventListener("click", handleClick, { signal });
  //   document.addEventListener("mousemove", handleMouseMove, { signal });

  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  return (
    <div>
      <h1>Abort controller manual</h1>

      <DogImage
        imageUrl={data?.message}
        isFetching={isFetching}
        onRefetch={fetchData}
      />

      <button
        style={{ marginTop: "10px" }}
        onClick={(e) => {
          e.preventDefault();
          if (controllerRef.current) {
            controllerRef.current.abort();
          }
        }}
      >
        Cancel query
      </button>
    </div>
  );
};

export { AbortControllerManual };
