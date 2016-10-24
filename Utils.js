Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

function getById(id) {
    return !id ? null : document.getElementById(id);
}

function getAttr(el, k) {
    if (el) {
        var v = el.getAttribute[k] ? el.getAttribute[k] : null;
        return v;
    }
}

function setAttr(el, k, v) {
    if (el) {
        el.setAttribute(k, v);
    }
}

function getCss(el, k) {
    if (el) {
        if (el.style[k]) {
            return el.style[k];
        }
        return null;
    }
}

function setCss(el, k, v) {
    if (el) {
        if (!el.style || el.style.length === 0) {
            el.style = {};
        }
        el.style[k] = v;
    }
}

function blast(obj, reason) {
    var el = obj.el;
    var x = obj.x - 28;
    var y = obj.y - 28;
    setCss(el, 'left', x + 'px');
    setCss(el, 'top', y + 'px');
    obj.x = x;
    obj.y = y;
    var scope = obj;
    setAttr(el, 'class', 'Boom');
    setCss(scope.el, 'backgroundPosition', '0 0');
    var action = function() {
        if (scope.blastState < (scope.blastReason + 1)) {
            var b = scope.blastState * 64 * (-1);
            b = b + 'px 0';
            setCss(scope.el, 'backgroundPosition', b);
            scope.blastState++;
            setTimeout(action, 20);
        } 
/*        else {
            if (el!==null && el!=="undefined" && el) {
                getById('map').removeChild(el);
                scope = null;
                delete scope;
                delete obj;
                // delete obj;
            }
            // scope = null;
            // delete scope;
        }*/
        if (scope.el!==null && scope.el!=="undefined" && scope.el) {
            getById('map').removeChild(scope.el);
            // getById('map').removeChild(el);
        //     // scope = null;
        //     // delete scope;
        //     // delete obj;
        }
    };
    if (reason) {
        obj.blastReason = reason;
    }
    setTimeout(action, 20);

    // clearTimeout(obj.tid);
    // obj.tid = null;
    // scope = null;
            // delete scope;
            // delete obj;
    //    obj.blastState
}

function getRandomPos(){
    var randomWidth = Math.floor(Math.random()*MyGlobal.mapWidth/32);
    var randomHeight = Math.floor(Math.random()*MyGlobal.mapHeight/32);
    return [randomHeight, randomWidth];
}

function getMapsPos(){//change CSS add new class
    var mapsPos = [];
    var mapClass = ["rock", "stick", "grass", "bomb", "enegy"];
    for (var i = 0; i < mapClass.length; i++) {
        var maps = document.getElementsByClassName(mapClass[i]);
        for (var j = 0; j < maps.length; j++) {
            var pos = [Math.floor(parseInt(getCss(maps[j], "left"))/32), Math.floor(parseInt(getCss(maps[j] ,"top"))/32)];
            mapsPos.push(pos);
        }
    }
    return mapsPos;
}

function getTanksPos(){
    var tanksPos = [];
    var tanksClass = ["ennemy", "me"];
    for (var i = 0; i < tanksClass.length; i++) {
        var tanks = document.getElementsByClassName(tanksClass[i]);
        for (var j = 0; j < tanks.length; j++) {
            var pos = [Math.floor(parseInt(getCss(tanks[j], "left"))/32), Math.floor(parseInt(getCss(tanks[j] ,"top"))/32)];
            tanksPos.push(pos);
        }
    }
    return tanksPos;
}
// console.log(getMapsPos());
// console.info(getRandomPos());
// setInterval(setRdmMap(),500);
function getAvailablePos(){
    var aPos = getRandomPos(), tanksPos = getTanksPos(), mapsPos = getMapsPos();
    // if(pos in getMapsPos() || pos in getTanksPos()){
    for (var i = 0; i < tanksPos.length; i++) {
        if (aPos.toString()==tanksPos[i].toString()) {
            console.info("in");
            aPos = getRandomPos();
        }
    }
    for (i = 0; i < mapsPos.length; i++) {
        if (aPos.toString()==mapsPos[i].toString()) {
            console.info("in");
            aPos = getRandomPos();
        }
    }
/*    var node = document.createElement("div");
    setAttr(node, "class", "bomb");
    setCss(node, "left", aPos[0]*32+"px");
    setCss(node, "top", aPos[1]*32+"px");
    getById("map").appendChild(node);*/
    return aPos;
}