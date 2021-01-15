

let posisX = 640;
let posisY = 500;
let posBala;
let tiro = false;

let c =  document.getElementById('canvas');
let ctx = c.getContext("2d");

function andar(tecla){
    if(tiro){
        new bala(true);
        tiro = false;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle='red';
    ctx.fillRect(posisX, posisY, 50, 50);

    if(tecla == 32)tiro = true;
    if(tecla == 37)posisX-=10;
    if(tecla== 39)posisX+=10;

    if(tecla == 38)posisY-=10;
    if(tecla == 40)posisY+=10;


    setTimeout('andar()', '5');
}


function bala(){

    ctx.fillStyle = 'blue';
    if(tiro){
        posBala = [posisX,posisY];
        ctx.fillRect(posisX, posisY, 5, 5);
    }else{
        ctx.fillRect(posBala[0] + 25, posBala[1] + 15, 10, 10);
        posBala[1] -= 7;
    }
    setTimeout('bala()', '5');
}

andar();

