using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sorveteria.Migrations
{
    /// <inheritdoc />
    public partial class AddCanceladoToPedido : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Cancelado",
                table: "Pedidos",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cancelado",
                table: "Pedidos");
        }
    }
}
