using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configurar DbContext com SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=sorveteria.db"));

// Configurar CORS para permitir requisições do frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Sorveteria API", Version = "v1" });
});

var app = builder.Build();

// Ativar Swagger apenas em desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Tratamento global de erros
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(new
        {
            StatusCode = 500,
            Message = "Ocorreu um erro inesperado no servidor"
        });
    });
});

// Usar CORS
app.UseCors("AllowAll");

// ✅ REGISTRO DOS ENDPOINTS AQUI
app.MapSorveteEndpoints();
// app.MapCupomEndpoints(); // Removido pois cupom foi excluído
app.MapPedidoEndpoints();

app.Run();
