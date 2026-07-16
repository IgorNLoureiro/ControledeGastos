import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../api/client";
import { transactionApi } from "../api/services";
import type { NewTransaction, Transaction } from "../types";

/**
 * Hook responsável por carregar e cadastrar transações, mantendo a lista
 * sempre sincronizada com o back-end após cada operação.
 */
export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionApi.getAll();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Não foi possível carregar as transações.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // carrega a lista assim que o hook monta, sem esperar uma ação do usuário
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reload();
  }, [reload]);

  const create = useCallback(async (transaction: NewTransaction) => {
    await transactionApi.create(transaction);
    await reload();
  }, [reload]);

  return { transactions, loading, error, create, reload };
}