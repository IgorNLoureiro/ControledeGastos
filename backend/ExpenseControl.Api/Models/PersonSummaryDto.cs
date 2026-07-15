namespace ExpenseControl.Api.Models;

/// <summary>
/// Representa o resumo financeiro de uma pessoa: totais de receita, despesa e saldo.
/// </summary>
public class PersonSummaryDto
{
    public Guid PersonId { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal TotalIncome { get; set; }
    public decimal TotalExpense { get; set; }
    public decimal Balance { get; set; }
}