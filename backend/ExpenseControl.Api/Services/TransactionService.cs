using ExpenseControl.Api.Data;
using ExpenseControl.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Api.Services;

public class TransactionService
{
    private readonly AppDbContext _context;

    public TransactionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<(bool Success, string? Error, Transaction? Transaction)> Create(Transaction transaction)
    {
        var person = await _context.People.FindAsync(transaction.PersonId);
        if (person is null)
            return (false, "Pessoa não encontrada.", null);

        // menor de idade só pode registrar despesa, nunca receita
        if (person.IsMinor && transaction.Type == TransactionType.Receita)
            return (false, "Menores de idade só podem cadastrar despesas.", null);

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();
        return (true, null, transaction);
    }

    public async Task<List<Transaction>> GetAll()
    {
        return await _context.Transactions.ToListAsync();
    }
}