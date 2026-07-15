namespace ExpenseControl.Api.Models;

/// <summary>
/// Representa uma pessoa cadastrada no sistema, com suas transações associadas.
/// </summary>
public class Person
{
    /// <summary>
    /// Identificador único, gerado automaticamente.
    /// </summary>
    public Guid Id { get; set; } = Guid.NewGuid();

    /// <summary>
    /// Nome da pessoa.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Idade da pessoa, usada para aplicar a regra de menor de idade.
    /// </summary>
    public int Age { get; set; }

    /// <summary>
    /// Transações associadas a esta pessoa.
    /// </summary>
    public List<Transaction> Transactions { get; set; } = new();

    /// <summary>
    /// Indica se a pessoa é menor de idade (idade menor que 18 anos).
    /// Centraliza a regra em um só lugar, evitando espalhar "Age &lt; 18" pelo código.
    /// </summary>
    public bool IsMinor => Age < 18;
}