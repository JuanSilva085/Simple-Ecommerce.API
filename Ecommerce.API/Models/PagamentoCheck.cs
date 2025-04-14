using System.Collections.Generic;
using Ecommerce.API.Controllers;

namespace Ecommerce.API.Models;

public class PagamentoCheck
{
    public List<CarrinhoItem> Itens { get; set; } = new();
    public decimal ValorTotal {  get; set; } 
}
