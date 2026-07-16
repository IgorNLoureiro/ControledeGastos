import type { ApiErrorBody } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5011";

/**
 * Erro lançado quando a API retorna um status HTTP de falha (4xx/5xx).
 * Guarda o status code para permitir tratamento diferenciado, se necessário.
 */
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

/**
 * Executa uma requisição HTTP para a API, tratando erros e serialização de forma centralizada.
 * Lança ApiError quando a resposta não é bem-sucedida.
 */
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });

  if (!response.ok) {
    let message = response.statusText;
    try {
      const body: ApiErrorBody = await response.json();
      message = body.message ?? message;
    } catch {
      // corpo vazio ou não-JSON — mantém o statusText como mensagem de fallback
    }
    throw new ApiError(response.status, message);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

/**
 * Cliente HTTP simplificado para consumir a API do back-end.
 */
export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  delete: (path: string) => request<void>(path, { method: "DELETE" }),
};