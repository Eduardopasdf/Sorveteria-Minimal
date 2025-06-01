using Microsoft.EntityFrameworkCore;

/// <summary>
/// Classe responsável por mapear todos os endpoints relacionados a pedidos
/// </summary>
public static class PedidoEndpoints
{
    /// <summary>
    /// Configura todos os endpoints relacionados a gestão de pedidos na aplicação
    /// </summary>
    /// <param name="app">A instância da aplicação web</param>
    public static void MapPedidoEndpoints(this WebApplication app)
    {
        app.MapGet("/pedidos", async (AppDbContext db) =>
        {
            var pedidos = await db.Pedidos
                .Include(p => p.Itens)
                .ToListAsync();

            var sorveteIds = pedidos.SelectMany(p => p.Itens.Select(i => i.SorveteId)).Distinct().ToList();
            var sorvetes = await db.Sorvetes.Where(s => sorveteIds.Contains(s.Id)).ToListAsync();

            var pedidosDto = pedidos.Select(p => new PedidoDTO
            {
                Id = p.Id,
                Itens = p.Itens.Select(i =>
                {
                    var sorvete = sorvetes.FirstOrDefault(s => s.Id == i.SorveteId);
                    return new ItemPedidoDTO
                    {
                        Id = i.Id,
                        SorveteId = i.SorveteId,
                        Quantidade = i.Quantidade,
                        Nome = sorvete?.Nome ?? "Produto",
                        Preco = sorvete?.Preco ?? 0,
                        ImagemUrl = sorvete?.ImagemUrl ?? ""
                    };
                }).ToList(),
                Total = p.Total,
                MetodoPagamento = p.MetodoPagamento,
                QRCodeUrl = p.QRCodeUrl,
                Cancelado = p.Cancelado,
                DataHora = p.DataHora
            }).ToList();

            return pedidosDto;
        });

        app.MapPost("/pedidos", async (Pedido pedido, AppDbContext db) =>
        {
            db.Pedidos.Add(pedido);
            await db.SaveChangesAsync();
            return Results.Created($"/pedidos/{pedido.Id}", pedido);
        });

        app.MapDelete("/pedidos/{id}", async (int id, AppDbContext db) =>
        {
            var pedido = await db.Pedidos
                .Include(p => p.Itens)
                .FirstOrDefaultAsync(p => p.Id == id);
            if (pedido == null)
            {
                return Results.NotFound();
            }
            // Remove os itens relacionados primeiro
            db.RemoveRange(pedido.Itens);
            // Remove o pedido
            db.Pedidos.Remove(pedido);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        app.MapPatch("/pedidos/{id}/cancelar", async (int id, AppDbContext db) =>
        {
            var pedido = await db.Pedidos.FindAsync(id);
            if (pedido == null)
            {
                return Results.NotFound();
            }
            pedido.Cancelado = true;
            await db.SaveChangesAsync();
            return Results.Ok(pedido);
        });
    }
}
