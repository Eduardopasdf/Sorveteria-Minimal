using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sorveteria.Migrations
{
    /// <inheritdoc />
    public partial class AddDataHoraToPedido : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataHora",
                table: "Pedidos",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_ItensPedido_SorveteId",
                table: "ItensPedido",
                column: "SorveteId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItensPedido_Sorvetes_SorveteId",
                table: "ItensPedido",
                column: "SorveteId",
                principalTable: "Sorvetes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItensPedido_Sorvetes_SorveteId",
                table: "ItensPedido");

            migrationBuilder.DropIndex(
                name: "IX_ItensPedido_SorveteId",
                table: "ItensPedido");

            migrationBuilder.DropColumn(
                name: "DataHora",
                table: "Pedidos");
        }
    }
}
