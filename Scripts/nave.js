import {screenScale } from './Core.js';
import {ctx } from './Core.js';
import {municaoObj } from './Tiros.js';
import {jogo } from './Core.js';  
import {bala} from './Tiros.js';
import {actualAtributeCount} from './ControlButtons.js';

let soundTiro = new Audio('shoot.wav');
let tecla;
//soundTiro.preload = 'auto';
soundTiro.load();
//===============VARIAVEIS IMAGE NAME===========================
let imgNav = 'Images/frente.png';
let imgNavD = 'Images/Ldireito.png';
let imgNavE = 'Images/LEsquerdo.png';
//===============VARIAVEIS IMAGE INSTANCE===========================
export let navObj = new Image();
let canShoot = true;
let time = 3000;
//===============VARIAVEIS IMAGENS SRC===========================
navObj.src = imgNav;



//===============VARIAVEIS ARRAYS OBJETOS==========================
let teclaAtual = [];


//==========================EVENTOS DE CLICK=========================================
document.querySelector('body').addEventListener('keydown', function(event){
    //notPress = false;
    tecla = event.keyCode;
    teclaAtual[tecla] = true;
});
document.querySelector('body').addEventListener('keyup', function(event){
    tecla = event.keyCode;
    navObj.src = imgNav;
    teclaAtual[tecla] = false;
})

 
//========================iNICIALIZAÇÃO OBJETOS======================================

//===============OBJETO NAVE===========================
export function nav(x, y, image, life, scaleX, scaleY){
    canShoot = true;
    this.x = x;
    this.y = y;
    this.image = image;
    this.life = life;
    this.scaleX =scaleX;
    this.scaleY = scaleY;

}

//=========================UPDATES DOS OBJETOS==========================================

//===============UPDATE NAVE LIFE===========================
nav.prototype.Life = function(){
    ctx.fillStyle = 'brown';
    ctx.fillRect(230,screenScale[1]-(screenScale[1]/15),100+((actualAtributeCount[2]/2) * 100),20 );
    ctx.fillStyle = 'green';
    ctx.fillRect(230,screenScale[1]-(screenScale[1]/15),this.life,20 );
}

//===============UPDATE NAVE PROPERTIES===========================
nav.prototype.update = function(){
    ctx.drawImage(this.image, this.x, this.y,this.scaleX, this.scaleY);
    
    if(teclaAtual[32] && canShoot){
        canShoot = false;
        let muni = new bala(jogo.x + this.scaleX/2,jogo.y,false);
        municaoObj.push(muni);
        let song = soundTiro.cloneNode();
        song.volume = 1;
        song.play();
        if(actualAtributeCount[0]>0)time = 3000/actualAtributeCount[0];
        setTimeout(function(){
            canShoot = true;
        }, time );
        //local sound https://freesound.org/s/435417/
        //tecla = null;
        
    };
    if(teclaAtual[37] ){
        
        this.x -=(3 + (actualAtributeCount[1]/2));
        navObj.src = imgNavE;
        //tecla = null;
    };
    if(teclaAtual[39]){
        this.x +=(3 + (actualAtributeCount[1]/2));
        navObj.src = imgNavD ;
        //tecla = null;
    };

    if(teclaAtual[38]){
        this.y -=(3 + (actualAtributeCount[1]/2));
        //tecla = null;
    };
    if(teclaAtual[40]){
    this.y +=(3 + (actualAtributeCount[1]/2));
    //tecla = null;
    }

    if(this.x < 0) this.x = 1;
    else if(this.x >screenScale[0]-jogo.scaleX) this.x = screenScale-jogo.scaleX-1;


    if(this.y < 0) this.y = 1;
    else if(this.y >screenScale[1]-jogo.scaleY) this.y = screenScale[1]-jogo.scaleY-1;

    
}


