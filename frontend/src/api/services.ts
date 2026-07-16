import { api } from "./client";
import type { NewPerson, NewTransaction, Person, SummaryResponse, Transaction } from "../types";

export const personApi = {
  getAll: () => api.get<Person[]>("/api/Person"),
  create: (person: NewPerson) => api.post<Person>("/api/Person", person),
  remove: (id: string) => api.delete(`/api/Person/${id}`),
};

export const transactionApi = {
  getAll: () => api.get<Transaction[]>("/api/Transaction"),
  create: (transaction: NewTransaction) => api.post<Transaction>("/api/Transaction", transaction),
};

export const summaryApi = {
  get: () => api.get<SummaryResponse>("/api/Summary"),
};