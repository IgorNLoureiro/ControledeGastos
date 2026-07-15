namespace ExpenseControl.Api.Models;

/// <summary>
/// Representa uma pessoa cadastrada no sistema de controle de gastos residenciais.
/// </summary>
public class Person
{
    /// <summary>Identificador único, gerado automaticamente.</summary>
    public Guid Id { get; set; } = Guid.NewGuid();

    /// <summary>Nome completo da pessoa.</summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>Idade da pessoa. Usada para validar a regra de menor de idade.</summary>
    public int Age { get; set; }

    /// <summary>
    /// Transações associadas a esta pessoa.
    /// Ao excluir a pessoa, todas as transações são removidas em cascata (configurado no DbContext).
    /// </summary>
    public List<Transaction> Transactions { get; set; } = new();

    /// <summary>Indica se a pessoa é menor de idade (regra de negócio: menor que 18 anos).</summary>
    public bool IsMinor => Age < 18;
}