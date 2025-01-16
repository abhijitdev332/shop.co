import { useQuery } from "@tanstack/react-query";
import { PrivateAxios, AxiosInt } from "../services/api/api"; // Adjust the path as needed

interface FetchOptions {
  url: string;
  queryKey: string | unknown[];
  enabled?: boolean; // Controls whether the query should automatically run
  params?: Record<string, any>;
}

const useFetch = ({
  url,
  queryKey,
  enabled = true,
  params = {},
}: FetchOptions) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await AxiosInt.get(url, { params });
      return response.data;
    },
    enabled,
    retry: true, // Prevent retries, adjust if needed
  });

  return { data, isLoading, isError, error };
};

export default useFetch;
