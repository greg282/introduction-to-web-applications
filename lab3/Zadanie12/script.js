var points=0;
var lives=3;
var zombies=[];
var generator=null;
var high_array=[];
var enabled_remover=true;
window.onload=function(){
  startHandler();
}


function rmPoints(event){
    if(!enabled_remover){
        return;
    }
    points-=6;
    UpdatePoints();
}


function gameStart(){
    generator=setInterval(function(){
        const size=Math.floor(Math.random()*10)/10 +0.5;
        const delay=Math.floor(Math.random()*200);
        const speed=Math.floor(Math.random()*5)+1;
        const offset_height=Math.floor(Math.random()*150+1);
        setTimeout(function(){
            Zombie.generate(size,speed,offset_height);
        },delay);
    },600);
}

function zombieAnimate(el,speed){
    let curr_offset=200;
    el.animate=setInterval(function(){
            curr_offset-=200;
            el.style.backgroundPositionX=`${curr_offset}px`;
            curr_offset=curr_offset==-1800 ? 200 : curr_offset;
        },speed*10)
}
//speed - im mniej tym szybciej
function zombieWalk(el,speed){
    let curr_offset_right=-300;
    el.tempInterval=setInterval(function(){
        curr_offset_right+=10;
        el.style.right=`${curr_offset_right}px`;
        if(curr_offset_right>parseInt(window.getComputedStyle(document.getElementById("board")).width)){
            lives-=1;
            UpdateLives();
            clearInterval(el.tempInterval);
            clearInterval(el.animate);
            el.remove();
        }
    },speed);
}

let Zombie = {
    generate:function(size,speed,offset_height){
        const el=document.createElement("div");
        el.classList.add("zombie");
        el.style.scale=size;
        el.style.right=`-${300}px`;
        el.style.bottom=`${offset_height}px`;
        el.addEventListener("click",Myclick);
        document.getElementById("board").append(el);
        zombies.push(el);
        zombieAnimate(el,speed);
        switch(speed){
            case 1:
                zombieWalk(el,35);
                break;
            case 2:
                zombieWalk(el,30);
                break;
            case 3:
                zombieWalk(el,25);
                break;
            case 4:
                zombieWalk(el,20);
                break;
            case 5:
                zombieWalk(el,15);
        }
    }
}

function UpdatePoints(){
    const zeros="00000";
    document.getElementById("points").innerHTML=`${zeros.slice(0,5-points.toString().length)}${points}`;
}

function UpdateLives(){
    document.getElementById("lives").innerHTML=`Liczba żyć: ${lives}`;
    if(lives==0){
        //  alert("przegrałes");
        handlerData(points);
        reset();
    }
}

function reset(){
    for( el in zombies){
    clearInterval(zombies[el].tempInterval);
    clearInterval(zombies[el].animate);
    zombies[el].remove();
    }
    clearInterval(generator);
    points=0;
    lives=3;
    zombies=[];
    UpdateLives();
    UpdatePoints();
}

function Myclick(event){//strzelanie do zombie
    if(!enabled_remover){
        return;
    }
    event.stopPropagation();
    points+=12;
    UpdatePoints();
    clearInterval(event.target.tempInterval);
    clearInterval(event.target.animate);
    event.target.remove();
}
function updateCursor(event){
    const el=document.getElementById("cursor");
    const computedStyle=getComputedStyle(el);
    const changeY=event.pageY-parseInt(computedStyle.height);
    const changeX=event.pageX-parseInt(computedStyle.width);
    el.style.top=changeY+"px";
    el.style.left=changeX+"px";
}

//////////////////server code

function startHandler(){
   document.getElementById("button").addEventListener("click",addUsername);
   document.getElementById("playagain").addEventListener("click",playAgainClick);
}

function addUsername(event){
    if (document.getElementById("txt").value.length<2){
        alert("Podaj conajmniej dwa znaki");
        return;
    }
    document.getElementById("username").innerHTML=document.getElementById("txt").value;
    document.getElementById("board").addEventListener("click",rmPoints);
    window.addEventListener("mousemove",updateCursor);
    document.getElementById("user-nickname").style.display="none";
    document.getElementsByTagName("body")[0].style.cursor="none";
    document.getElementById("cursor").style.opacity="100";
    gameStart();
   
}

 function handlerData(pointss){
    const username=document.getElementById("username").innerHTML;
     fetch("https://jsonblob.com/api/jsonBlob/1040728195208593408")
    .then(response => response.json())
    .then( data => sendData(data,username,pointss,new Date().toUTCString()));
}

async function sendData(data,username,score,date){
    let obj=  record.init(username,score,date);
     data.array.push(obj);
      
    url="https://jsonblob.com/api/jsonBlob/1040728195208593408";
    const response =  await fetch(url, {
          method: 'PUT', 
          mode: 'cors', 
          cache: 'no-cache', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
    });
    getRecords();

    return response;
}   
let record={
    username:null,
    score:null,
    date:null,
    init:function(username,score,date){
        this.username=username;
        this.score=score;
        this.date=date;
        return this;
    }
}
function getRecords(){
     fetch("https://jsonblob.com/api/jsonBlob/1040728195208593408")
    .then(response => response.json())
    .then( data => dataReady(data.array));
}
function dataReady(data){
    data.sort(function(x,y){
        if(x.score<y.score){
            return 1;
        }
        if(x.score>y.score){
            return -1;
        }
        return 0;
    });
    const el = document.getElementById("table");
    for(iter in data){
        let elrow=document.createElement("tr");
        let username=document.createElement("td");
        username.innerHTML=data[iter].username;
        let score=document.createElement("td");
        score.innerHTML=data[iter].score;
        let date=document.createElement("td");
        date.innerHTML=data[iter].date;
        let rank=document.createElement("td");
        rank.innerHTML=(parseInt(iter)+1);
        elrow.append(rank);
        elrow.append(username);
        elrow.append(score);
        elrow.append(date);
        high_array.push(elrow);
        el.append(elrow);
        if(iter==6){
            break;
        }
        
    }
    document.getElementById("records").style.display="block";
    document.getElementsByTagName("body")[0].style.cursor="auto";
    document.getElementById("cursor").style.opacity="0";
    enabled_remover=false;

}
function playAgainClick(event){
    document.getElementById("records").style.display="none";
    document.getElementById("username").innerHTML="";
    document.getElementById("user-nickname").style.display="flex";
    for (iter in high_array){
        high_array[iter].remove();
    }
    lives=3;
    points=0;
    UpdatePoints();
    enabled_remover=true;
}

