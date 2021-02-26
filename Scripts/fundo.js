import {screenScale, ctx } from './Core.js';
//===============VARIAVEIS IMAGE NAME===========================
let imgFun = 'Images/fundo.png';


//===============VARIAVEIS IMAGE INSTANCE===========================
let funObj = new Image();

//===============VARIAVEIS ARRAYS OBJETOS==========================
export let fundoObj = [];
//===============VARIAVEIS IMAGENS SRC===========================
funObj.src = imgFun;


//===============OBJETO PLANO DE FUNDO===========================
export function Fundo(x, y){
    this.x = x;
    this.y = y;
}

//===============UPDATE FUNDO PROPERTIES===========================
Fundo.prototype.update = function(){
this.y +=2;
ctx.drawImage(funObj, this.x, this.y, screenScale[0], screenScale[1]);
}
export function updateFundo(){
    fundoObj.forEach((fundo)=>{
        fundo.update();
        if(fundo.y >=screenScale[1]){
            fundo.y = -screenScale[1];
        }
    });
}