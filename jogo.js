let frames = 0;

// Criando referência do som HIT
const som_HIT = new Audio();
som_HIT.src = "./assets/efeitos/hit.wav";

// Criando referência de imagem
const sprites = new Image();
sprites.src = "./assets/img/sprites.png";

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
function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    // Lógica para repetir infinitamente o chão
    atualiza() {
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoDoChao;
      chao.x = movimentacao % repeteEm;
    },

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

  return chao;
}

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if (flappyBirdY >= chaoY) {
    return true;
  }
  return false;
}

// Flappy Bird
function criaFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      console.log("[ANTES:] " + flappyBird.velocidade);
      flappyBird.velocidade = -flappyBird.pulo;
      console.log("[DEPOIS:] " + flappyBird.velocidade);
    },
    gravidade: 0.25,
    velocidade: 0,

    /*  Lógica para queda do passarinho:
        o passarinho vai cair mais rápido conforma a gravidade para puxando.
        a soma da velocidade será a soma da velocidade atual mais a gravidade para, o eixo y será o total da velocidade mais o eixo y.
    */
    atualiza() {
      if (fazColisao(flappyBird, chao)) {
        som_HIT.play();

        setTimeout(() => {
          mudaParaTela(telas.INICIO);
        }, 500);

        console.log("teste");
        return;
      }
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      // console.log(flappyBird.velocidade);
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

    movimentos: [
      { spriteX: 0, spriteY: 0 }, // asa cima
      { spriteX: 0, spriteY: 26 }, // asa meio
      { spriteX: 0, spriteY: 52 }, // asa baixo
    ],

    frameAtual: 0,
    atualizaOFramaAtual() {
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo){
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao;
      }

    },

    desenha() {
      flappyBird.atualizaOFramaAtual();
      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

      contexto.drawImage(
        sprites,
        spriteX,
        spriteY, // Sprite X, Sprite Y
        flappyBird.largura,
        flappyBird.altura, // Tamanho do recorte na sprite
        flappyBird.x,
        flappyBird.y, // Onde o Sprite será desenhado na tela
        flappyBird.largura,
        flappyBird.altura // Tamanho do Sprite
      );
    },
  };

  return flappyBird;
}

// Mensagem inicial
const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX,
      mensagemGetReady.sY,
      mensagemGetReady.w,
      mensagemGetReady.h,
      mensagemGetReady.x,
      mensagemGetReady.y,
      mensagemGetReady.w,
      mensagemGetReady.h
    );
  },
};

const globais = {};
// Telas do jogo
let telaAtiva = {};

function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
    },

    desenha() {
      planoDeFundo.desenha();
      globais.chao.desenha();
      globais.flappyBird.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudaParaTela(telas.JOGO);
    },
    atualiza() {
      globais.chao.atualiza();
    },
  },
};

telas.JOGO = {
  desenha() {
    planoDeFundo.desenha();
    globais.chao.desenha();
    globais.flappyBird.desenha();
  },
  click() {
    globais.flappyBird.pula();
  },

  atualiza() {
    globais.flappyBird.atualiza();
  },
};

function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
  if (telaAtiva.click) {
    //  console.log(telaAtiva)
    telaAtiva.click();
  }
});

mudaParaTela(telas.INICIO);
//console.log(telaAtiva);
loop();
