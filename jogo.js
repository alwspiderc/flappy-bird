// Criando referência de imagem
const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

// Plano de fundo
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = "#70c5ce";
    contexto.fillRect(0, 0, canvas.width, canvas.height);
    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY, // Sprite X, Sprite Y
      planoDeFundo.largura,
      planoDeFundo.altura, // Tamanho do recorte na sprite
      planoDeFundo.x,
      planoDeFundo.y, // Onde o Sprite será desenhado na tela
      planoDeFundo.largura,
      planoDeFundo.altura // Tamanho do Sprite
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY, // Sprite X, Sprite Y
      planoDeFundo.largura,
      planoDeFundo.altura, // Tamanho do recorte na sprite
      planoDeFundo.x + planoDeFundo.largura,
      planoDeFundo.y, // Onde o Sprite será desenhado na tela
      planoDeFundo.largura,
      planoDeFundo.altura // Tamanho do Sprite
    );
  },
};

// Chão
const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,

  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX,
      chao.spriteY, // Sprite X, Sprite Y
      chao.largura,
      chao.altura, // Tamanho do recorte na sprite
      chao.x,
      chao.y, // Onde o Sprite será desenhado na tela
      chao.largura,
      chao.altura // Tamanho do Sprite
    );

    contexto.drawImage(
      sprites,
      chao.spriteX,
      chao.spriteY, // Sprite X, Sprite Y
      chao.largura,
      chao.altura, // Tamanho do recorte na sprite
      chao.x + chao.largura,
      chao.y, // Onde o Sprite será desenhado na tela
      chao.largura,
      chao.altura // Tamanho do Sprite
    );
  },
};

// Flappy Bird
const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  gravidade: 0.25,
  velocidade: 0,
  /*  Lógica para queda do passarinho:
      o passarinho vai cair mais rápido conforma a gravidade para puxando.
      a soma da velocidade será a soma da velocidade atual mais a gravidade para, o eixo y será o total da velocidade mais o eixo y.
  */
  atualiza() {
    flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    console.log(flappyBird.velocidade);
    flappyBird.y = flappyBird.y + flappyBird.velocidade;
  },

  desenha() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX,
      flappyBird.spriteY, // Sprite X, Sprite Y
      flappyBird.largura,
      flappyBird.altura, // Tamanho do recorte na sprite
      flappyBird.x,
      flappyBird.y, // Onde o Sprite será desenhado na tela
      flappyBird.largura,
      flappyBird.altura // Tamanho do Sprite
    );
  },
};

function loop() {
  flappyBird.atualiza();
  planoDeFundo.desenha();
  chao.desenha();
  flappyBird.desenha();

  requestAnimationFrame(loop);
}

loop();
