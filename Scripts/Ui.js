
import {ctx } from './Core.js';  
import {balaPontos } from './Tiros.js';

//===============VARIAVEIS DE INICIALIZAÇÃO===========================

export let distancia = 0;
let maximaDistancia = 0;
export let maxPoints = 0;
export let dis = document.querySelector('.Distance');
export let maxdis = document.querySelector('.MaxDistance');
let maxPoi = document.querySelector('.MaxPoints');
export let point = document.querySelector('.Points');
 //===============UI===========================
export function Distance(){
    distancia +=1;
 }
export function PontosUI(){
     

     ctx.font = "30px Arial white";
     ctx.fillText('Pontos: '+balaPontos+'.', 30, 30);
     ctx.font = "30px Arial white";
     ctx.fillText('Distancia: '+distancia+'.', 30, 70);
 }
 export function restartAllD(){
     distancia = 0;
 }
 export function datesStatus(){
     if(JSON.parse(localStorage.getItem("dates") != '')){
     maximaDistancia = JSON.parse(localStorage.getItem("dates"));
     }
     if(maximaDistancia < distancia){
         localStorage.setItem("dates", JSON.stringify(distancia))
          maximaDistancia = distancia;
     }
    dis.innerHTML= distancia;
    maxdis.innerHTML = maximaDistancia;
    point.innerHTML = balaPontos;

    pointsNow();
        localStorage.setItem("datesPoints", JSON.stringify(balaPontos + maxPoints))
        maxPoints = balaPontos;

        maxPoi.innerHTML = maxPoints;
 }
export function subtractPoints(valueSub){
        
        localStorage.setItem("datesPoints", JSON.stringify(valueSub))

       pointsNow();
        maxPoi.innerHTML = maxPoints;
}

export function pointsNow(){
    if(JSON.parse(localStorage.getItem("datesPoints") != '')){
        maxPoints = JSON.parse(localStorage.getItem("datesPoints"));
    }
}