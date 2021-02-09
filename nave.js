let start = document.querySelector('.iniciar');
let restart = document.querySelector('.restart');
let cv = document.querySelector('canvas');
let iniciar  = false;

cv.style.display="none";
restart.style.display = "none";

restart.addEventListener('click', function(){
    window.location.reload();
});

start.addEventListener('click', StartGame);
//=============================VARIAVEIS ==============================================
    //===============VARIAVEIS DE INICIALIZAÇÃO===========================
    let balaPontos = 0;
    let distancia = 0;
    let gameActive = true;
    let jogo;
    let tecla;
    let c =  document.getElementById('canvas');
    let ctx = c.getContext("2d");



    //===============VARIAVEIS IMAGE NAME===========================
    let imgMet = 'Meteoro.png';
    let imgNav = 'frente.png';
    let imgFun = 'fundo.png';
    let imgBala = 'Meteoro.png';
    let imgEnemyBala = 'Meteoro.png';
    let enemyNav = 'frenteEnemy.png';


    //===============VARIAVEIS IMAGE INSTANCE===========================
    let navObj = new Image();
    let metObj = new Image();
    let funObj = new Image();
    let balaObj = new Image();
    let balaEnemyObj = new Image();
    let enemyObj = new Image();

    //===============VARIAVEIS ARRAYS OBJETOS==========================
    let cometaObj = [];
    let municaoObj = [];
    let municaoEnemyObj = [];
    let fundoObj = [];
    let enemyNavObj = [];

    //===============VARIAVEIS IMAGENS SRC===========================
    navObj.src = imgNav;
    metObj.src = imgMet;
    funObj.src = imgFun;
    balaObj.src = imgBala;
    enemyObj.src = enemyNav;
    balaEnemyObj.src = imgEnemyBala;
    

//==========================EVENTOS DE CLICK=========================================
    document.querySelector('body').addEventListener('keydown', function(event){
        notPress = false;
        tecla = event.keyCode;
    });


//========================iNICIALIZAÇÃO OBJETOS======================================

    //===============OBJETO NAVE===========================
    function nav(x, y, image, life){
        this.x = x;
        this.y = y;
        this.image = image;
        this.life = life;

    }

    //===============OBJETO NAVE INIMIGA===========================
    function navEnemy(x, y, image, velenemyX, velenemyY, scalenemyX, scalenemyY){
        this.x = x;
        this.y = y;
        this.image = image;
        this.velenemyX = velenemyX;
        this.velenemyY = velenemyY;
        this.scalenemyX = scalenemyX;
        this.scalenemyY = scalenemyY;
    }

    //===============OBJETO PLANO DE FUNDO===========================
    function Fundo(x, y){
        this.x = x;
        this.y = y;
    }

    //===============OBJETO COMETAS===========================
    function cometas(x, y, velY, velX, scale, isColled){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.scale = scale;
        this.isColled = isColled;
        
    }

    //===============OBJETO BALA/MUNIÇÃO===========================
    function bala(x, y, touch){
        this.x = x;
        this.y = y;
        this.touch = touch;
     
    }

    function balaEnemy(x, y){
        this.x = x;
        this.y = y;

     
    }



//=========================UPDATES DOS OBJETOS==========================================

    //===============UPDATE NAVE LIFE===========================
    nav.prototype.Life = function(){
        ctx.fillStyle = 'brown';
        ctx.fillRect(230,620,500,20 );
        ctx.fillStyle = 'green';
        ctx.fillRect(230,620,this.life,20 );
    }

    //===============UPDATE NAVE PROPERTIES===========================
    nav.prototype.update = function(){
        ctx.drawImage(this.image, this.x, this.y,90, 90);
       
        if(tecla== 32){
            let muni = new bala(jogo.x + 40,jogo.y,false);
            municaoObj.push(muni);
            tecla = null;
        };
        if(tecla == 37){
            this.x -=10;
            tecla = null;
        };
        if(tecla== 39){
            this.x +=10;
            tecla = null;
        };

        if(tecla == 38){
            this.y -=10;
            tecla = null;
        };
        if(tecla== 40){
        this.y +=10
        tecla = null;
        }
       
    }
  
    //===============UPDATE FUNDO PROPERTIES===========================
    Fundo.prototype.update = function(){
        this.y +=2;
        ctx.drawImage(funObj, this.x, this.y, 1000, 660);
    }

    //===============UPDATE NAVE ENEMY PROPERTIES===========================
    navEnemy.prototype.update = function(){
        this.y += this.velenemyY;
        this.x += this.velenemyX;

       
        if(municaoEnemyObj.length< 1){
            ativarBalaEnemy(this);
        }
        if(this.x < 0 || this.x > 950)this.velenemyX *= -1;
        
        ctx.drawImage(this.image, this.x, this.y, this.scalenemyX, this.scalenemyY);
        
    }

    //===============UPDATE COMETAS PROPERTIES===========================
    cometas.prototype.update  = function(){
        
            this.y += this.velY;
            this.x += this.velX
            if((this.x >= jogo.x+10 && this.x+this.scale-25<=jogo.x+70)&&(this.y + this.scale-20>=jogo.y  && this.y<=jogo.y + 70)){
                this.isColled = true;
                jogo.life-=100;
                if(jogo.life <= 0){
                    gameActive = false;
                    cv.style.display="none";
                    restart.style.display="block";
                }
            }
            

            ctx.drawImage(metObj,this.x,this.y,this.scale,this.scale);
          
    }

    //===============UPDATE BALA PROPERTIES===========================
    bala.prototype.update = function(){
        for(let j = 0; j<cometaObj.length; j++){
            if((this.x >= cometaObj[j].x+ 5 && this.x<=cometaObj[j].x+ cometaObj[j].scale)&&(this.y>=cometaObj[j].y && this.y<=cometaObj[j].y + cometaObj[j].scale)){
                this.touch = true;
                let com = new cometas(cometaObj[j].x, cometaObj[j].y, Math.floor(Math.random() * 5)+2,Math.floor(Math.random() * 4)-2, cometaObj[j].scale/2, false);
                let com2 = new cometas(cometaObj[j].x, cometaObj[j].y, Math.floor(Math.random() * 5)+2,Math.floor(Math.random() * 4)-2, cometaObj[j].scale/2, false);
                cometaObj.push(com);
                cometaObj.push(com2);
                cometaObj.splice(cometaObj.indexOf(cometaObj[j]), 1);
              
               balaPontos++;
            }
        }
        ctx.drawImage(balaObj,this.x ,this.y, 10, 10);
        this.y -= 5;
    }

    balaEnemy.prototype.update = function(){
      
        ctx.drawImage(balaEnemyObj,this.x ,this.y, 10, 10);
        this.y += 5;
    }


//=========================ATIVAÇÃO OBJETOS==========================================

    //===============ATIVAR COMETAS===========================
    function ativarCometa(){
        if(gameActive){
            let met = new cometas(Math.floor(Math.random() * 1000, 0),-250, Math.floor(Math.random() * 6)+3,Math.floor(Math.random() * 2)-1,Math.floor(Math.random() * 150)+100, false);
            cometaObj.push(met);
            setTimeout('ativarCometa()', '1500');
        }
    }

    //===============ATIVAR NAVE ENEMY===========================
    function ativarNavEnemy(){
        if(gameActive){
            let met = new navEnemy(Math.floor(Math.random() * 1000, 0),-250,enemyObj,4, 1,80, -80);
            enemyNavObj.push(met);
            setTimeout('ativarNavEnemy()', '25000');
        }
    }

    function ativarBalaEnemy(object){
        if(object != null){
            let muni = new balaEnemy(object.x+40,object.y,false);
            municaoEnemyObj.push(muni);
            setTimeout('ativarBalaEnemy()', '100');
        }
    }

 
    //===============UI===========================
    function Distance(){
       distancia +=1;
       setTimeout('Distance()', '1000');
    }
    function PontosUI(){
        ctx.font = "30px Arial white";
        ctx.fillText('Pontos: '+balaPontos+'.', 30, 30);
        ctx.font = "30px Arial white";
        ctx.fillText('Distancia: '+distancia+'.', 30, 70);
    }

//=========================ATIVAÇÃO DOS UPDATES==========================================
    function AllUpdates(){
       
       fundoObj.forEach((fundo)=>{
            fundo.update();
            if(fundo.y >=660){
                fundo.y = -660;
            }
        });
       cometaObj.forEach((cometa)=>{
            cometa.update();
            if(cometa.y>=660 || cometa.isColled){
                cometaObj.splice(cometaObj.indexOf(cometa),1);
            }
        });
         enemyNavObj.forEach((enemy)=>{
            enemy.update();
            if(enemy.y >=660){
                enemyNavObj.splice(enemyNavObj.indexOf(enemy), 1);
            }
        });
          municaoObj.forEach((municao)=>{
            municao.update();
            if(municao.y <= 0 || municao.touch == true){
                municaoObj.splice(municaoObj.indexOf(municao),1);
            }
        });

        municaoEnemyObj.forEach((municaoEnemy)=>{
            municaoEnemy.update();
            console.log(municaoEnemyObj.length);
            if(municaoEnemy.y >= 660 ){
                municaoEnemyObj.splice(municaoEnemyObj.indexOf(municaoEnemy),1);
            }
        });
        
       

    }


//========================="LOOPING" PRINCIPAL==========================================
    function Game(){
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
        let fdU = new Fundo(0,-660);
        fundoObj.push(fd);
        fundoObj.push(fdU);
        jogo = new nav(400, 500, navObj,500);
    
        ativarCometa();
        ativarNavEnemy();
        Distance();
        Game();
    }
