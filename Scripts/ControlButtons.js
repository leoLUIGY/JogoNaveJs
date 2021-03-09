
import{maxPoints, subtractPoints, pointsNow} from "./Ui.js";
import{gameActive} from "./Core.js";

let atributeCount = [-1,-1,-1];
let atributesMenu = [document.querySelectorAll('.point-shoot'),document.querySelectorAll('.point-speed'),
    document.querySelectorAll('.point-life')];
let buttonsAtributes = [document.querySelector('.add-shoot'), document.querySelector('.add-speed'),
    document.querySelector('.add-life')];

let gameMenu=document.querySelector('.game-start');
let gameInfo=document.querySelector('.more-info');
let atributes=document.querySelectorAll('.atributes');
let statusStributes=document.querySelector('.status-atributes');
let restart = document.querySelector('.status');
export let restartButton = document.querySelector('.restart');
let references = document.querySelector('.references');
let credits = document.querySelector('.Credits');
let voltar = document.querySelectorAll('.voltar');
let cv = document.querySelector('canvas');

let howPlay = document.querySelector('.status-HowPlay');
let howPlayButton = document.querySelector('.CJogar');
let maxPoi = document.querySelector('.MaxPoint');

export let actualAtributeCount = [0,0, 0];
let prices = [[50, 100, 150, 200,0], [50, 100, 150, 200, 0], [50, 100, 150, 200, 0]];

cv.style.display="none";
restart.style.display = "none";
references.style.display = "none";
statusStributes.style.display = "none";
howPlay.style.display="none";

function buttonsName(first, second, third){  
buttonsAtributes[0].innerHTML = prices[0][first];
buttonsAtributes[1].innerHTML = prices[1][second];
buttonsAtributes[2].innerHTML = prices[2][third];
console.log("prices " + prices[0][first]);
}

buttonsAtributes[0].addEventListener('click', function(){
    atributeToUpdate(0, "atributeShoot");
});

buttonsAtributes[1].addEventListener('click', function(){
    atributeToUpdate(1, "atributeSpeed");
});

buttonsAtributes[2].addEventListener('click', function(){
    atributeToUpdate(2, "atributeLife");
});

howPlayButton.addEventListener('click', function(){
    gameMenu.style.display = "none";
    gameInfo.style.display = "none";
    howPlay.style.display = "flex";

});

atributes.forEach((atribute)=>{
    atribute.addEventListener('click', function(){
        statusStributes.style.display = "block";
        gameMenu.style.display = "none";
        gameInfo.style.display = "none";
        restart.style.display ="none";
        updateAtributes();
    
    });
})
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
    restart.style.display ="none";
    })});


function atributeToUpdate(index, storage){
    if(prices[index][actualAtributeCount[index]] <= maxPoints){
        subtractPoints(maxPoints - prices[index][actualAtributeCount[index]]);
        if(atributeCount[index]<4)
        atributeCount[index]++;
    
        if(JSON.parse(localStorage.getItem(storage) )!= ''){
            actualAtributeCount[index] = JSON.parse(localStorage.getItem(storage))
        }
            console.log('i am here '+ atributeCount[index]);
            localStorage.setItem(storage, JSON.stringify(atributeCount[index]));
            actualAtributeCount[index] = atributeCount[index];

            for(let i = 0; i< atributesMenu[index].length; i++){
                if(i<=actualAtributeCount[index]){
                    atributesMenu[index][i].style.background='#FFFFFF';
                } else{
                    continue;
                }
            }
        }

        pointsNow();
        maxPoi.innerHTML = maxPoints;
        buttonsName(actualAtributeCount[0], actualAtributeCount[1], actualAtributeCount[2]);
        console.log('it has '+ actualAtributeCount[index]);
}



export function updateAtributes(){
    if(JSON.parse(localStorage.getItem("atributeSpeed")) != ''){
        actualAtributeCount[1] = JSON.parse(localStorage.getItem("atributeSpeed"))
        if(actualAtributeCount[1]=== null){
            actualAtributeCount[1] = 0;
        }
    }
   
    if(JSON.parse(localStorage.getItem("atributeShoot") )!= ''){
        actualAtributeCount[0] = JSON.parse(localStorage.getItem("atributeShoot"))
        if(actualAtributeCount[0]=== null){
            actualAtributeCount[0] = 0;
        }
    } 

    if(JSON.parse(localStorage.getItem("atributeLife") )!= ''){
        actualAtributeCount[2] = JSON.parse(localStorage.getItem("atributeLife"))
        if(actualAtributeCount[2]=== null){
            actualAtributeCount[2] = 0;
        }
    }
    buttonsName(actualAtributeCount[0], actualAtributeCount[1], actualAtributeCount[2]);
    for(let j = 0; j< buttonsAtributes.length;j++){
        for(let i = -1; i< atributesMenu[j].length; i++){
            if(i<=actualAtributeCount[j]-1 && i > -1){
                atributesMenu[j][i].style.background='#FFFFFF';
            }
        }
    }
    pointsNow();
    maxPoi.innerHTML = maxPoints;
   
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