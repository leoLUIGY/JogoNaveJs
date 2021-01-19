

let posisX = 640;
let posisY = 500;
let posBala;
let posCom;
let tiro = false;
let newCometa = false;
let gameActive = true;


let c =  document.getElementById('canvas');

let ctx = c.getContext("2d");

let imgMet = 'Meteoro.jpeg';
let imgNav = 'frente.jpeg';
let imgFun = 'bkground.jpeg';
let navObj = new Image();
let metObj = new Image();
let funObj = new Image();
navObj.src = imgNav;
metObj.src = imgMet;
funObj.src = imgFun;
function andar(tecla){
    if(tiro){
        new bala();
        tiro = false;
    }

    ctx.drawImage(navObj, posisX, posisY,80, 80);

    if(tecla == 32 && tiro == false)tiro = true;
    if(tecla == 37)posisX-=10;
    if(tecla== 39)posisX+=10;

    if(tecla == 38)posisY-=10;
    if(tecla == 40)posisY+=10;

}
function cometas(){
   
    if(newCometa == true){
        posCom = [Math.floor(Math.random() * 1000),0];
    } else{
        posCom[1] += 2;
    }
    if((posCom[0]+25 >= posisX+10 && posCom[0]+25<=posisX + 70)&&(posCom[1]>=posisY + 5)){
        gameActive = false;
    }
    
    ctx.drawImage(metObj,posCom[0], posCom[1], 50, 50);
    setTimeout('cometas()', '2');
}
function ativarCometa(){
    if(gameActive){
        newCometa =true;
        if(newCometa){
            new cometas();
            newCometa = false;
        }
        setTimeout('ativarCometa()', '1500');
    }
}


function bala(){

    ctx.fillStyle = 'blue';
    if(tiro){
        posBala = [posisX,posisY];
        ctx.fillRect(posisX + 25, posisY, 5, 5);
    }else{
        ctx.fillRect(posBala[0] , posBala[1], 10, 10);
        posBala[1] -= 4;
    }
    setTimeout('bala()', '2');
}
function Game(){
    if(gameActive){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(funObj, 0, 0);
    andar();

    setTimeout('Game()', '2');
    } 
}
ativarCometa();
Game();


