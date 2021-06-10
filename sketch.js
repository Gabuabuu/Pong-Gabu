//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2 ;

//variáveis da velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raquetecomprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585 ;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//placar jogo
let meusPontos = 0
let pontosOponente = 0

let colidiu = false;

//sons jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup(){
    createCanvas(600, 400);
  trilha.loop();
}

 function draw() {
    background(0)
   mostraBolinha ();
   //movimentoBolinha();
   movimentaBolinha();
   verificaColisaoBorda();
   mostraRaquete(xRaquete, yRaquete);
   movimentaMinhaRaquete();
   //verificaColisaoRaquete();
   verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaqueteOponente(xRaqueteOponente,yRaqueteOponente); 
   movimentaRaqueteOponente();
  verificacolisaoRaquete(xRaqueteOponente, yRaqueteOponente);
   incluiplacar();
   marcaPonto();

function mostraBolinha(){ circle(xBolinha, yBolinha,diametro);                          
}

function movimentaBolinha (){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}
   
   function verificaColisaoBorda(){
      if (xBolinha + raio > width ||
      xBolinha - raio <0){
     velocidadeXBolinha *= -1;
   }
   if(yBolinha  + raio> height || yBolinha - raio <0){
    velocidadeYBolinha *= -1
   }
 }
  }

//função raquete   
   function mostraRaquete(x,y){
     rect(x, y, raquetecomprimento, raqueteAltura);
} 

//função raquete oponente
function mostraRaqueteOponente(){
     rect(xRaqueteOponente, yRaqueteOponente, raquetecomprimento, raqueteAltura);
   } 


   function movimentaMinhaRaquete(){
     if(keyIsDown(UP_ARROW)){
       yRaquete -= 10;
     }
   if (keyIsDown(DOWN_ARROW)){
     yRaquete += 10;
   }
   }


function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raquetecomprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificacolisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raquetecomprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
    }
}



function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raquetecomprimento /2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function incluiplacar (){
  stroke(255)
  textAlign (CENTER);
  textSize (16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);

  text(pontosOponente, 470, 26);
  
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}