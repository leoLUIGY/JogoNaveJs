

let atributeCount = [-1,-1,-1];
let atributesMenu = [document.querySelectorAll('.point-shoot'),document.querySelectorAll('.point-speed'),
    document.querySelectorAll('.point-life')];
let buttonsAtributes = [document.querySelector('.add-shoot'), document.querySelector('.add-speed'),
    document.querySelector('.add-life')];

let gameMenu=document.querySelector('.game-start');
let gameInfo=document.querySelector('.more-info');
let atributes=document.querySelector('.atributes');
let statusStributes=document.querySelector('.status-atributes');
let restart = document.querySelector('.status');
let references = document.querySelector('.references');
let credits = document.querySelector('.Credits');
let voltar = document.querySelectorAll('.voltar');
let voltarMenu = document.querySelector('.voltarMenu');
let cv = document.querySelector('canvas');

let howPlay = document.querySelector('.status-HowPlay');
let howPlayButton = document.querySelector('.CJogar');

export let actualAtributeCount = [-1, -1, -1];

cv.style.display="none";
restart.style.display = "none";
references.style.display = "none";
statusStributes.style.display = "none";
howPlay.style.display="none";


buttonsAtributes[0].addEventListener('click', function(){
    if(atributeCount[0]<5)
    atributeCount[0]++;
 
    if(JSON.parse(localStorage.getItem("atributeShoot") )!= ''){
        actualAtributeCount[0] = JSON.parse(localStorage.getItem("atributeShoot"))
    }
    if(actualAtributeCount[0] < atributeCount[0]){
        console.log('i am here '+ atributeCount[0]);
        localStorage.setItem("atributeShoot", JSON.stringify(atributeCount[0]));
        actualAtributeCount[0] = atributeCount[0];
    }

   

    for(let i = 0; i< atributesMenu[0].length; i++){
        if(i<=actualAtributeCount[0]){
            atributesMenu[0][i].style.background='#FFFFFF';
        } else{
            continue;
        }
    }
    console.log('it has '+ actualAtributeCount[0]);
});
buttonsAtributes[1].addEventListener('click', function(){
   
    if(atributeCount[1]<5)
        atributeCount[1]++;

    if(JSON.parse(localStorage.getItem("atributeSpeed")) != ''){
        actualAtributeCount[1] = JSON.parse(localStorage.getItem("atributeSpeed"))
    }

    if(actualAtributeCount[1] < atributeCount[1]){
        localStorage.setItem("atributeSpeed", JSON.stringify(atributeCount[1]));
        actualAtributeCount[1] = atributeCount[1];
    }

   

    for(let i = 0; i< atributesMenu[1].length; i++){
        if(i<=actualAtributeCount[1]){
            atributesMenu[1][i].style.background='#FFFFFF';
        } else{
            continue;
        }
    }
    console.log('it has '+ actualAtributeCount[1]);
});
buttonsAtributes[2].addEventListener('click', function(){
  

    if(atributeCount[2]<5)
        atributeCount[2]++;

    if(JSON.parse(localStorage.getItem("atributeLife") )!= ''){
        actualAtributeCount[2] = JSON.parse(localStorage.getItem("atributeLife"))
    }
   
    if(actualAtributeCount[2] < atributeCount[2]){
        localStorage.setItem("atributeLife", JSON.stringify(atributeCount[2]));
        actualAtributeCount[2] = atributeCount[2];
    }

    for(let i = 0; i< atributesMenu[2].length; i++){
        if(i<= actualAtributeCount[2]){
            atributesMenu[2][i].style.background='#FFFFFF';
        } else{
            continue;
        }
    }
    console.log('it has '+ actualAtributeCount[2]);



});
howPlayButton.addEventListener('click', function(){
    gameMenu.style.display = "none";
    gameInfo.style.display = "none";
    howPlay.style.display = "flex";

});

atributes.addEventListener('click', function(){
    updateAtributes();
    statusStributes.style.display = "block";
    gameMenu.style.display = "none";
    gameInfo.style.display = "none";

});
credits.addEventListener('click', function(){
    gameMenu.style.display = "none";
    gameInfo.style.display = "none";
    references.style.display = "block";

});

voltar.forEach((volt)=> {
    volt.addEventListener('click', function(){
    gameMenu.style.display = "flex";
    gameInfo.style.display = "flex";
    references.style.display = "none";
    statusStributes.style.display = "none";
    howPlay.style.display="none";
    })});


voltarMenu.addEventListener('click', function(){
    window.location.reload();

});

restart.addEventListener('click', function(){
    //window.location.reload();
    new StartGame();
});


function updateAtributes(){
    if(JSON.parse(localStorage.getItem("atributeSpeed")) != ''){
        actualAtributeCount[1] = JSON.parse(localStorage.getItem("atributeSpeed"))
    }
   
    if(JSON.parse(localStorage.getItem("atributeShoot") )!= ''){
        actualAtributeCount[0] = JSON.parse(localStorage.getItem("atributeShoot"))
    }

    if(JSON.parse(localStorage.getItem("atributeLife") )!= ''){
        actualAtributeCount[2] = JSON.parse(localStorage.getItem("atributeLife"))
    }

    for(let j = 0; j< buttonsAtributes.length;j++){
        for(let i = 0; i< atributesMenu[j].length; i++){
            if(i<=actualAtributeCount[j]){
                atributesMenu[j][i].style.background='#FFFFFF';
            }
        }
    }
}

export function enabledCanvas(){
    gameMenu.style.display="none";
    gameInfo.style.display = "none";
    restart.style.display = "none";
    cv.style.display="block";
}
export function enableRestart(){
    cv.style.display="none";
    restart.style.display="block";
}