import { useCallback, useEffect, useState } from "react";

import { api, getErrorMessage } from "../services/api";

export function useApiResource(url, options = {}) {
  const [data, setData] = useState(options.initialData ?? []);
  const [meta, setMeta] = useState({ count: 0, next: null, previous: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResource = useCallback(
    async (query = "") => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(`${url}${query}`);
        const body = response.data;
        setData(body.results ?? body.data ?? body);
        setMeta({
          count: body.count ?? 0,
          next: body.next ?? null,
          previous: body.previous ?? null
        });
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    fetchResource(options.query ?? "");
  }, [fetchResource, options.query]);

  return { data, meta, loading, error, refetch: fetchResource, setData };
}
