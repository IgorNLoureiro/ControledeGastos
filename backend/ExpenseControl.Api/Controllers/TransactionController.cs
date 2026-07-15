using ExpenseControl.Api.Models;
using ExpenseControl.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    private readonly TransactionService _service;

    public TransactionController(TransactionService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Transaction transaction)
    {
        var (success, error, created) = await _service.Create(transaction);
        if (!success)
            return BadRequest(new { message = error });

        return CreatedAtAction(nameof(GetAll), new { id = created!.Id }, created);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var transactions = await _service.GetAll();
        return Ok(transactions);
    }
}