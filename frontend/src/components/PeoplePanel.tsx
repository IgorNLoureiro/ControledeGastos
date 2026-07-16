import { useState, type FormEvent } from "react";
import { ApiError } from "../api/client";
import type { Person } from "../types";
import styles from "./PeoplePanel.module.css";

interface PeoplePanelProps {
  people: Person[];
  loading: boolean;
  error: string | null;
  onCreate: (name: string, age: number) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}

/**
 * Painel de cadastro, listagem e remoção de pessoas.
 */
export function PeoplePanel({ people, loading, error, onCreate, onRemove }: PeoplePanelProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    const trimmedName = name.trim();
    const parsedAge = Number(age);

    if (!trimmedName) {
      setFormError("Informe um nome.");
      return;
    }
    if (!age || Number.isNaN(parsedAge) || parsedAge < 0) {
      setFormError("Informe uma idade válida.");
      return;
    }

    setSubmitting(true);
    try {
      await onCreate(trimmedName, parsedAge);
      setName("");
      setAge("");
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Não foi possível cadastrar a pessoa.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRemove(person: Person) {
    // confirmação explícita porque a remoção apaga as transações da pessoa junto (cascade delete)
    if (!window.confirm(`Remover ${person.name}? As transações dela também serão apagadas.`)) return;
    await onRemove(person.id);
  }

  return (
    <section className={styles.panel}>
      <h2>Pessoas</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="person-name">Nome</label>
          <input
            id="person-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="person-age">Idade</label>
          <input
            id="person-age"
            type="number"
            min={0}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled={submitting}
          />
        </div>
        <button className={styles.button} type="submit" disabled={submitting}>
          {submitting ? "Registrando…" : "Registrar pessoa"}
        </button>
      </form>
      {formError && <p className={styles.error}>{formError}</p>}

      {loading && <p>Carregando pessoas…</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && people.length === 0 && <p>Nenhuma pessoa cadastrada ainda.</p>}

      {!loading && people.length > 0 && (
        <ul className={styles.list}>
          {people.map((person) => (
            <li key={person.id} className={styles.listItem}>
              {person.name} — {person.age} anos {person.age < 18 && "(menor)"}
              <button className={styles.removeButton} type="button" onClick={() => handleRemove(person)}>
                remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}