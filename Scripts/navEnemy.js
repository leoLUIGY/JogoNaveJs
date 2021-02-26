import {screenScale, ctx} from './Core.js';
import {municaoEnemyObj, balaEnemy} from './Tiros.js'; 

  
  //===============VARIAVEIS IMAGE NAME===========================
   let enemyNav = 'Images/frenteEnemy.png';


   //===============VARIAVEIS IMAGE INSTANCE===========================
   export let enemyObj = new Image();

   //===============VARIAVEIS ARRAYS OBJETOS==========================
   export let enemyNavObj = [];
   //===============VARIAVEIS IMAGENS SRC===========================
   enemyObj.src = enemyNav;
  
  //===============OBJETO NAVE INIMIGA===========================
  export function navEnemy(x, y, image, velenemyX, velenemyY, scalenemyX, scalenemyY){
    this.x = x;
    this.y = y;
    this.image = image;
    this.velenemyX = velenemyX;
    this.velenemyY = velenemyY;
    this.scalenemyX = scalenemyX;
    this.scalenemyY = scalenemyY;
}

  //===============UPDATE NAVE ENEMY PROPERTIES===========================
  navEnemy.prototype.update = function(){
    this.y += this.velenemyY;
    this.x += this.velenemyX;
   
   
    if(municaoEnemyObj.length< 1){
        let muni = new balaEnemy(this.x+40,this.y,false);
        municaoEnemyObj.push(muni);
        
    }
    if(this.x < 0){
        this.x=1;
        this.velenemyX *= -1;
    }
    else if (this.x > 950){
        this.x = 949;
        this.velenemyX *= -1;
    }
    
    ctx.drawImage(this.image, this.x, this.y, this.scalenemyX, this.scalenemyY);
  
}
export function updateEnemy(){
    enemyNavObj.forEach((enemy)=>{
        enemy.update();
        if(enemy.y >=screenScale[1] + 100){
            enemyNavObj.splice(enemyNavObj.indexOf(enemy), 1);
        }
    });
}

export function restartAllE(){
    for(let i = 0; i< enemyNavObj.length; i++){
        enemyNavObj.pop();
    }
}