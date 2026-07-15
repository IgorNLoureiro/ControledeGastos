namespace ExpenseControl.Api.Models;

public class Person
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public List<Transaction> Transactions { get; set; } = new();

    /// <summary>
    /// Propriedade calculada para centralizar a regra de negócio de menor de idade.
    /// Assim não espalhamos "Age < 18" por vários lugares do código.
    /// </summary>
        public bool IsMinor => Age < 18;
}