import { useState } from "react";
import styles from "./App.module.css";
import { PeoplePanel } from "./components/PeoplePanel";
import { TransactionsPanel } from "./components/TransactionsPanel";
import { SummaryPanel } from "./components/SummaryPanel";
import { usePeople } from "./hooks/usePeople";
import { useTransactions } from "./hooks/useTransactions";
import { useSummary } from "./hooks/useSummary";

type Tab = "pessoas" | "transacoes" | "resumo";

/**
 * Componente raiz da aplicação. Controla a navegação por abas (Pessoas,
 * Transações, Resumo) e orquestra os hooks de dados de cada uma.
 */
function App() {
  const [tab, setTab] = useState<Tab>("pessoas");
  const [summaryRefreshKey, setSummaryRefreshKey] = useState(0);

  const peopleState = usePeople();
  const transactionsState = useTransactions();
  const summaryState = useSummary(summaryRefreshKey);

  async function handleCreatePerson(name: string, age: number) {
    await peopleState.create({ name, age });
    // atualiza o resumo, já que uma nova pessoa muda os totais gerais
    setSummaryRefreshKey((k) => k + 1);
  }

  async function handleRemovePerson(id: string) {
    await peopleState.remove(id);
    // as transações da pessoa removida somem via cascade delete no back-end,
    // então recarrega a lista de transações pra refletir isso no front também
    await transactionsState.reload();
    setSummaryRefreshKey((k) => k + 1);
  }

  async function handleCreateTransaction(transaction: Parameters<typeof transactionsState.create>[0]) {
    await transactionsState.create(transaction);
    setSummaryRefreshKey((k) => k + 1);
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Controle de Gastos Residenciais</h1>

      <nav className={styles.nav}>
        <button
          type="button"
          className={tab === "pessoas" ? styles.navButtonActive : styles.navButton}
          onClick={() => setTab("pessoas")}
        >
          Pessoas
        </button>
        <button
          type="button"
          className={tab === "transacoes" ? styles.navButtonActive : styles.navButton}
          onClick={() => setTab("transacoes")}
        >
          Transações
        </button>
        <button
          type="button"
          className={tab === "resumo" ? styles.navButtonActive : styles.navButton}
          onClick={() => setTab("resumo")}
        >
          Resumo
        </button>
      </nav>

      {tab === "pessoas" && (
        <PeoplePanel
          people={peopleState.people}
          loading={peopleState.loading}
          error={peopleState.error}
          onCreate={handleCreatePerson}
          onRemove={handleRemovePerson}
        />
      )}
      {tab === "transacoes" && (
        <TransactionsPanel
          people={peopleState.people}
          transactions={transactionsState.transactions}
          loading={transactionsState.loading}
          error={transactionsState.error}
          onCreate={handleCreateTransaction}
        />
      )}
      {tab === "resumo" && (
        <SummaryPanel summary={summaryState.summary} loading={summaryState.loading} error={summaryState.error} />
      )}
    </div>
  );
}

export default App;