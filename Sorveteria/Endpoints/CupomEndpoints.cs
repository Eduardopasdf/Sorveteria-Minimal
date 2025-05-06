using Microsoft.EntityFrameworkCore;

public static class CupomEndpoints
{
    public static void MapCupomEndpoints(this WebApplication app)
    {
        app.MapGet("/cupons", async (AppDbContext db) =>
            await db.Cupons.ToListAsync());

        app.MapGet("/cupons/{codigo}", async (string codigo, AppDbContext db) =>
            await db.Cupons.FirstOrDefaultAsync(c => c.Codigo == codigo) is Cupom c ? Results.Ok(c) : Results.NotFound());

        app.MapPost("/cupons", async (Cupom cupom, AppDbContext db) =>
        {
            db.Cupons.Add(cupom);
            await db.SaveChangesAsync();
            return Results.Created($"/cupons/{cupom.Id}", cupom);
        });

        app.MapDelete("/cupons/{id}", async (int id, AppDbContext db) =>
        {
            var c = await db.Cupons.FindAsync(id);
            if (c is null) return Results.NotFound();

            db.Cupons.Remove(c);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}
