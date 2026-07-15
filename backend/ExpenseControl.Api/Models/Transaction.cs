using System.Text.Json.Serialization;

namespace ExpenseControl.Api.Models;

public enum TransactionType
{
    Despesa = 0,
    Receita = 1
}

/// <summary>
/// Representa uma transação financeira (receita ou despesa) vinculada a uma pessoa.
/// </summary>
public class Transaction
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Valor sempre positivo — quem define se é entrada ou saída é o campo Type.
    /// </summary>
    public decimal Amount { get; set; }

    public TransactionType Type { get; set; }
    public Guid PersonId { get; set; }

    [JsonIgnore]
    public Person? Person { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}