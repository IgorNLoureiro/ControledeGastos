using ExpenseControl.Api.Data;
using ExpenseControl.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Api.Services;

/// <summary>
/// Responsável por calcular os totais financeiros de pessoas e do sistema como um todo.
/// </summary>
public class SummaryService
{
    private readonly AppDbContext _context;

    public SummaryService(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retorna o resumo financeiro (receita, despesa, saldo) de cada pessoa cadastrada.
    /// </summary>
    public async Task<List<PersonSummaryDto>> GetSummaryByPerson()
    {
        var people = await _context.People
            .Include(p => p.Transactions)
            .ToListAsync();

        return people.Select(p => new PersonSummaryDto
        {
            PersonId = p.Id,
            Name = p.Name,
            TotalIncome = p.Transactions.Where(t => t.Type == TransactionType.Receita).Sum(t => t.Amount),
            TotalExpense = p.Transactions.Where(t => t.Type == TransactionType.Despesa).Sum(t => t.Amount),
            Balance = p.Transactions.Where(t => t.Type == TransactionType.Receita).Sum(t => t.Amount)
                    - p.Transactions.Where(t => t.Type == TransactionType.Despesa).Sum(t => t.Amount)
        }).ToList();
    }
}