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
    const screenScale = [1000, 660];

   
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
    let teclaAtual = [];
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
        teclaAtual[tecla] = true;
    });
    document.querySelector('body').addEventListener('keyup', function(event){
        tecla = event.keyCode;
        teclaAtual[tecla] = false;
    })

//========================iNICIALIZAÇÃO OBJETOS======================================

    //===============OBJETO NAVE===========================
    function nav(x, y, image, life, scaleX, scaleY){
        this.x = x;
        this.y = y;
        this.image = image;
        this.life = life;
        this.scaleX =scaleX;
        this.scaleY = scaleY;

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
    function cometas(x, y, velY, velX, scale, isColled, changed){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.scale = scale;
        this.isColled = isColled;
        this.changed = changed;
        
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
        ctx.fillRect(230,screenScale[1]-(screenScale[1]/15),screenScale[1]-160,20 );
        ctx.fillStyle = 'green';
        ctx.fillRect(230,screenScale[1]-(screenScale[1]/15),this.life,20 );
    }

    //===============UPDATE NAVE PROPERTIES===========================
    nav.prototype.update = function(){
        ctx.drawImage(this.image, this.x, this.y,this.scaleX, this.scaleY);
       
        if(teclaAtual[32]){
            let muni = new bala(jogo.x + this.scaleX/2,jogo.y,false);
            municaoObj.push(muni);
            //tecla = null;
        };
        if(teclaAtual[37]){
            this.x -=4;
            //tecla = null;
        };
        if(teclaAtual[39]){
            this.x +=4;
            //tecla = null;
        };

        if(teclaAtual[38]){
            this.y -=4;
            //tecla = null;
        };
        if(teclaAtual[40]){
        this.y +=4;
        //tecla = null;
        }

        if(this.x < 0) this.x = 1;
        else if(this.x >screenScale[0]-jogo.scaleX) this.x = screenScale-jogo.scaleX-1;


        if(this.y < 0) this.y = 1;
        else if(this.y >screenScale[1]-jogo.scaleY) this.y = screenScale[1]-jogo.scaleY-1;

       
    }
  
    //===============UPDATE FUNDO PROPERTIES===========================
    Fundo.prototype.update = function(){
        this.y +=2;
        ctx.drawImage(funObj, this.x, this.y, screenScale[0], screenScale[1]);
    }

    //===============UPDATE NAVE ENEMY PROPERTIES===========================
    navEnemy.prototype.update = function(){
        this.y += this.velenemyY;
        this.x += this.velenemyX;

       
        if(municaoEnemyObj.length< 1){
            ativarBalaEnemy(this);
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

    //===============UPDATE COMETAS PROPERTIES===========================
    cometas.prototype.update  = function(){
        
            this.y += this.velY;
            this.x += this.velX
            if((this.x >= jogo.x-this.scale/2 && this.x<=jogo.x+jogo.scaleX-20)&&(this.y + this.scale-20>=jogo.y  && this.y<=jogo.y + 70)){
                this.isColled = true;
                jogo.life-=100;
            
            }
            

            ctx.drawImage(metObj,this.x,this.y,this.scale,this.scale);
          
    }

    //===============UPDATE BALA PROPERTIES===========================
    bala.prototype.update = function(){
        for(let j = 0; j<cometaObj.length; j++){
            if((this.x >= cometaObj[j].x+ 5 && this.x<=cometaObj[j].x+ cometaObj[j].scale)&&(this.y>=cometaObj[j].y && this.y<=cometaObj[j].y + cometaObj[j].scale)){
                this.touch = true;
                if(cometaObj[j].changed){
                    let com = new cometas(cometaObj[j].x, cometaObj[j].y, Math.floor(Math.random() * 5)+2,Math.floor(Math.random() * 4)-2, cometaObj[j].scale/2, false,false);
                    let com2 = new cometas(cometaObj[j].x, cometaObj[j].y, Math.floor(Math.random() * 5)+2,Math.floor(Math.random() * 4)-2, cometaObj[j].scale/2, false, false);
                    cometaObj.push(com);
                    cometaObj.push(com2);
                }
                cometaObj.splice(cometaObj.indexOf(cometaObj[j]), 1);
              
               balaPontos++;
            }
        }
        ctx.drawImage(balaObj,this.x ,this.y, 10, 10);
        this.y -= 5;
    }

    balaEnemy.prototype.update = function(){
        if((this.x >= jogo.x+ 5 && this.x<=jogo.x+ jogo.scaleX)&&(this.y>=jogo.y && this.y<=jogo.y + jogo.scaleY)){
            jogo.life-=50;
            municaoEnemyObj.splice(municaoEnemyObj.indexOf(this), 1);
            return;
        }
        ctx.drawImage(balaEnemyObj,this.x ,this.y, 10, 10);
        this.y += 5;
    }


//=========================ATIVAÇÃO OBJETOS==========================================

    //===============ATIVAR COMETAS===========================
    function ativarCometa(){
        if(gameActive){
            let timeCom;
            if(distancia<25)timeCom = '1500';
             else if(distancia > 25 && distancia < 50)timeCom='1300';
             else if(distancia > 50 && distancia<75)timeCom='1200';
             else if(distancia > 75)timeCom='1100';

            let met = new cometas(Math.floor(Math.random() * screenScale[0], 0),-250, Math.floor(Math.random() * 6)+3,Math.floor(Math.random() * 2)-1,Math.floor(Math.random() * 150)+100, false,true);
            cometaObj.push(met);
            setTimeout('ativarCometa()', timeCom);
        }
    }

    //===============ATIVAR NAVE ENEMY===========================
    function ativarNavEnemy(){
        if(gameActive){
            let timeCom;
            if(distancia<100)timeCom = '25000';
             else if(distancia > 100)timeCom='20000';
            let met = new navEnemy(Math.floor(Math.random() * screenScale[0], 0),-250,enemyObj,4, 1,80, -80);
            enemyNavObj.push(met);
            setTimeout('ativarNavEnemy()', timeCom);
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
        if(jogo.life <= 0){
            gameActive = false;
            cv.style.display="none";
            restart.style.display="block";
        }

        ctx.font = "30px Arial white";
        ctx.fillText('Pontos: '+balaPontos+'.', 30, 30);
        ctx.font = "30px Arial white";
        ctx.fillText('Distancia: '+distancia+'.', 30, 70);
    }

//=========================ATIVAÇÃO DOS UPDATES==========================================
    function AllUpdates(){
       
       fundoObj.forEach((fundo)=>{
            fundo.update();
            if(fundo.y >=screenScale[1]){
                fundo.y = -screenScale[1];
            }
        });
       cometaObj.forEach((cometa)=>{
            cometa.update();
            if(cometa.y>=screenScale[1] || cometa.isColled){
                cometaObj.splice(cometaObj.indexOf(cometa),1);
            }
        });
         enemyNavObj.forEach((enemy)=>{
            enemy.update();
            if(enemy.y >=screenScale[1] + 100){
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
            if(municaoEnemy.y >= screenScale[1] ){
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
        console.log(screenScale[0], screenScale[1]);
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
    
        ativarCometa();
        ativarNavEnemy();
        Distance();
        Game();
    }
