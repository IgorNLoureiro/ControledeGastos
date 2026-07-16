import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../api/client";
import { summaryApi } from "../api/services";
import type { SummaryResponse } from "../types";

/**
 * Hook responsável por carregar os totais financeiros (por pessoa e geral).
 * Recarrega automaticamente sempre que refreshKey mudar — usado pelo App para
 * forçar atualização após qualquer cadastro/remoção de pessoa ou transação.
 */
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
    // dispara o reload sempre que refreshKey muda (não só na montagem, como nos outros hooks)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reload();
    // reload não entra nas deps de propósito: ele é recriado a cada render por causa
    // do useCallback, e incluí-lo aqui causaria um loop de recarregamento infinito
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return { summary, loading, error, reload };
}