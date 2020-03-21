import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

const useAxios = (
  url: string
): { data: any; loading: boolean; error: AxiosResponse | null } => {
  const [data, setData] = useState<AxiosResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosResponse | null>(null);
  async function fetchUrl() {
    try {
      const response: AxiosResponse | null = await axios.get(url);
      setData(response?.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, [url]);
  return { data, loading, error };
};

export { useAxios };
