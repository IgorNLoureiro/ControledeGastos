import type { SummaryResponse } from "../types";
import { formatMoney } from "../utils/format";

interface SummaryPanelProps {
  summary: SummaryResponse | null;
  loading: boolean;
  error: string | null;
}

export function SummaryPanel({ summary, loading, error }: SummaryPanelProps) {
  return (
    <section>
      <h2>Resumo</h2>

      {loading && <p>Calculando totais…</p>}
      {error && <p>{error}</p>}
      {!loading && !error && summary && summary.people.length === 0 && <p>Nenhuma pessoa cadastrada ainda.</p>}

      {!loading && !error && summary && summary.people.length > 0 && (
        <table>
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
                <td>{formatMoney(p.totalIncome)}</td>
                <td>{formatMoney(p.totalExpense)}</td>
                <td>{formatMoney(p.balance)}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Total geral</strong>
              </td>
              <td>{formatMoney(summary.total.totalIncome)}</td>
              <td>{formatMoney(summary.total.totalExpense)}</td>
              <td>{formatMoney(summary.total.balance)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </section>
  );
}