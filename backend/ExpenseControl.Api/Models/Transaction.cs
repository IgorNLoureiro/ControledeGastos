using System.Text.Json.Serialization;

namespace ExpenseControl.Api.Models;

/// <summary>
/// Tipo de transação financeira.
/// </summary>
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
    /// <summary>
    /// Identificador único, gerado automaticamente.
    /// </summary>
    public Guid Id { get; set; } = Guid.NewGuid();

    /// <summary>
    /// Descrição da transação, informada pelo usuário no momento do cadastro.
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Valor sempre positivo — quem define se é entrada ou saída é o campo Type.
    /// </summary>
    public decimal Amount { get; set; }

    /// <summary>
    /// Define se a transação é uma Despesa ou uma Receita.
    /// </summary>
    public TransactionType Type { get; set; }

    /// <summary>
    /// Identificador da pessoa dona da transação. Precisa corresponder a uma pessoa já cadastrada.
    /// </summary>
    public Guid PersonId { get; set; }

    /// <summary>
    /// Navegação para a pessoa dona da transação, usada pelo EF Core para carregar o relacionamento.
    /// Ignorado na serialização para evitar ciclo (Person → Transactions → Person...).
    /// </summary>
    [JsonIgnore]
    public Person? Person { get; set; }

    /// <summary>
    /// Data e hora (UTC) em que a transação foi registrada no sistema.
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}