//Definindo o tamanho do jogo (altura e largura da tela)
let altura = 0;
let largura = 0;
let vidas = 1;
let tempo = 10

let criaMosquitoTempo = 1500

//Recuperando o nível do jogo
let nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'normal') {
  criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
  criaMosquitoTempo = 1000
} else {
  criaMosquitoTempo = 750
}

ajustaTamanhoPalcoJogo = () => {
  altura = window.innerHeight;
  largura = window.innerWidth;

  console.log(altura, largura);
};

ajustaTamanhoPalcoJogo();

let cronometro = setInterval(() => {
  tempo--
  if (tempo < 0) {
    clearInterval(cronometro)
    clearInterval(criaMosquito)
    window.location.href = 'vitoria.html'
    
  } else {
    document.getElementById('cronometro').innerHTML = tempo
  
  }
}, 1000)

tamanhoAleatorio = () => {
  let classe = Math.floor(Math.random() * 3);

  switch (classe) {
    case 0:
      return "mosquito1";
    case 1:
      return "mosquito2";
    case 2:
      return "mosquito3";
  }
};

ladoAleatorio = () => {
  let classe = Math.floor(Math.random() * 2);

  switch (classe) {
    case 0:
      return "ladoA";
    case 1:
      return "ladoB";
  }
};

posicaoRandomica = () => {
  //Remover o mosquito anterior (caso exista)
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();

    if (vidas > 3) {
      window.location.href = 'fim-de-jogo.html'

    } else {
      document.getElementById("v" + vidas).src = "imagens/coracao_vazio.png";
      vidas++;
    }
  }

  let posicaoX = Math.floor(Math.random() * largura) - 90;
  let posicaoY = Math.floor(Math.random() * altura) - 90;

  posicaoX = posicaoX < 0 ? 0 : posicaoX;
  posicaoY = posicaoY < 0 ? 0 : posicaoY;

  //Criando o elemento HTML (imagem do mosquito)
  let mosquito = document.createElement("img");

  //adicionando o mosquito na tela
  mosquito.src = "imagens/mosca.png";
  mosquito.classList.add(tamanhoAleatorio());
  mosquito.classList.add(ladoAleatorio());
  mosquito.style.left = posicaoX + "px";
  mosquito.style.top = posicaoY + "px";
  mosquito.id = "mosquito";
  mosquito.onclick = () => {
    mosquito.remove();
  };

  document.body.appendChild(mosquito);

  tamanhoAleatorio();
};

//Criando o ciclo de tempo para aparecer o mosquito na tela
let criaMosquito = setInterval(() => {
  posicaoRandomica();
}, criaMosquitoTempo);


//Função para iniciar o jogo
iniciarJogo = () => {
  let nivel = document.getElementById('nivel').value

  if (nivel === '') {
    alert('Selecione o nível do jogo para iniciar')
    return false //Para encerrar a função
  } 
  
  window.location.href = 'app.html?' + nivel

}
