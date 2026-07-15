using ExpenseControl.Api.Models;
using ExpenseControl.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Api.Controllers;

/// <summary>
/// Endpoints para cadastro, listagem e remoção de pessoas.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class PersonController : ControllerBase
{
    private readonly PersonService _service;

    public PersonController(PersonService service)
    {
        _service = service;
    }

    /// <summary>
    /// Cadastra uma nova pessoa.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Create(Person person)
    {
        var created = await _service.Create(person);
        return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
    }

    /// <summary>
    /// Lista todas as pessoas cadastradas.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var people = await _service.GetAll();
        return Ok(people);
    }

    /// <summary>
    /// Remove uma pessoa pelo Id. As transações vinculadas a ela são removidas
    /// automaticamente pelo cascade delete configurado no banco.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _service.Delete(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }
}