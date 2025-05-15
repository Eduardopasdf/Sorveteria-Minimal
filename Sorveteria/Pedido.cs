using System.Text.Json.Serialization;

public class Pedido
{
    public int Id { get; set; }
    public required List<ItemPedido> Itens { get; set; }
    public decimal Total { get; set; }
    public required string MetodoPagamento { get; set; }
    public required string QRCodeUrl { get; set; }
    [JsonPropertyName("cancelado")]
    public bool Cancelado { get; set; } = false;
    public DateTime DataHora { get; set; }
}
