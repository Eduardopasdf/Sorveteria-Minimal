using Microsoft.EntityFrameworkCore;

public static class PedidoEndpoints
{
    public static void MapPedidoEndpoints(this WebApplication app)
    {
        app.MapGet("/pedidos", async (AppDbContext db) =>
            await db.Pedidos.Include(p => p.Itens).ToListAsync());

        app.MapPost("/pedidos", async (Pedido pedido, AppDbContext db) =>
        {
            db.Pedidos.Add(pedido);
            await db.SaveChangesAsync();
            return Results.Created($"/pedidos/{pedido.Id}", pedido);
        });
    }
}
