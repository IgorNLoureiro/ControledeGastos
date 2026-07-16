# Controle de Gastos Residenciais

Sistema de controle de gastos residenciais, com cadastro de pessoas, cadastro de transações (receitas/despesas) e consulta de totais.

## Tecnologias

- **Back-end:** .NET 8, ASP.NET Core Web API, Entity Framework Core, SQLite
- **Front-end:** React + TypeScript (Vite), CSS Modules

## Funcionalidades

- **Cadastro de pessoas:** criação, listagem e remoção. Ao remover uma pessoa, todas as suas transações são apagadas automaticamente (cascade delete).
- **Cadastro de transações:** criação e listagem, vinculadas a uma pessoa. Pessoas menores de 18 anos só podem cadastrar despesas.
- **Consulta de totais:** resumo de receitas, despesas e saldo por pessoa, além do total geral do sistema.

## Como rodar o projeto

### Back-end

\`\`\`bash
cd backend/ExpenseControl.Api
dotnet restore
dotnet ef database update
dotnet run
\`\`\`

A API sobe em `http://localhost:5011` (Swagger disponível em `/swagger`).

### Front-end

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

O front sobe em `http://localhost:5173`.

> O back-end precisa estar rodando para o front-end funcionar — o front consome a API em `http://localhost:5011`.

## Estrutura do projeto

\`\`\`
ControleGastos/
├── backend/
│   └── ExpenseControl.Api/
│       ├── Controllers/   # Endpoints HTTP
│       ├── Services/      # Regras de negócio
│       ├── Models/        # Entidades e DTOs
│       ├── Data/          # DbContext (EF Core)
│       └── Migrations/    # Histórico do banco
└── frontend/
    └── src/
        ├── api/           # Cliente HTTP e chamadas à API
        ├── hooks/         # Hooks de dados (pessoas, transações, resumo)
        ├── components/    # Painéis de UI
        └── types/         # Tipos TypeScript compartilhados
\`\`\`

## Decisões técnicas

- **Camadas no back-end:** Controller → Service → DbContext, separando regra de negócio (Service) de tratamento HTTP (Controller).
- **Cascade delete:** configurado no EF Core (`OnDelete(DeleteBehavior.Cascade)`), garantindo que a exclusão de uma pessoa e suas transações aconteça de forma atômica no banco.
- **Persistência:** SQLite em arquivo (`expensecontrol.db`), garantindo que os dados sobrevivam ao fechar a aplicação.
- **Enum como string:** `TransactionType` trafega como texto (`"Despesa"`/`"Receita"`) no JSON da API, via `JsonStringEnumConverter`, tornando o contrato mais legível para o front-end.
- **CORS:** liberado explicitamente para `http://localhost:5173` (origem do front em desenvolvimento).
