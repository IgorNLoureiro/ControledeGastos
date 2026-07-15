namespace ExpenseControl.Api.Models;

/// <summary>
/// Representa o resumo financeiro de uma pessoa: totais de receita, despesa e saldo.
/// </summary>
public class PersonSummaryDto
{
    /// <summary>
    /// Identificador da pessoa a quem este resumo pertence.
    /// </summary>
    public Guid PersonId { get; set; }

    /// <summary>
    /// Nome da pessoa, copiado do cadastro para facilitar a exibição sem consultas adicionais.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Soma de todas as transações do tipo Receita registradas para esta pessoa.
    /// </summary>
    public decimal TotalIncome { get; set; }

    /// <summary>
    /// Soma de todas as transações do tipo Despesa registradas para esta pessoa.
    /// </summary>
    public decimal TotalExpense { get; set; }

    /// <summary>
    /// Saldo resultante (TotalIncome - TotalExpense).
    /// </summary>
    public decimal Balance { get; set; }
}