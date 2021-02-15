import {updateCometas } from './Cometas.js';  
import {updateEnemy } from './navEnemy.js';
import {updateShoots } from './Tiros.js';
import {updateFundo } from './fundo.js';
import {PontosUI } from './Ui.js';
import {navObj } from './nave.js';  
import {nav } from './nave.js';  
import {Fundo } from './fundo.js';
import {fundoObj} from './fundo.js';   
import {ativarCometa } from './ActiveObjects.js';
import {ativarNavEnemy } from './ActiveObjects.js';
import {Distance } from './Ui.js';
import {distancia } from './Ui.js';


let start = document.querySelector('.iniciar');
export let restart = document.querySelector('.restart');
export let cv = document.querySelector('canvas');
export let jogo;
let iniciar  = false;
let timeCometa;
let timeNav;

cv.style.display="none";
restart.style.display = "none";

restart.addEventListener('click', function(){
    window.location.reload();
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
            cv.style.display="none";
            restart.style.display="block";
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
    function StartGame(){
       // let dv = document.querySelector('.game');
        //dv.style.display="none";
        start.style.display="none";
        cv.style.display="block";
        let fd = new Fundo(0, 0);
        let fdU = new Fundo(0,-screenScale[1]);
        fundoObj.push(fd);
        fundoObj.push(fdU);
        jogo = new nav(400, 500, navObj,500,90,90);
        
        Game();
        ativaEnemy();
        ativaCom();
        activeDis();
    }
