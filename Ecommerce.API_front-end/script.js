const api = 'http://localhost:5017/api'; 

// Carrega os produtos ao iniciar
window.onload = () => {
  carregarProdutos();
  carregarCarrinho();
  atualizarQuantidadeCarrinho();
};

function adicionarCarrinho(id, nome, preco) {
  fetch(`${api}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      produtoId: id,
      NomeProduto: nome,
      preco: preco,
      quantidade: 1,
    })
  })  
  .then(response => {
    if (response.ok) {
      carregarCarrinho();  // Atualiza o carrinho após adicionar o item
      atualizarQuantidadeCarrinho();
      carregarProdutos();
    } else {
      alert("Erro ao adicionar item ao carrinho");
    }
  })
}

function removerItem(produtoId) {
  fetch(`${api}/cart/${produtoId}`, {
    method: "DELETE"
  })
    .then(res => {
      
      if (res.ok) 
      {
        carregarCarrinho();
        carregarProdutos();
        atualizarQuantidadeCarrinho();
      } 
      else 
      {
        alert("Erro ao remover item.");
      }
    });
}


function carregarCarrinho() {
  fetch(`${api}/cart`)
    .then(res => res.json())
    .then(data => {
      const div = document.getElementById('carrinho');
      if (div) {
        div.innerHTML = '';
        data.forEach(item => {
          const el = document.createElement('div');
          el.classList.add('carrinho-item');
          el.innerHTML = `
            <div class="info">
              <p class="nome">${item.nomeProduto}</p>
              <p class="preco">x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
            </div>
            <button class="remover" onclick="removerItem(${item.produtoId})">Remover</button>
          `;
          div.appendChild(el);
        });
      }
    });
}

let produtosOriginais = [];

function carregarProdutos() {
  fetch(`${api}/products`)
    .then(res => res.json())
    .then(produtos => {
      fetch(`${api}/cart`)
        .then(res => res.json())
        .then(carrinho => {
          renderizarProdutos(produtos, carrinho); // Passando o carrinho aqui
        });
    })
    .catch(error => console.error('Erro ao carregar produtos e carrinho:', error));
}



function renderizarProdutos(lista, carrinho) {
  const div = document.getElementById('produtos');
  div.innerHTML = '';

  const imagensProdutos = {
    "Camiseta Batman": "img/batman-tshirt.jpg",
    "Camiseta Preta": "img/black-tshirt.jpg",
    "Camiseta Azul": "img/blue-tshirt.jpg",
    "Tênis Esportivo": "img/tenis-esportivo.jpg",
    "Boné": "img/bone.jpg",
    "Mochila Tática": "img/mochila-tatica.jpg",
    "Relógio Digital": "img/relogio-digital.jpg",
    "Óculos de Sol": "img/oculos-sol.jpg",
    "Mochila Escolar": "img/mochila-escolar.jpg",
    "Camisa Social": "img/camisa-social.jpg",
    "Calça Jeans Masculina": "img/calca-masculina.jpg",
    "Calça Jeans Feminina": "img/calca-feminina.jpg",
    "Sandália Feminina": "img/sandalia-feminina.jpg",
    "Chinelo Masculino": "img/chinelo-masculino.jpg",
    "Cinto de Couro": "img/cinto-couro.jpg",
    "Carteira Masculina": "img/carteira.jpg",
    "Pulseira de Prata": "img/pulseira.jpg",
    "Vestido Floral": "img/vestido-floral.jpg",
    "Saia Jeans": "img/saia-jeans.jpg",
    "Meia Cano Alto": "img/meia-cano-alto.jpg"
  };

  lista.forEach(prod => {
    const el = document.createElement('div');
    el.classList.add('produto');
     
    const imagemUrl = imagensProdutos[prod.nome] || 'https://via.placeholder.com/220x180?text=Sem+Imagem';
    const estaNoCarrinho = carrinho.some(item => item.produtoId === prod.id); // Verifica se o produto está no carrinho

    el.innerHTML = `
      <img src="${imagemUrl}" alt="${prod.nome}" />
      <h3>${prod.nome}</h3>
      <p class="preco">R$ ${prod.preco.toFixed(2).replace('.', ',')}</p>
      <button onclick="adicionarCarrinho(${prod.id}, '${prod.nome}', ${prod.preco})">Adicionar</button>
      ${estaNoCarrinho ? `<button onclick="removerItem(${prod.id})">Remover</button>` : ''}
    `;
    div.appendChild(el);
  });
}


//Carrinho
function abrirCarrinho() {
  fetch(`${api}/cart`)
    .then(res => res.json())
    .then(carrinho => {
      if (!carrinho || carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }

      let texto = "Itens no carrinho:\n\n";
      carrinho.forEach(item => {
        texto += `${item.nomeProduto} - ${item.quantidade}x R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
      });

      alert(texto);
    })
    .catch(err => {
      console.error("Erro ao buscar carrinho:", err);
      alert("Não foi possível carregar o carrinho.");
    });
}


function filtrarProdutos() {
  const termo = document.getElementById('pesquisa').value.toLowerCase();
  const produtos = document.querySelectorAll('.produto');

  produtos.forEach(prod => {
    const nome = prod.querySelector('h3').textContent.toLowerCase();
    if (nome.includes(termo)) {
      prod.style.display = '';
    } else {
      prod.style.display = 'none';
    }
  });
}

function atualizarQuantidadeCarrinho() {
  fetch(`${api}/cart`)
    .then(res => res.json())
    .then(data => {
      const total = data.reduce((acc, item) => acc + item.quantidade, 0);
      document.getElementById('quantidade-carrinho').textContent = total;
    });
}

function verificarCarrinhoEMostrarBotao() {
  const botaoFinalizarCompra = document.getElementById('botao-finalizar-compra');
  const quantidadeCarrinho = document.getElementById('quantidade-carrinho');
  
  fetch(`${api}/cart`)
    .then(res => res.json())
    .then(data => {
      const total = data.reduce((acc, item) => acc + item.quantidade, 0);
      
      if (total > 0) {
        botaoFinalizarCompra.style.display = 'block';
        botaoFinalizarCompra.classList.add('botao-visivel');
      } else {
        botaoFinalizarCompra.style.display = 'none';
        botaoFinalizarCompra.classList.remove('botao-visivel');
      }
    });
}


const atualizarQuantidadeCarrinhoOriginal = window.atualizarQuantidadeCarrinho;

window.atualizarQuantidadeCarrinho = function() {
  if (typeof atualizarQuantidadeCarrinhoOriginal === 'function') {
    atualizarQuantidadeCarrinhoOriginal();
  } else {
    
    fetch(`${api}/cart`)
      .then(res => res.json())
      .then(data => {
        const total = data.reduce((acc, item) => acc + item.quantidade, 0);
        document.getElementById('quantidade-carrinho').textContent = total;
      });
  }
  verificarCarrinhoEMostrarBotao();
};


const adicionarCarrinhoOriginal = window.adicionarCarrinho;

window.adicionarCarrinho = function(id, nome, preco) {
  if (typeof adicionarCarrinhoOriginal === 'function') {
    adicionarCarrinhoOriginal(id, nome, preco);
    
    // verifica o carrinho após adicionar o item, delay foi colocado para garantir que a API processou 
    setTimeout(verificarCarrinhoEMostrarBotao, 300);
  }
};

const removerItemOriginal = window.removerItem;

window.removerItem = function(produtoId) {
  
  if (typeof removerItemOriginal === 'function') {
    removerItemOriginal(produtoId);
    
    // verifica o carrinho após remover o item, delay foi colocado para garantir que a API processou a remoção
    setTimeout(verificarCarrinhoEMostrarBotao, 300);
  }
};

// verifica o carrinho quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  verificarCarrinhoEMostrarBotao();
});

// verifica o carrinho logo após a janela carregar
window.addEventListener('load', function() {
  verificarCarrinhoEMostrarBotao();
});




//Pagamentos Stripe

function finalizarCompra() {
  fetch(`${api}/cart`)
  .then(res => res.json())
    .then(carrinho => {
      if (!carrinho || carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }

      const itensStripe = carrinho.map(item => ({
        nome: item.nomeProduto,
        quantidade: item.quantidade,
        preco: Math.round(item.preco * 100)
      }));
      
      // Envia o checkout para o back-end
      fetch(`${api}/pagamento/checkout-stripe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(itensStripe)
      })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Erro ao finalizar compra:", errorText);
          alert("Erro no checkout Stripe.");
          return;
        }
       
        const data = await res.json();
        window.location.href = data.url;
        console.log("resposta checkout:", data)
      }) //Usado para facilitar o entendimento dos erros
      .catch(err => {
        console.error("Erro no checkout Stripe:", err);
        alert("Erro ao finalizar a compra.");
      });
    });
}

// LIMPAR CARRINHO
function limparCarrinho() {
  fetch(`${api}/cart/limpar`, { method: "DELETE" })
    .then(() => carregarCarrinho());
}





