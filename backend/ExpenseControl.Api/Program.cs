using Microsoft.EntityFrameworkCore;
using ExpenseControl.Api.Data;
using ExpenseControl.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite("Data Source=expensecontrol.db"));

builder.Services.AddScoped<PersonService>();

builder.Services.AddScoped<TransactionService>();

builder.Services.AddScoped<SummaryService>();

builder.Services.AddCors(options =>
    options.AddPolicy("Frontend", policy => policy
        .WithOrigins("http://localhost:5173")
        .AllowAnyMethod()
        .AllowAnyHeader()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Frontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
