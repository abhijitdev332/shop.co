import { useQuery } from "@tanstack/react-query";
import { PrivateAxios } from "../services/api/api"; // Adjust the path as needed

const useFetch = ({ url, queryKey, enabled = true, params = {} }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...queryKey],
    queryFn: async () => {
      const response = await PrivateAxios.get(url, { params });
      return response.data;
    },
    enabled,
    retry: true, // Prevent retries, adjust if needed
  });

  return { data, isLoading, isError, error };
};

export default useFetch;
