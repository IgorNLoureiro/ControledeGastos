using Microsoft.EntityFrameworkCore;
using ExpenseControl.Api.Models;

namespace ExpenseControl.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Person> People { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Garante que ao deletar uma pessoa, todas as transações vinculadas a ela sejam deletadas automaticamente
        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Person)
            .WithMany(p => p.Transactions)
            .HasForeignKey(t => t.PersonId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}