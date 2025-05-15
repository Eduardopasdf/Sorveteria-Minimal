public class PedidoDTO
{
    public int Id { get; set; }
    public List<ItemPedidoDTO> Itens { get; set; } = new List<ItemPedidoDTO>();
    public decimal Total { get; set; }
    public string MetodoPagamento { get; set; } = string.Empty;
    public string QRCodeUrl { get; set; } = string.Empty;
    public bool Cancelado { get; set; }
    public DateTime DataHora { get; set; }
}

public class ItemPedidoDTO
{
    public int Id { get; set; }
    public int SorveteId { get; set; }
    public int Quantidade { get; set; }
    public string Nome { get; set; } = string.Empty;
    public decimal Preco { get; set; }
    public string ImagemUrl { get; set; } = string.Empty;
}
