import {updateCometas, restartAllC } from './Cometas.js';    
import {updateEnemy,restartAllE } from './navEnemy.js';
import {updateShoots, restartAllP } from './Tiros.js';
import {navObj, nav} from './nave.js';  
import {Fundo, updateFundo,fundoObj} from './fundo.js';  
import {ativarCometa, ativarNavEnemy } from './ActiveObjects.js';
import {Distance, datesStatus, restartAllD, distancia, PontosUI } from './Ui.js';
import { enabledCanvas, enableRestart, restart, actualAtributeCount, updateAtributes } from './ControlButtons.js';



let start = document.querySelector('.iniciar');
export let jogo;
let iniciar  = false;
let timeCometa;
let timeNav;

restart.addEventListener('click', function(){
    //window.location.reload();
    new StartGame();
});


start.addEventListener('click', StartGame);
//=============================VARIAVEIS ==============================================
    //===============VARIAVEIS DE INICIALIZAÇÃO===========================
    
    export let gameActive = true;
    
    let c =  document.getElementById('canvas');
    export let ctx = c.getContext("2d");
    export const screenScale = [1000, 660];
    


  

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
        enabledCanvas();
        updateAtributes();
        gameActive = true
        restartAllE();
        restartAllC();
        restartAllD();
        restartAllP();
        
        let fd = new Fundo(0, 0);
        let fdU = new Fundo(0,-screenScale[1]);
        fundoObj.push(fd);
        fundoObj.push(fdU);
        jogo = new nav(400, 500, navObj,100+((actualAtributeCount[2]/2) * 100),90,90);
        jogo.life = 100+((actualAtributeCount[2]/2) * 100);
        Game();
        ativaEnemy();
        ativaCom();
        activeDis();
    }
