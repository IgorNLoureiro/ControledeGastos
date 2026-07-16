import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../api/client";
import { summaryApi } from "../api/services";
import type { SummaryResponse } from "../types";

export function useSummary(refreshKey: number) {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await summaryApi.get();
      setSummary(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Não foi possível carregar os totais.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return { summary, loading, error, reload };
}