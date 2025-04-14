using System.Text.Json.Serialization;

namespace Ecommerce.API.Models;

public class CarrinhoItem
{
    //[JsonpropertyName] para garantir que a API reconheça

    [JsonPropertyName("produtoId")]
    public int ProdutoId { get; set; }

    [JsonPropertyName("nomeProduto")]
    public string NomeProduto { get; set; }
    
    [JsonPropertyName("preco")]
    public decimal Preco {  get; set; }
    
    [JsonPropertyName("quantidade")]
    public int Quantidade { get; set; }
}
