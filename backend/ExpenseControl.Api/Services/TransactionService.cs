using ExpenseControl.Api.Data;
using ExpenseControl.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Api.Services;

/// <summary>
/// Responsável pelas operações de negócio relacionadas ao cadastro de transações,
/// incluindo as validações de pessoa existente e restrição de menor de idade.
/// </summary>
public class TransactionService
{
    private readonly AppDbContext _context;

    public TransactionService(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Cadastra uma nova transação, validando se a pessoa existe e se ela pode
    /// registrar o tipo de transação informado (menor de idade só cadastra despesa).
    /// </summary>
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

    /// <summary>
    /// Retorna todas as transações cadastradas no sistema.
    /// </summary>
    public async Task<List<Transaction>> GetAll()
    {
        return await _context.Transactions.ToListAsync();
    }
}