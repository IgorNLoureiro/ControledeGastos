namespace ExpenseControl.Api.Models;

/// <summary>Tipo de transação financeira.</summary>
public enum TransactionType
{
    Despesa = 0,
    Receita = 1
}

/// <summary>
/// Representa uma transação financeira (receita ou despesa) associada a uma pessoa.
/// </summary>
public class Transaction
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public TransactionType Type { get; set; }
    public Guid PersonId { get; set; }
    public Person? Person { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}