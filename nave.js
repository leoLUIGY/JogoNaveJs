

let posisX = 640;
let posisY = 500;
let posBala;
let posCom;
let tiro = false;
let newCometa = false;

let c =  document.getElementById('canvas');

let ctx = c.getContext("2d");


function andar(tecla){
    if(tiro){
        new bala();
        tiro = false;
    }
    ctx.fillStyle='red';
    ctx.fillRect(posisX, posisY, 50, 50);

    if(tecla == 32 && tiro == false)tiro = true;
    if(tecla == 37)posisX-=10;
    if(tecla== 39)posisX+=10;

    if(tecla == 38)posisY-=10;
    if(tecla == 40)posisY+=10;

}
function cometas(){
    ctx.fillStyle='black';
    if(newCometa == true){
        posCom = [Math.floor(Math.random() * 1000),0];
        ctx.fillRect(posCom[0], posCom[1], 50, 50);
    } else{
        ctx.fillRect(posCom[0], posCom[1], 50, 50);
        posCom[1] += 2;
    }
    setTimeout('cometas()', '2');
}
function ativarCometa(){
    newCometa =true;
    if(newCometa){
        new cometas();
        newCometa = false;
    }
    setTimeout('ativarCometa()', '1500');
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    andar();

    setTimeout('Game()', '2');
}
ativarCometa();
Game();


