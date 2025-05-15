public class ItemPedido
{
    public int Id { get; set; }
    public int SorveteId { get; set; }
    public int Quantidade { get; set; }
    public virtual Sorvete Sorvete { get; set; } = null!;
}
