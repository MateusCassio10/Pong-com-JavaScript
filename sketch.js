// variáveis da bola
let xBolinha =300; 
let yBolinha = 200; 
let diametro = 18; 
let raio = diametro / 2;

// velocidade
let velocidadex = 6; 
let velocidadey = 6; 

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;
// variáveis da raquete do oponente
let xRaqueteOponente = 583;
let yRaqueteOponente = 150;
let velocidadeYoponente;

let colidiu = false;

// placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
    trilha.loop();

}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
 //verificaColisaoRaquete();
  verificaColisaoRaquetes(xRaquete, yRaquete);
  verificaColisaoRaquetes(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro)
}

 function movimentaBolinha(){
  xBolinha += velocidadex; 
  yBolinha += velocidadey; 
 }

function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0) 
  { // || = or
    velocidadex *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0)
  {
    velocidadey *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x,y, comprimentoRaquete, alturaRaquete);
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW))
  {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW))
  {
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente(){
  velocidadeYoponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 86.5;
  yRaqueteOponente += velocidadeYoponente
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete) 
  { 
    velocidadex *= -1;
    raquetada.play();
  }
  
}

function verificaColisaoRaquetes(x, y){
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu)
  {
    velocidadex *= -1;
    raquetada.play();
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(200, 10, 40, 20);
  fill(255);
  text(meusPontos, 220, 26);
  fill(color(255, 140, 0));
  rect(380, 10, 40, 20);
  fill(255);
  text(pontosOponente, 400, 26);
}

function marcaPonto(){
  if (xBolinha > 590) 
  {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10)
  {
    pontosOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0)
    {
    xBolinha = 23
    }
}
