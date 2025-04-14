using Microsoft.AspNetCore.Mvc;
using Ecommerce.API.Models;

namespace Ecommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ProductsController : Controller
{
    [HttpGet]
    public IActionResult Get()
    {
        var produtos = new List<Product>()
        {
            new Product { Id = 1, Nome = "Camiseta Batman", Descricao = "100% Algodão", Preco = 35.90m, Estoque = 15},
            new Product { Id = 2, Nome = "Camiseta Preta", Descricao = "Poliester", Preco = 25.75m, Estoque= 10 },
            new Product { Id = 3, Nome = "Camiseta Azul", Descricao = "Algodão 30.1", Preco = 20.45m, Estoque = 12 },
            new Product { Id = 4, Nome = "Tênis Esportivo", Descricao = "Leve e confortável", Preco = 249.90M, Estoque = 5 },
            new Product { Id = 5, Nome = "Boné", Descricao = "Estilo urbano", Preco = 39.90M, Estoque = 20 },
            new Product { Id = 6, Nome = "Mochila Tática", Descricao = "Resistente e espaçosa", Preco = 189.99M, Estoque = 8 },
            new Product { Id = 8, Nome = "Relógio Digital", Descricao = "À prova d'água", Preco = 149.00M, Estoque = 13 },
            new Product { Id = 10, Nome = "Mochila Escolar", Descricao = "Espaçosa e resistente", Preco = 89.90m, Estoque = 14 },
            new Product { Id = 11, Nome = "Óculos de Sol", Descricao = "Proteção UV 400", Preco = 55.00m, Estoque = 18 },
            new Product { Id = 12, Nome = "Camisa Social", Descricao = "Ideal para ambientes formais", Preco = 64.90m, Estoque = 9 },
            new Product { Id = 13, Nome = "Calça Jeans Masculina", Descricao = "Masculina", Preco = 99.99m, Estoque = 13 },
            new Product { Id = 14, Nome = "Calça Jeans Feminina", Descricao = "Feminina", Preco = 109.99m, Estoque = 13 },
            new Product { Id = 15, Nome = "Sandália Feminina", Descricao = "Estilo e conforto para o dia a dia", Preco = 59.90m, Estoque = 17 },
            new Product { Id = 16, Nome = "Chinelo Masculino", Descricao = "Confortável e durável", Preco = 29.90m, Estoque = 25 },
            new Product { Id = 17, Nome = "Cinto de Couro", Descricao = "Tamanho ajustável", Preco = 45.00m, Estoque = 20 },
            new Product { Id = 18, Nome = "Carteira Masculina", Descricao = "Feita em couro legítimo", Preco = 70.00m, Estoque = 6 },
            new Product { Id = 19, Nome = "Pulseira de Prata", Descricao = "Acessório moderno e elegante", Preco = 110.00m, Estoque = 4 },
            new Product { Id = 20, Nome = "Vestido Floral", Descricao = "Leve e fresco, ideal para o verão", Preco = 89.90m, Estoque = 10 },
            new Product { Id = 21, Nome = "Saia Jeans", Descricao = "Moderna e versátil", Preco = 55.00m, Estoque = 8 },
            new Product { Id = 22, Nome = "Meia Cano Alto", Descricao = "Pacote com 3 pares", Preco = 19.90m, Estoque = 40 },

        };
        return Ok(produtos);
    }
}
