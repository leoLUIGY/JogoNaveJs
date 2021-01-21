let start = document.querySelector('button');
let cv = document.querySelector('canvas');
let iniciar  = false;

cv.style.display="none";

start.addEventListener('click', StartGame);

    let posBala;
    let tiro = false;
    let newCometa = false;
    let gameActive = true;
    let jogo;
    let tecla;


    let c =  document.getElementById('canvas');
    let ctx = c.getContext("2d");

    let imgMet = 'Meteoro.jpeg';
    let imgNav = 'frente.jpeg';
    let imgFun = 'bkground.jpeg';
    let imgBala = 'Meteoro.jpeg';

    let navObj = new Image();
    let metObj = new Image();
    let funObj = new Image();
    let balaObj = new Image();
    let cometaObj = [];
    let municaoObj = [];

    navObj.src = imgNav;
    metObj.src = imgMet;
    funObj.src = imgFun;
    balaObj.src = imgBala;


    document.querySelector('body').addEventListener('keydown', function(event){
        notPress = false;
        tecla = event.keyCode;
    });
    

    function nav(x, y, image){
        this.x = x;
        this.y = y;
        this.image = image;

    }
    nav.prototype.showI = function(){
        ctx.drawImage(this.image, this.x, this.y,80, 80);
    }

    nav.prototype.update = function(){
        if(tiro){
            
            let muni = new bala(jogo.x + 24,jogo.y);
            municaoObj.push(muni);
            tiro = false;
        }
        
        if(tecla== 32 && tiro == false){
            tiro = true
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

    function cometas(x, y){
        this.x = x;
        this.y = y;
        
    }

    cometas.prototype.update  = function(){
        
            this.y += 4;
            if((this.x+25 >= jogo.x && this.x+25<=jogo.x+ 80)&&(this.y + 45>=jogo.y + 5 && this.y +45<=jogo.y + 70)){
                gameActive = false;
            }
            ctx.drawImage(metObj,this.x,this.y,50,50);
    
    }

    function ativarCometa(){
        if(gameActive){
            newCometa = true;
            let met = new cometas(Math.floor(Math.random() * 1000, 0),0);
            cometaObj.push(met);
            setTimeout('ativarCometa()', '1500');
        }
    }


    function bala(x, y){
        this.x = x;
        this.y = y;
     
    }

    bala.prototype.update = function(){
        for(let j = 0; j<cometaObj.length; j++){
            if((this.x >= cometaObj[j].x+ 5 && this.x<=cometaObj[j].x+ 45)&&(this.y>=cometaObj[j].y && this.y<=cometaObj[j].y + 45)){
               cometaObj.splice(cometaObj.indexOf(cometaObj[j]), 1);
            }
        }
        ctx.drawImage(balaObj,this.x ,this.y, 10, 10);
        this.y -= 5;
    }

    function Game(){
        if(gameActive){
        ctx.drawImage(funObj, 0, 0);
        jogo.showI();
        jogo.update();
        for(let j = 0; j<cometaObj.length; j++){
            cometaObj[j].update();
            if(cometaObj[j].y >=630){
                cometaObj.shift();
            }
        }

        for(let i = 0; i<municaoObj.length; i++){
            municaoObj[i].update();
            if(municaoObj[i].y <= 0){
                municaoObj.shift();
            }
          
        }
        window.requestAnimationFrame(Game);
        } 
    }
    

    function StartGame(){
        let dv = document.querySelector('.game');
        dv.style.display="none";
        cv.style.display="block";
        jogo = new nav(640, 500, navObj);
        jogo.showI();
        ativarCometa();
        Game();
    }
