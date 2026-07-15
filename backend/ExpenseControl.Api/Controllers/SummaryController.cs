using ExpenseControl.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SummaryController : ControllerBase
{
    private readonly SummaryService _service;

    public SummaryController(SummaryService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var byPerson = await _service.GetSummaryByPerson();

        // total geral é a soma simples de tudo que já foi calculado por pessoa,
        // evita bater no banco de novo pra recalcular do zero
        var response = new
        {
            People = byPerson,
            Total = new
            {
                TotalIncome = byPerson.Sum(p => p.TotalIncome),
                TotalExpense = byPerson.Sum(p => p.TotalExpense),
                Balance = byPerson.Sum(p => p.Balance)
            }
        };

        return Ok(response);
    }
}