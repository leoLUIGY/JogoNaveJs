import {jogo } from './Core.js';  
import {screenScale } from './Core.js';
import {ctx } from './Core.js';


//===============VARIAVEIS IMAGE NAME===========================
let imgMet = 'Images/Meteoro.png';

//===============VARIAVEIS IMAGE INSTANCE===========================
let metObj = new Image();

//===============VARIAVEIS ARRAYS OBJETOS==========================
export let cometaObj = [];

//===============VARIAVEIS IMAGENS SRC===========================
metObj.src = imgMet;
   
   //===============OBJETO COMETAS===========================
   export function cometas(x, y, velY, velX, scale, isColled, changed){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.scale = scale;
    this.isColled = isColled;
    this.changed = changed;
    
}
    //===============UPDATE COMETAS PROPERTIES===========================
    cometas.prototype.update  = function(){
        
        this.y += this.velY;
        this.x += this.velX
        
        if((this.x >= jogo.x-this.scale/2 && this.x<=jogo.x+jogo.scaleX-20)&&(this.y + this.scale-20>=jogo.y  && this.y<=jogo.y + 70)){
            this.isColled = true;
            jogo.life-=100;
        
        }
        

        ctx.drawImage(metObj,this.x,this.y,this.scale,this.scale);
      
}
export function updateCometas(){
    cometaObj.forEach((cometa)=>{
        cometa.update();
        if(cometa.y>=screenScale[1] || cometa.isColled){
            cometaObj.splice(cometaObj.indexOf(cometa),1);
        }
    });
}