/**
 * Tipo da transação: Despesa ou Receita.
 * Espelha o enum TransactionType do back-end, já serializado como string.
 */
export type TransactionType = "Despesa" | "Receita";

/**
 * Pessoa retornada pela API, já com o Id gerado pelo back-end.
 */
export interface Person {
  id: string;
  name: string;
  age: number;
}

/**
 * Dados necessários para cadastrar uma nova pessoa (sem Id, gerado pelo back-end).
 */
export interface NewPerson {
  name: string;
  age: number;
}

/**
 * Transação retornada pela API, já com Id e data de criação gerados pelo back-end.
 */
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  personId: string;
  createdAt: string;
}

/**
 * Dados necessários para cadastrar uma nova transação.
 * O back-end valida se personId existe e se a regra de menor de idade é respeitada.
 */
export interface NewTransaction {
  description: string;
  amount: number;
  type: TransactionType;
  personId: string;
}

/**
 * Resumo financeiro de uma pessoa: totais de receita, despesa e saldo.
 */
export interface PersonSummary {
  personId: string;
  name: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

/**
 * Resposta do endpoint de totais: resumo por pessoa e o total geral do sistema.
 */
export interface SummaryResponse {
  people: PersonSummary[];
  total: {
    totalIncome: number;
    totalExpense: number;
    balance: number;
  };
}

/**
 * Corpo de erro retornado pela API em respostas 400 (ex: validação de negócio).
 */
export interface ApiErrorBody {
  message?: string;
}