import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../api/client";
import { personApi } from "../api/services";
import type { NewPerson, Person } from "../types";

/**
 * Hook responsável por carregar, cadastrar e remover pessoas, mantendo a lista
 * sempre sincronizada com o back-end após cada operação.
 */
export function usePeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await personApi.getAll();
      setPeople(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Não foi possível carregar as pessoas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // carrega a lista assim que o hook monta, sem esperar uma ação do usuário
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reload();
  }, [reload]);

  const create = useCallback(async (person: NewPerson) => {
    await personApi.create(person);
    await reload();
  }, [reload]);

  const remove = useCallback(async (id: string) => {
    await personApi.remove(id);
    await reload();
  }, [reload]);

  return { people, loading, error, create, remove, reload };
}