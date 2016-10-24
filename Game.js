//global variables
var MyGlobal = {
    mapWidth: 416,
    mapHeight: 416,
    width: 448,
    height: 512,

    scores : 0,
    aiCount : 2,
    enemyArray : [],
    AIplus : null,
    tma: false,
    tmb: false,
};

//Game Init

// Maps
Map.Init();
var rocks = document.getElementsByClassName("rock");
var grasses = document.getElementsByClassName("grass");
var sticks = document.getElementsByClassName("stick");
var bombs = document.getElementsByClassName("bomb");
var enegys = document.getElementsByClassName("enegy");
//scroes
setInterval(function() {
    getById("scores").getElementsByTagName("span")[0].innerText = MyGlobal.scores;
    getById("scores").getElementsByTagName("span")[1].innerText = myTank.enegy;
}, 500);

//player tank!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var myTank = new MyTank('me', 'right', 380, 380);

//AI tanks Groups
/*var aiCount = 2;
var enemyArray = [];
var AIplus = null;*/

function AIGroup() {
    for (var i = 0; i < MyGlobal.aiCount; i++) {
        var ePos = getAvailablePos();
        var enemy = new EnemyTank('enemy' + i, 'up', ePos[0]*32, ePos[1]*32);
        MyGlobal.enemyArray.push(enemy);
    }
}
var cntLimit = setInterval(function() {
    if (MyGlobal.enemyArray.length >= 4) {
        // console.log("no more enemy");
        clearInterval(MyGlobal.AIplus);
    } else {
        clearInterval(MyGlobal.AIplus);
        MyGlobal.AIplus = window.setInterval(AIGroup(), 3000);
    }
}, 9000);
AIGroup();
/*window.tm = { //move to global map
    tma: false,
    tmb: false,
};*/
clearInterval(MyGlobal.tma);
MyGlobal.tma = setInterval(function() {
    for (var i = 0; i < MyGlobal.enemyArray.length; i++) {
        MyGlobal.enemyArray[i].getDir();
        MyGlobal.enemyArray[i].setDirection();
        if( MyGlobal.enemyArray[i].fireOrNot() ){ MyGlobal.enemyArray[i].fire(); }
    }
    clearInterval(MyGlobal.tmb);
    MyGlobal.tmb = setInterval(function() {
        for (var i = 0; i < MyGlobal.enemyArray.length; i++) {
            if (MyGlobal.enemyArray[i] !== null && MyGlobal.enemyArray[i] !== "undefined" && MyGlobal.enemyArray[i]) {
                MyGlobal.enemyArray[i].move();
                MyGlobal.enemyArray[i].rush(myTank);
            }
        }
    }, 30);
}, 2000);
/*function fireOrNot(){
    var factor = Math.random();
    var flag = factor>0.7 ? true:false;
    return flag;
}*/