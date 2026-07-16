import type { SummaryResponse } from "../types";
import { formatMoney } from "../utils/format";
import styles from "./SummaryPanel.module.css";

interface SummaryPanelProps {
  summary: SummaryResponse | null;
  loading: boolean;
  error: string | null;
}

/**
 * Painel de consulta de totais: exibe o resumo financeiro de cada pessoa
 * e o total geral do sistema.
 */
export function SummaryPanel({ summary, loading, error }: SummaryPanelProps) {
  return (
    <section className={styles.panel}>
      <h2>Resumo</h2>

      {loading && <p>Calculando totais…</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && summary && summary.people.length === 0 && <p>Nenhuma pessoa cadastrada ainda.</p>}

      {!loading && !error && summary && summary.people.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Pessoa</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {summary.people.map((p) => (
              <tr key={p.personId}>
                <td>{p.name}</td>
                <td className={styles.income}>{formatMoney(p.totalIncome)}</td>
                <td className={styles.expense}>{formatMoney(p.totalExpense)}</td>
                <td>{formatMoney(p.balance)}</td>
              </tr>
            ))}
            <tr className={styles.totalRow}>
              <td>Total geral</td>
              <td className={styles.income}>{formatMoney(summary.total.totalIncome)}</td>
              <td className={styles.expense}>{formatMoney(summary.total.totalExpense)}</td>
              <td>{formatMoney(summary.total.balance)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </section>
  );
}