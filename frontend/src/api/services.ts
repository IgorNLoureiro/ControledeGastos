import { api } from "./client";
import type { NewPerson, NewTransaction, Person, SummaryResponse, Transaction } from "../types";

/**
 * Operações da API relacionadas ao cadastro de pessoas.
 */
export const personApi = {
  getAll: () => api.get<Person[]>("/api/Person"),
  create: (person: NewPerson) => api.post<Person>("/api/Person", person),
  remove: (id: string) => api.delete(`/api/Person/${id}`),
};

/**
 * Operações da API relacionadas ao cadastro de transações.
 */
export const transactionApi = {
  getAll: () => api.get<Transaction[]>("/api/Transaction"),
  create: (transaction: NewTransaction) => api.post<Transaction>("/api/Transaction", transaction),
};

/**
 * Operação da API relacionada à consulta de totais.
 */
export const summaryApi = {
  get: () => api.get<SummaryResponse>("/api/Summary"),
};