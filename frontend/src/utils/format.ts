/**
 * Formata um valor numérico como moeda brasileira (R$).
 */
export function formatMoney(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/**
 * Formata uma data ISO (ex: retornada pelo back-end) no padrão brasileiro dd/mm/aaaa.
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}