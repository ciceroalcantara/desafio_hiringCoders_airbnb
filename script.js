const apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
const cardsCounteudo = document.querySelector("#cards");
const paginacaoContainer = document.querySelector("#paginacao");
let data = [];

//Buscar os dados da API json
async function buscarCards() {
  let resposta = await fetch(apiUrl);
  const dataResposta = await resposta.json();
  return dataResposta;
}

// Cria o card
function renderCard(card) {
  var div = document.createElement("div");
  div.className = "itemCard";
  div.innerHTML = `
  <img src="${card.photo}" class="card-image" alt="" />
      <p>${card.property_type}</p>
      <p> ${card.name}</p>
      R$ ${card.price},00
  `;
  cardsCounteudo.appendChild(div);
}

// Gera os cards
function gerarCards(cards) {
  cardsCounteudo.innerHTML = "";
  cards.map(renderCard);
}

// Funcao que executa tudo
async function main() {
  data = await buscarCards();
  if (data[0]) {
    gerarCards(data);
  }
}

main();

// Filtro pelo tipo da acomodação
function filtraTipo(tipoLugar) {
  let dadosFiltrados = []
  if(tipoLugar === 'Todos') {
      dadosFiltrados =  data;   
  }else {
      dadosFiltrados = data.filter(function(item) {
          return item.property_type === tipoLugar;
      });
  }
  gerarCards(dadosFiltrados);
}