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

    let balaPontos = 0;
    let gameActive = true;
    let jogo;
    let tecla;


    let c =  document.getElementById('canvas');
    let ctx = c.getContext("2d");

    let imgMet = 'Meteoro.png';
    let imgNav = 'frente.png';
    let imgFun = 'fundo.png';
    let imgBala = 'Meteoro.png';
    let enemyNav =  'frente.png';

    let navObj = new Image();
    let metObj = new Image();
    let funObj = new Image();
    let balaObj = new Image();
    let enemyObj = new Image();

    let cometaObj = [];
    let municaoObj = [];
    let fundoObj = [];
    let enemyNavObj = [];

    navObj.src = imgNav;
    metObj.src = imgMet;
    funObj.src = imgFun;
    balaObj.src = imgBala;
    enemyObj.src = enemyNav;


    document.querySelector('body').addEventListener('keydown', function(event){
        notPress = false;
        tecla = event.keyCode;
    });
    function nav(x, y, image, life){
        this.x = x;
        this.y = y;
        this.image = image;
        this.life = life;

    }
    nav.prototype.showI = function(){
        ctx.drawImage(this.image, this.x, this.y,90, 90);
    }
    nav.prototype.Life = function(){
        ctx.fillStyle = 'brown';
        ctx.fillRect(230,620,800,20 );
        ctx.fillStyle = 'green';
        ctx.fillRect(230,620,this.life,20 );
    }

    nav.prototype.update = function(){
        
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
    };
       
    }
    function Fundo(x, y){
        this.x = x;
        this.y = y;
    }
    function cometas(x, y, velY, velX, scale, isColled){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.scale = scale;
        this.isColled = isColled;
        
    }
    Fundo.prototype.update = function(){
        this.y +=2;
        ctx.drawImage(funObj, this.x, this.y, 1280, 645);
    }
    cometas.prototype.update  = function(){
        
            this.y += this.velY;
            this.x += this.velX
            if((this.x+10 >= jogo.x && this.x+10<=jogo.x+80)&&(this.y + this.scale>=jogo.y  && this.y<=jogo.y + 80)){
                this.isColled = true;
                jogo.life-=160;
                if(jogo.life <= 0){
                    gameActive = false;
                    cv.style.display="none";
                    restart.style.display="block";
                }
            }
            

            ctx.drawImage(metObj,this.x,this.y,this.scale,this.scale);
    
    }

    function ativarCometa(){
        if(gameActive){
            let met = new cometas(Math.floor(Math.random() * 1280, 0),-250, Math.floor(Math.random() * 6)+3,Math.floor(Math.random() * 2)-1,Math.floor(Math.random() * 150)+100, false);
            cometaObj.push(met);
            setTimeout('ativarCometa()', '1500');
        }
    }


    function bala(x, y, touch){
        this.x = x;
        this.y = y;
        this.touch = touch;
     
    }

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
    function PontosUI(){
        ctx.font = "30px Arial white";
        ctx.fillText('Pontos: '+balaPontos+'.', 30, 30);
    }

    function Game(){
        if(gameActive){
        AllUpdates();
        jogo.showI();
        jogo.update();
        jogo.Life();
       
        PontosUI();
        window.requestAnimationFrame(Game);
        } 
    }
    
    function AllUpdates(){
        for(let k = 0; k<fundoObj.length; k++){
            fundoObj[k].update();
            console.log(k);
            if(fundoObj[k].y >=645){
                fundoObj[k].y = -645;
            }
        }
        for(let j = 0; j<cometaObj.length; j++){
            cometaObj[j].update();
            if(cometaObj[j].y >=630 || cometaObj[j].isColled){
                cometaObj.splice(cometaObj.indexOf(cometaObj[j]), 1);
            }
        }

        for(let i = 0; i<municaoObj.length; i++){
            municaoObj[i].update();
            if(municaoObj[i].y <= 0 || municaoObj[i].touch == true){
                municaoObj.splice(municaoObj.indexOf(municaoObj[i], 1));
            }
          
        }
    }

    function StartGame(){
       // let dv = document.querySelector('.game');
        //dv.style.display="none";
        start.style.display="none";
        cv.style.display="block";
        let fd = new Fundo(0, 0);
        let fdU = new Fundo(0,-645);
        fundoObj.push(fd);
        fundoObj.push(fdU);
        jogo = new nav(640, 500, navObj,800);
        jogo.showI();
        ativarCometa();
        Game();
    }
