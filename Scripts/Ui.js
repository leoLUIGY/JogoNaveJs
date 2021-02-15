
import {ctx } from './Core.js';  
import {balaPontos } from './Tiros.js';

//===============VARIAVEIS DE INICIALIZAÇÃO===========================

export let distancia = 0;
     
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