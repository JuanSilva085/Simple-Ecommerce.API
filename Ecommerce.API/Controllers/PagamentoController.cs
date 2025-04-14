using Microsoft.AspNetCore.Mvc;
using Ecommerce.API.Models;
using Stripe.BillingPortal;
using Stripe.Checkout;
using Stripe;


namespace Ecommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PagamentoController : ControllerBase
{
    //Construtor que injeta a configuração da aplicação para acessar chaves de API e outras configurações
    private readonly IConfiguration _configuration;
    public PagamentoController(IConfiguration configuration)
    {
        _configuration = configuration;
    }



    //um Endpoint de checkout interno(mock), mas sem integração com gateway de pagamento real
    [HttpPost("checkout")]
    public IActionResult Checkout([FromBody] PagamentoCheck check)
    {
        if (check.Itens == null || check.Itens.Count == 0)
        {
            return BadRequest("O carrinho está vazio.");
        }

        var OrderId = new Random().Next(1000, 9999);
        return Ok(new { message = "O pagamento foi realizado com sucesso", OrderId });

    }


    //STRIPE
    [HttpPost("checkout-stripe")]
    public async Task<IActionResult> CheckoutStripe([FromBody] List<ProdutoCheckout> itens)
    {

        try
        {
            // Validação para garantir que existem itens para processar
            if (itens == null || !itens.Any())
            {
                return BadRequest("Carrinho vazio");
            }

            // Acontece a Obtenção da chave da API a partir da configuração segura
            var stripeApiKey = _configuration["Stripe:SecretKey"];
            if (string.IsNullOrEmpty(stripeApiKey))
            {
                return StatusCode(500, "Ocorreu um erro no serviço de pagamento.");
            }

            StripeConfiguration.ApiKey = stripeApiKey;

            var options = new Stripe.Checkout.SessionCreateOptions   // Criação da sessão de checkout do Stripe com todas as opções necessárias
            {
                PaymentMethodTypes = new List<string> { "card" },
                Mode = "payment",
                SuccessUrl = "https://localhost:7225/sucess.html",
                CancelUrl = "https://localhost:7225/cancel.html",
                LineItems = itens.Select(item => new SessionLineItemOptions
                {
                    Quantity = item.Quantidade,
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "brl",
                        UnitAmount = item.Preco,
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = item.Nome,
                        }
                    }
                }).ToList()
            };

            var service = new Stripe.Checkout.SessionService();  //Criação do serviço de sessão do Stripe para processar a requisição
            Stripe.Checkout.Session session = await service.CreateAsync(options); //Chamada assíncrona à API do Stripe para criar a sessão de checkout
            return Ok(new { url = session.Url }); // Retorna a URL de checkout para o cliente ser redirecionado
        }
        catch (StripeException ex)
        {   
            //Tratamento específico para erros do Stripe(cartão, etc.)
            return StatusCode(400, new { error = ex.Message });
        }
        catch (Exception ex)
        {
            // Tratamento genérico caso aconteça algum outro tipo de erro
            return StatusCode(500, new { error = "Erro interno ao processar o pagamento" });
        }
    }
}

