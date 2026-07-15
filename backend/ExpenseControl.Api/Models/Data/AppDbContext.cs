using Microsoft.EntityFrameworkCore;
using ExpenseControl.Api.Models;

namespace ExpenseControl.Api.Data;

/// <summary>
/// Contexto do Entity Framework Core responsável pelo acesso ao banco SQLite,
/// incluindo as tabelas de pessoas e transações e o relacionamento entre elas.
/// </summary>
public class AppDbContext : DbContext
{
    /// <summary>
    /// Construtor padrão, recebe as opções de configuração (connection string, etc.)
    /// via injeção de dependência configurada no Program.cs.
    /// </summary>
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    /// <summary>
    /// Tabela de pessoas cadastradas no sistema.
    /// </summary>
    public DbSet<Person> People { get; set; }

    /// <summary>
    /// Tabela de transações financeiras cadastradas no sistema.
    /// </summary>
    public DbSet<Transaction> Transactions { get; set; }

    /// <summary>
    /// Configura o relacionamento entre Person e Transaction, incluindo a regra de exclusão em cascata.
    /// </summary>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Person)
            .WithMany(p => p.Transactions)
            .HasForeignKey(t => t.PersonId)
            .OnDelete(DeleteBehavior.Cascade); // Ao excluir uma pessoa, todas as transações
            // vinculadas a ela também serão removidas.
    }
}