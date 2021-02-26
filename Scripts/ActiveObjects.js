import {screenScale } from './Core.js';
import {cometaObj } from './Cometas.js';
import {cometas } from './Cometas.js';
import {enemyObj } from './navEnemy.js';
import {enemyNavObj } from './navEnemy.js';
import {navEnemy } from './navEnemy.js';


//=========================ATIVAÇÃO OBJETOS==========================================

//===============ATIVAR COMETAS===========================
export function ativarCometa(){
    let met = new cometas(Math.floor(Math.random() * screenScale[0], 0),-250, Math.floor(Math.random() * 6)+3,Math.floor(Math.random() * 2)-1,Math.floor(Math.random() * 150)+100, false,true, false);
    cometaObj.push(met);
}

//===============ATIVAR NAVE ENEMY===========================
export function ativarNavEnemy(){
    let met = new navEnemy(Math.floor(Math.random() * screenScale[0], 0),-250,enemyObj,4, 1,80, -80);
    enemyNavObj.push(met);
}
