import {screenScale, ctx, jogo} from './Core.js'; 
import {cometaObj, cometas, sound} from './Cometas.js';  


export let balaPontos = 0;
//===============VARIAVEIS IMAGE NAME===========================
let imgBala = 'Images/Meteoro.png';
let imgEnemyBala = 'Images/Meteoro.png';


//===============VARIAVEIS IMAGE INSTANCE===========================
let balaObj = new Image();
let balaEnemyObj = new Image();

//===============VARIAVEIS ARRAYS OBJETOS==========================
export let municaoObj = [];
export let municaoEnemyObj = [];
//===============VARIAVEIS IMAGENS SRC===========================
balaObj.src = imgBala;
balaEnemyObj.src = imgEnemyBala;

//===============OBJETO BALA/MUNIÇÃO===========================
export function bala(x, y, touch){
    this.x = x;
    this.y = y;
    this.touch = touch;
    
}

export function balaEnemy(x, y){
    this.x = x;
    this.y = y;

    
}

//===============UPDATE BALA PROPERTIES===========================
bala.prototype.update = function(){
    
for(let j = 0; j<cometaObj.length; j++){
    if((this.x >= cometaObj[j].x+ 5 && this.x<=cometaObj[j].x+ cometaObj[j].scale)&&(this.y>=cometaObj[j].y && this.y<=cometaObj[j].y + cometaObj[j].scale)){
        this.touch = true;
        if(cometaObj[j].changed){
            let com = new cometas(cometaObj[j].x, cometaObj[j].y, Math.floor(Math.random() * 5)+2,Math.floor(Math.random() * 4)-2, cometaObj[j].scale/2, false,false);
            let com2 = new cometas(cometaObj[j].x, cometaObj[j].y, Math.floor(Math.random() * 5)+2,Math.floor(Math.random() * 4)-2, cometaObj[j].scale/2, false, false);
            cometaObj.push(com);
            cometaObj.push(com2);
        }
        sound();
        cometaObj.splice(cometaObj.indexOf(cometaObj[j]), 1);
        balaPontos++;
    }
}


ctx.drawImage(balaObj,this.x ,this.y, 10, 10);
this.y -= 5;
}
export function balaPointNav(){
    balaPontos+=3;
}
balaEnemy.prototype.update = function(){
    
    if((this.x >= jogo.x+ 5 && this.x<=jogo.x+ jogo.scaleX)&&(this.y>=jogo.y && this.y<=jogo.y + jogo.scaleY)){
        jogo.life-=50;
        municaoEnemyObj.splice(municaoEnemyObj.indexOf(this), 1);
        return;
    }
    ctx.drawImage(balaEnemyObj,this.x ,this.y, 10, 10);
    this.y += 5;
}

export function updateShoots(){
    municaoObj.forEach((municao)=>{
        municao.update();
        if(municao.y <= 0 || municao.touch == true){
            municaoObj.splice(municaoObj.indexOf(municao),1);
        }
    });

    municaoEnemyObj.forEach((municaoEnemy)=>{
        municaoEnemy.update();
        if(municaoEnemy.y >= screenScale[1] ){
            municaoEnemyObj.splice(municaoEnemyObj.indexOf(municaoEnemy),1);
        }
    });
}
export function restartAllP(){
    balaPontos = 0;
}

