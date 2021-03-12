import {updateCometas, restartAllC } from './Cometas.js';    
import {updateEnemy,restartAllE } from './navEnemy.js';
import {updateShoots, restartAllP } from './Tiros.js';
import {navObj, nav} from './nave.js';  
import {Fundo, updateFundo,fundoObj} from './fundo.js';  
import {ativarCometa, ativarNavEnemy } from './ActiveObjects.js';
import {Distance, datesStatus, restartAllD, distancia, PontosUI } from './Ui.js';
import { enabledCanvas, enableRestart, restartButton, actualAtributeCount, updateAtributes } from './ControlButtons.js';



let start = document.querySelector('.iniciar');
export let jogo;
let iniciar  = false;
let timeCometa;
let timeNav;
let backSound = new Audio('space.wav');
backSound.load();
backSound.loop = true;
//https://freesound.org/s/323090/
//https://freesound.org/s/48622

restartButton.addEventListener('click', function(){
    //window.location.reload();
    
    new StartGame();
});


start.addEventListener('click', function(){ 
    new StartGame();

});
//=============================VARIAVEIS ==============================================
    //===============VARIAVEIS DE INICIALIZAÇÃO===========================
    
    export let gameActive = true;
    
    let c =  document.getElementById('canvas');
    export let ctx = c.getContext("2d");
    export let screenScale = [canvas.width, canvas.height];

  

//=========================ATIVAÇÃO DOS UPDATES==========================================
    function AllUpdates(){
        updateFundo();
        updateCometas();
        updateEnemy();
        updateShoots();
        
    }
     function ativaCom(){
        if(gameActive){
            if(distancia<25)timeCometa= '1500';
            else if(distancia > 25 && distancia < 50)timeCometa='1300';
            else if(distancia > 50 && distancia<75)timeCometa='1200';
            else if(distancia > 75)timeCometa='1100';
            ativarCometa();
    
            setTimeout(ativaCom, timeCometa);
        }
    }
    
    //===============ATIVAR NAVE ENEMY===========================
     function ativaEnemy(){
        if(gameActive){
            if(distancia<100)timeNav = '25000';
            else if(distancia > 100)timeNav='20000';
            ativarNavEnemy();
            setTimeout(ativaEnemy, timeNav);
        }
    }
    function activeDis(){
        Distance();
        setTimeout(activeDis, '1000');
    }
//========================="LOOPING" PRINCIPAL==========================================
    function Game(){
        if(jogo.life <= 0){
            gameActive = false;
            enableRestart();
            datesStatus();
            backSound.pause();
        }
        if(gameActive){
        AllUpdates();
        jogo.update();
        jogo.Life();
        PontosUI();
        window.requestAnimationFrame(Game);
        } 
    }

//=========================ATIVAÇÃO DO LOOPING PRINCIPAL==========================================
  export function StartGame(){
       // let dv = document.querySelector('.game');
        //dv.style.display="none";
        restartAllE();
        restartAllC();
        restartAllD();
        restartAllP();
        enabledCanvas();
        //c.clientWidth, c.clientHeight]
        //screenScale = [1000, 550];
        console.log('Estou aqui no Starter do jogo '+ screenScale[0] + " " + screenScale[1]);
        
    
        updateAtributes();
        gameActive = true
      
        backSound.play();

      
     
        let fd = new Fundo(0, 0);
        let fdU = new Fundo(0,-screenScale[1]);
        fundoObj.push(fd);
        fundoObj.push(fdU);
        let navS;
        if(screenScale[0] < 750){
            navS = (screenScale[1]/7.6)/1.5;
        } else{
            navS = screenScale[1]/7.6;
        }
        jogo = new nav(400, 500, navObj,100+((actualAtributeCount[2]/2) * 100),screenScale[1]/7.6,navS);
        jogo.life = 100+((actualAtributeCount[2]/2) * 100);
        Game();
       // ativaEnemy();
        //ativaCom();
        //activeDis();
    }
