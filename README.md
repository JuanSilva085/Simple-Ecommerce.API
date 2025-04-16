# 🛒 Loja Virtual - Front-end + Back-end C# + Integração com Stripe

Um projeto de um ecommerce simples com front-end em HTML/CSS/JS, back-end em ASP.NET Core (C#) e integração com a API do Stripe para simular pagamentos. 

# ✨ Funcionalidades
🖥️ Front-end                                                                                                                                                                                

✅ Listagem de produtos com imagens e preços

✅ Adição e remoção de itens ao carrinho

✅ Atualização dinâmica do carrinho (inclusive o número de itens no menu)

✅ Condicional para exibir o botão "Remover" apenas para itens já adicionados

<hr>

🧠 Back-end (C#)                                                                                                                                                                            

✅ API REST construída em ASP.NET Core

✅ Endpoints para listagem de produtos, carrinho e operações de adicionar/remover

✅ Integração com a API da Stripe para simular uma cobrança real com cartão de crédito

<hr>

# 🛠️ Tecnologias Utilizadas

Front-end

<div style="display: flex; gap: 50px; align-items: center; margin-bottom: 40px;">
  <img width="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
  <img width="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
  <img width="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
</div>


Back-end

<div style="display: flex; gap: 50px; align-items: center;">
  <img width="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg" />
  <img width="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" />
  <img width="50px" src="https://dfdmyvckxgqn5.cloudfront.net/_app/immutable/assets/building-elegant-rest-apis.d8f4cbc6.jpg" />
  <img width="50px" src="https://i.ytimg.com/vi/BTG6EmDrdqs/maxresdefault.jpg" />
</div>

<hr>

# 💳 Pagamento com Stripe

A API da Stripe foi integrada ao back-end para:

Simular pagamentos reais

Gerar sessões de checkout

Utilizar Webhooks (se configurado)

Gerenciar chaves de API de teste

### 🔐 As chaves são armazenadas em appsettings.json (modo seguro em produção com secrets/env).

<hr>

# 🚀 Como Rodar o Projeto

1. Back-end (C#)
- cd Ecommerce.API
- dotnet restore
- dotnet run

2. Front-end
Basta abrir index.html no seu navegador.

Certifique-se de que o front está configurado para consumir os endpoints corretos.

3. Pagamento com Stripe
Crie uma conta no Stripe

Pegue suas chaves de teste (pública e secreta)

Configure no seu appsettings.json:
"Stripe": {
  "SecretKey": "chave_secreta",
  "PublishableKey": "chave_publica"
}

<hr>

📸 Projeto




