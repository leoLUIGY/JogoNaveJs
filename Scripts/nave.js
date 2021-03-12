import {screenScale,ctx, jogo } from './Core.js';
import {municaoObj, bala } from './Tiros.js';
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
let posMouse = 0;
let posMouseY = 0;
let time = 3000;
let posisX;
let posisY;
//let canvas =  document.getElementById('canvas');

//===============VARIAVEIS IMAGENS SRC===========================
navObj.src = imgNav;



//===============VARIAVEIS ARRAYS OBJETOS==========================
let teclaAtual = [];

window.addEventListener("mousedown", function(e){
   // if(screenScale[0] < 750){
    posisX = e.clientX / (window.innerWidth / 10) * (screenScale[0]/10);
    posisY = e.clientY / (window.innerHeight / 10) * (screenScale[1]/10);
        console.log("estou aqui" + posisY + " e player esta em " + jogo.y);
    if(posisX> jogo.x+ (jogo.scaleX/2)){
        posMouse = 1;
    } else if(posisX < jogo.x+ (jogo.scaleX/2)){
        posMouse = 2;
    }

    if(posisY > jogo.y+ (jogo.scaleY/2)){
        posMouseY = 1;
    } else if(posisY < jogo.y+ (jogo.scaleY/2)){
        posMouseY = 2;
    }
//}
});

window.addEventListener("mouseup", function(e){
     
    //posMouse = 0;
})

//==========================EVENTOS DE CLICK=========================================
document.querySelector('body').addEventListener('keydown', function(event){
    //notPress = false;
    tecla = event.keyCode;
    teclaAtual[tecla] = true;
    posMouse = 0;
    posMouseY = 0;
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
    ctx.fillRect(230,screenScale[1]-(screenScale[1]/15),100+(4 * 100),20 );
    ctx.fillStyle = 'green';
    ctx.fillRect(230,screenScale[1]-(screenScale[1]/15),this.life,20 );
}

//===============UPDATE NAVE PROPERTIES===========================
nav.prototype.update = function(){
    ctx.drawImage(this.image, this.x, this.y,this.scaleX, this.scaleY);
    
    if((teclaAtual[32] && canShoot) || (posMouse > 0 && canShoot)){
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
    if(teclaAtual[37] || posMouse == 2){
        this.x -=(3 + (actualAtributeCount[1]/2));
        navObj.src = imgNavE;
        //tecla = null;
    };
    if(teclaAtual[39] || posMouse == 1){
        this.x +=(3 + (actualAtributeCount[1]/2));
        navObj.src = imgNavD ;
        //tecla = null;
    };

    if(teclaAtual[38] || posMouseY == 2){
        this.y -=(1 + (actualAtributeCount[1]/2));
        //tecla = null;
    };
    if(teclaAtual[40] || posMouseY == 1){
    this.y +=(1 + (actualAtributeCount[1]/2));
    //tecla = null;
    }

    if(posMouseY != 0  || posMouse != 0){
        stopMoveTouch(this.x, this.y);
    }
    if(this.x < 0) this.x = 1;
    else if(this.x >screenScale[0]-jogo.scaleX) this.x = screenScale[0]-jogo.scaleX-1;


    if(this.y < 0) this.y = 1;
    else if(this.y >screenScale[1]-jogo.scaleY) this.y = screenScale[1]-jogo.scaleY-1;

    
}


function stopMoveTouch(x, y){
    if(posMouse ==1){
        if(posisX < x){
            posMouse = 0;
            navObj.src = imgNav;
        }
    } else if(posMouse == 2){
        if(posisX>x){
            posMouse = 0;
            navObj.src = imgNav;
        }
    }

    if(posMouseY ==1){
        if(posisY < y){
            posMouseY = 0;
        }
    } else if(posMouseY == 2){
        if(posisY>y){
            posMouseY = 0;
        }
    }
}