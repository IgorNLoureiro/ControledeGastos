using ExpenseControl.Api.Models;
using ExpenseControl.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Api.Controllers;

/// <summary>
/// Endpoints para cadastro e listagem de transações financeiras.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    private readonly TransactionService _service;

    public TransactionController(TransactionService service)
    {
        _service = service;
    }

    /// <summary>
    /// Cadastra uma nova transação. Retorna erro se a pessoa não existir ou se
    /// ela for menor de idade e a transação for do tipo Receita.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Create(Transaction transaction)
    {
        var (success, error, created) = await _service.Create(transaction);
        if (!success)
            return BadRequest(new { message = error });

        return CreatedAtAction(nameof(GetAll), new { id = created!.Id }, created);
    }

    /// <summary>
    /// Lista todas as transações cadastradas.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var transactions = await _service.GetAll();
        return Ok(transactions);
    }
}