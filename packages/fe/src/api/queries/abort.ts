import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { AxiosError } from "axios";
import { Dog } from "../../models";

const getAbortController = async (signal: AbortSignal) => {
  const response = await apiClient.get(`dogs/abortController`, { signal });
  return response.data;
};

const useAbortController = () =>
  useQuery<Dog, AxiosError>({
    queryKey: ["abortController"],
    queryFn: ({ signal }) => getAbortController(signal),
  });

export { useAbortController };
