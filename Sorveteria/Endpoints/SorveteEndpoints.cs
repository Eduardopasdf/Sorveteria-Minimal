using Microsoft.EntityFrameworkCore;

public static class SorveteEndpoints
{
    public static void MapSorveteEndpoints(this WebApplication app)
    {
        app.MapGet("/sorvetes", async (AppDbContext db) =>
            await db.Sorvetes.ToListAsync());

        app.MapGet("/sorvetes/{id}", async (int id, AppDbContext db) =>
            await db.Sorvetes.FindAsync(id) is Sorvete s ? Results.Ok(s) : Results.NotFound());

        app.MapPost("/sorvetes", async (Sorvete sorvete, AppDbContext db) =>
        {
            db.Sorvetes.Add(sorvete);
            await db.SaveChangesAsync();
            return Results.Created($"/sorvetes/{sorvete.Id}", sorvete);
        });

        app.MapPut("/sorvetes/{id}", async (int id, Sorvete input, AppDbContext db) =>
        {
            var s = await db.Sorvetes.FindAsync(id);
            if (s is null) return Results.NotFound();

            s.Nome = input.Nome;
            s.Descricao = input.Descricao;
            s.Preco = input.Preco;
            s.ImagemUrl = input.ImagemUrl;

            await db.SaveChangesAsync();
            return Results.Ok(s);
        });

        app.MapDelete("/sorvetes/{id}", async (int id, AppDbContext db) =>
        {
            var s = await db.Sorvetes.FindAsync(id);
            if (s is null) return Results.NotFound();

            db.Sorvetes.Remove(s);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}
