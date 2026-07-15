using ExpenseControl.Api.Data;
using ExpenseControl.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Api.Services;

/// <summary>
/// Responsável pelas operações de negócio relacionadas ao cadastro de pessoas.
/// </summary>
public class PersonService
{
    private readonly AppDbContext _context;

    public PersonService(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Cadastra uma nova pessoa no banco de dados.
    /// </summary>
    public async Task<Person> Create(Person person)
    {
        _context.People.Add(person);
        await _context.SaveChangesAsync();
        return person;
    }

    /// <summary>
    /// Retorna todas as pessoas cadastradas no sistema.
    /// </summary>
    public async Task<List<Person>> GetAll()
    {
        return await _context.People.ToListAsync();
    }

    /// <summary>
    /// Remove uma pessoa pelo Id. Retorna false se a pessoa não for encontrada.
    /// </summary>
    public async Task<bool> Delete(Guid id)
    {
        var person = await _context.People.FindAsync(id);
        if (person is null)
            return false;

        // as transações dessa pessoa somem sozinhas por causa do cascade delete configurado no
        // AppDbContext
        _context.People.Remove(person);
        await _context.SaveChangesAsync();
        return true;
    }
}