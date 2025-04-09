import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { AxiosError } from "axios";
import { Dog } from "../../models";

export const getRandomDog = async (path: string) => {
  const response = await apiClient.get(`dogs/${path}`);
  return response.data;
};

const useMaxAge = () =>
  useQuery<Dog, AxiosError>({
    queryKey: ["maxAge"],
    queryFn: () => getRandomDog("maxAge"),
  });

const useNoCache = () =>
  useQuery<Dog, AxiosError>({
    queryKey: ["noCache"],
    queryFn: () => getRandomDog("noCache"),
  });

const useNoStore = () =>
  useQuery<Dog, AxiosError>({
    queryKey: ["noStore"],
    queryFn: () => getRandomDog("noStore"),
  });

const useStaleWhileRevalidate = () =>
  useQuery<Dog, AxiosError>({
    queryKey: ["staleWhileRevalidate"],
    queryFn: () => getRandomDog("staleWhileRevalidate"),
  });

const useMinFresh = () =>
  useQuery<Dog, AxiosError>({
    queryKey: ["minFresh"],
    queryFn: () => getRandomDog("minFresh"),
  });

export {
  useMaxAge,
  useNoCache,
  useNoStore,
  useStaleWhileRevalidate,
  useMinFresh,
};
