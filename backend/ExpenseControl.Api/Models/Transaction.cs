namespace ExpenseControl.Api.Models;

public enum TransactionType
{
    Despesa = 0,
    Receita = 1
}

public class Transaction
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Sempre positivo — quem define se é entrada ou saída é o campo Type 
    /// </summary>
    public decimal Amount { get; set; }

    public TransactionType Type { get; set; }
    public Guid PersonId { get; set; }
    public Person? Person { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}