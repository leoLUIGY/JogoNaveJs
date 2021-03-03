import {jogo, screenScale, ctx } from './Core.js';  


//===============VARIAVEIS IMAGE NAME===========================
let imgMet = 'Images/Meteoro.png';
let song = new Audio('explosion.wav');
song.load();
//https://freesound.org/s/250712/
let imgMetExplosion;
let metExplosion = ['Images/explosao.png','Images/explosao2.png','Images/explosao3.png','Images/explosao2.png','Images/explosao3.png',
    'Images/explosao2.png','Images/explosao.png'];

imgMetExplosion = metExplosion[0];
//===============VARIAVEIS IMAGE INSTANCE===========================
let metObj = new Image();
let metObjExplosion = new Image();

//===============VARIAVEIS ARRAYS OBJETOS==========================
export let cometaObj = [];
let explosions = [];

//===============VARIAVEIS IMAGENS SRC===========================
metObj.src = imgMet;
metObjExplosion.src = imgMetExplosion;
   //===============OBJETO COMETAS===========================
   export function cometas(x, y, velY, velX, scale, isColled, changed, isDead){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.scale = scale;
    this.isColled = isColled;
    this.changed = changed;
    this.isDead = isDead;
}
    //===============UPDATE COMETAS PROPERTIES===========================
    cometas.prototype.update  = function(){
        
        this.y += this.velY;
        this.x += this.velX
        
        if((this.x >= jogo.x-this.scale/2 && this.x<=jogo.x+jogo.scaleX-20)&&(this.y + this.scale-20>=jogo.y  && this.y<=jogo.y + 70)&& !this.isDead) {
            this.isColled = true;
            jogo.life-=100;
        
        }
        
        if(!(this.isDead))
        ctx.drawImage(metObj,this.x,this.y,this.scale,this.scale);
      
}


function explosion(x, y, scale, cometa, index){
    this.x=x;
    this.y = y;
    this.scale = scale;
    this.cometa = cometa;
    this.index = index;
}
explosion.prototype.update = function(){
    imgMetExplosion = metExplosion[this.index];
    metObjExplosion = new Image();
    metObjExplosion.src = imgMetExplosion;
    ctx.drawImage(metObjExplosion, this.x, this.y, this.scale, this.scale);
    if(this.index==6){
        
        cometaObj.splice(cometaObj.indexOf(this.cometa),1);
        //console.log('esplodiu com '+ cometaObj.length + ' cometas restantes e ' +explosion.length);
       
        explosions.splice(explosions.indexOf(this), 1)
        return;
    }
   
}
export function updateCometas(){
    cometaObj.forEach((cometa)=>{
        cometa.update();
        if((cometa.y>=screenScale[1]|| cometa.isColled)){
            if(cometa.y>=screenScale[1]){
                cometaObj.splice(cometaObj.indexOf(cometa),1);
            }
            else if(!cometa.isDead && cometa.isColled){
                let exp = new explosion(cometa.x, cometa.y, cometa.scale, cometa,0 );
                explosions.push(exp);
                animExp();
                sound();
                cometa.isDead = true;
            }
        }
        
            
    });
}

export function sound(){
    let newSong = song.cloneNode();
        newSong.volume = 1;
        newSong.play();
}
function animExp(){
    explosions.forEach((exps)=>{
        exps.update();
        exps.index++;
    });
    setTimeout(animExp, '500');
}
export function restartAllC(){
    for(let i = 0; i< cometaObj.length; i++){
        cometaObj.pop();
    }
}

