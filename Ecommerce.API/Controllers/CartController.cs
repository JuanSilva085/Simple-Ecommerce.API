using Ecommerce.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CartController : Controller
{
    private static List<CarrinhoItem> Carrinho = new();

    [HttpGet]
    public IActionResult GetCarrinho()
    {
        return Ok(Carrinho);
    }

    [HttpPost]
    public IActionResult AdicionarProduto([FromBody] CarrinhoItem item)
    {
        var produtoExistente = Carrinho.FirstOrDefault(p => p.ProdutoId == item.ProdutoId);
        if(produtoExistente != null)
        {
            produtoExistente.Quantidade += item.Quantidade;
        }
        else
        {
            Carrinho.Add(item);
        }
        return Ok(Carrinho);
    }

    [HttpDelete("{produtoId}")]
    public IActionResult RemoverDoCarrinho([FromRoute(Name = "produtoId")] int ProdutoId)
    {
        var item = Carrinho.FirstOrDefault(p => p.ProdutoId == ProdutoId);
        if(item != null) 
        { 
          Carrinho.Remove(item);
        }
        return Ok(Carrinho);
    }

    [HttpDelete("limpar")]
    public IActionResult LimparCarrinho()
    {
        Carrinho.Clear();
        return Ok(Carrinho);
    }
}
