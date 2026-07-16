import { useMemo, useState, type FormEvent } from "react";
import { ApiError } from "../api/client";
import type { NewTransaction, Person, Transaction, TransactionType } from "../types";
import { formatDate, formatMoney } from "../utils/format";
import styles from "./TransactionsPanel.module.css";

interface TransactionsPanelProps {
  people: Person[];
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  onCreate: (transaction: NewTransaction) => Promise<void>;
}

export function TransactionsPanel({ people, transactions, loading, error, onCreate }: TransactionsPanelProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("Despesa");
  const [personId, setPersonId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const peopleById = useMemo(() => {
    const map = new Map<string, Person>();
    people.forEach((p) => map.set(p.id, p));
    return map;
  }, [people]);

  const selectedPerson = personId ? peopleById.get(personId) : undefined;
  const receitaDisabled = selectedPerson !== undefined && selectedPerson.age < 18;

  function handlePersonChange(id: string) {
    setPersonId(id);
    const person = peopleById.get(id);
    if (person && person.age < 18 && type === "Receita") {
      setType("Despesa");
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    const parsedAmount = Number(amount);

    if (!description.trim()) {
      setFormError("Informe uma descrição.");
      return;
    }
    if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormError("Informe um valor maior que zero.");
      return;
    }
    if (!personId) {
      setFormError("Selecione uma pessoa.");
      return;
    }

    setSubmitting(true);
    try {
      await onCreate({ description: description.trim(), amount: parsedAmount, type, personId });
      setDescription("");
      setAmount("");
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Não foi possível cadastrar a transação.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={styles.panel}>
      <h2>Transações</h2>

      {people.length === 0 && !loading && <p>Cadastre uma pessoa antes de lançar uma transação.</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="tx-description">Descrição</label>
          <input
            id="tx-description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={submitting || people.length === 0}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="tx-amount">Valor</label>
          <input
            id="tx-amount"
            type="number"
            min={0.01}
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={submitting || people.length === 0}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="tx-person">Pessoa</label>
          <select
            id="tx-person"
            value={personId}
            onChange={(e) => handlePersonChange(e.target.value)}
            disabled={submitting || people.length === 0}
          >
            <option value="">Selecione…</option>
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="tx-type">Tipo</label>
          <select
            id="tx-type"
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            disabled={submitting || people.length === 0}
          >
            <option value="Despesa">Despesa</option>
            <option value="Receita" disabled={receitaDisabled}>
              Receita
            </option>
          </select>
          {receitaDisabled && <span className={styles.hint}>Menor de idade só pode cadastrar despesas.</span>}
        </div>
        <button className={styles.button} type="submit" disabled={submitting || people.length === 0}>
          {submitting ? "Lançando…" : "Lançar transação"}
        </button>
      </form>
      {formError && <p className={styles.error}>{formError}</p>}

      {loading && <p>Carregando transações…</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && transactions.length === 0 && <p>Nenhuma transação registrada ainda.</p>}

      {!loading && transactions.length > 0 && (
        <ul className={styles.list}>
          {[...transactions]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((tx) => {
              const person = peopleById.get(tx.personId);
              const isIncome = tx.type === "Receita";
              return (
                <li key={tx.id} className={styles.listItem}>
                  <span>
                    {tx.description} — {person?.name ?? "—"} — {formatDate(tx.createdAt)}
                  </span>
                  <span className={isIncome ? styles.income : styles.expense}>
                    {isIncome ? "+" : "-"} {formatMoney(tx.amount)}
                  </span>
                </li>
              );
            })}
        </ul>
      )}
    </section>
  );
}