public class Cupom
{
    public int Id { get; set; }
    public required string Codigo { get; set; }
    public decimal DescontoPercentual { get; set; }
    public DateTime ValidoAte { get; set; }
}
