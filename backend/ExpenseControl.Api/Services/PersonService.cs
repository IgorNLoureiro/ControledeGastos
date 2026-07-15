using ExpenseControl.Api.Data;
using ExpenseControl.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Api.Services;

public class PersonService
{
    private readonly AppDbContext _context;

    public PersonService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Person> Create(Person person)
    {
        _context.People.Add(person);
        await _context.SaveChangesAsync();
        return person;
    }

    public async Task<List<Person>> GetAll()
    {
        return await _context.People.ToListAsync();
    }

    public async Task<bool> Delete(Guid id)
    {
        var person = await _context.People.FindAsync(id);
        if (person is null)
            return false;

        // as transações dessa pessoa somem sozinhas por causa do cascade delete configurado no AppDbContext
        _context.People.Remove(person);
        await _context.SaveChangesAsync();
        return true;
    }
}