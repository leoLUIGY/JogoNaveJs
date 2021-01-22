let start = document.querySelector('button');
let cv = document.querySelector('canvas');
let iniciar  = false;

cv.style.display="none";

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

    let navObj = new Image();
    let metObj = new Image();
    let funObj = new Image();
    let balaObj = new Image();
    let cometaObj = [];
    let municaoObj = [];
    let fundoObj = [];

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
        ctx.drawImage(this.image, this.x, this.y,90, 90);
    }

    nav.prototype.update = function(){
        
        if(tecla== 32){
            let muni = new bala(jogo.x + 40,jogo.y);
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
    function cometas(x, y){
        this.x = x;
        this.y = y;
        
    }
    Fundo.prototype.update = function(){
        this.y +=2;
        ctx.drawImage(funObj, this.x, this.y, 1280, 645);
    }
    cometas.prototype.update  = function(){
        
            this.y += 5;
            if((this.x+25 >= jogo.x && this.x+25<=jogo.x+ 80)&&(this.y + 45>=jogo.y + 5 && this.y +45<=jogo.y + 70)){
                gameActive = false;
            }
            ctx.drawImage(metObj,this.x,this.y,130,130);
    
    }

    function ativarCometa(){
        if(gameActive){
            let met = new cometas(Math.floor(Math.random() * 1280, 0),0);
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
    }

    function StartGame(){
        let dv = document.querySelector('.game');
        dv.style.display="none";
        cv.style.display="block";
        let fd = new Fundo(0, 0);
        let fdU = new Fundo(0,-645);
        fundoObj.push(fd);
        fundoObj.push(fdU);
        jogo = new nav(640, 500, navObj);
        jogo.showI();
        ativarCometa();
        Game();
    }
