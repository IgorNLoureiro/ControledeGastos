export type TransactionType = "Despesa" | "Receita";

export interface Person {
  id: string;
  name: string;
  age: number;
}

export interface NewPerson {
  name: string;
  age: number;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  personId: string;
  createdAt: string;
}

export interface NewTransaction {
  description: string;
  amount: number;
  type: TransactionType;
  personId: string;
}

export interface PersonSummary {
  personId: string;
  name: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface SummaryResponse {
  people: PersonSummary[];
  total: {
    totalIncome: number;
    totalExpense: number;
    balance: number;
  };
}

export interface ApiErrorBody {
  message?: string;
}