function Tank(id, dir){
    // this.direction = dir? dir : 'up';
    // this.el = getById(id);
    this.el = null;
    this.direction = dir ? dir : 'up';
    this.tid = null;
    this.enegy = 3;
    // this.speed = 10;
    this.activeState = 0;
    // this.x = x ? x : 100;
    // this.y = y ? y : 200;
    this.dirState = {
        up: 1,
        right: 1,
        down: 1,
        left: 1
    };
}

Tank.prototype.setDirection = function() {
    var tank = this.el, dir = this.direction;
    if (dir == 'up') {
        setCss(tank, 'backgroundPosition', '0 0');
    }
    if (dir == 'right') {
        setCss(tank, 'backgroundPosition', '-5px -36px');
    }
    if (dir == 'down') {
        setCss(tank, 'backgroundPosition', '0 -73px');
    }
    if (dir == 'left') {
        setCss(tank, 'backgroundPosition', '0 -105px');
    }
    this.dirState[dir] = 1;
};
Tank.prototype.move = function(dir) {
    if (this.activeState !== 0) return false; 
    this.activeState = 1; 
    if (this.direction != dir) {
        this.direction = dir;
        this.setDirection(dir);
    }
    if (this.tid) {
        clearTimeout(this.tid);
        this.tid = null;
    }
    var state = this.dirState[dir];
    var tank = this.el;
    if (state == 1 || state == -1) {
        var strPos = getCss(tank, 'backgroundPosition');
        var arrPos = strPos.split(' ');
        var l = arrPos ? arrPos[0] : 0;
        var t = arrPos ? arrPos[1] : 0;
        var curPos = parseInt(l);
        var top = parseInt(t);
        var po = curPos - (40) * (state);
        curPos = po + 'px ' + top + 'px';
        // var curPos = po + 'px ' + top + 'px';
        setCss(tank, 'backgroundPosition', curPos);
        this.dirState[dir] = state == 1 ? -1 : 1;
    }
    var xpos = getCss(tank, 'left') ? getCss(tank, 'left') : 0;
    var ypos = getCss(tank, 'top') ? getCss(tank, 'top') : 0;
    xpos = parseInt(xpos);
    ypos = parseInt(ypos);
    var mx = MyGlobal.mapWidth - 32;
    var my = MyGlobal.mapHeight - 32;
    var prevXpos = xpos, prevYpos = ypos;
    switch (dir) {
        case 'up':
            ypos = ypos <= 0 ? 0 : ypos - 1;
            // if ( Rock.conflictWithTank(xpos, ypos) ){ypos++;}
            // ypos <= 0 ? 0 : ypos--;
            break;
        case 'right':
            xpos = xpos >= mx ? mx : xpos + 1;
            // if ( Rock.conflictWithTank(xpos, ypos) ){xpos--;}
            // xpos >= mx ? mx : xpos++;
            break;
        case 'down':
            ypos = ypos >= my ? my : ypos + 1;
            // if ( Rock.conflictWithTank(xpos, ypos) ){ypos--;}
            // ypos >= my ? my : ypos++;
            break;
        case 'left':
            xpos = xpos <= 0 ? 0 : xpos - 1;
            // if ( Rock.conflictWithTank(xpos, ypos) ){xpos++;}
            // xpos <= 0 ? 0 : xpos--;
            break;
    }
    
/*    var rocks = document.getElementsByClassName("rock");
    var grasses = document.getElementsByClassName("grass");
    var sticks = document.getElementsByClassName("stick");
    var bombs = document.getElementsByClassName("bomb");
    var enegys = document.getElementsByClassName("enegy");*/
    var obj = {"xpos":xpos, "ypos":ypos, "enegy":this.enegy};
    if (Map.TankConflicMaps(obj, rocks)||Map.TankConflicMaps(obj, sticks)) {xpos = prevXpos; ypos = prevYpos;}
    Map.TankConflicAddons(obj, enegys);
    Map.TankConflicAddons(obj, bombs);

    setCss(tank, 'left', xpos + 'px');
    setCss(tank, 'top', ypos + 'px');
    this.x = xpos;
    this.y = ypos;
    this.enegy = obj.enegy;
    var scope = this;
    var speed = this.speed;
    var repeat = function() {
        scope.move(dir);
    };
    if (!this.tid) {
        this.tid = setTimeout(repeat, speed);
    }
    this.activeState = 0;
};

Tank.prototype.stop = function() {
    clearTimeout(this.tid);
    this.tid = null;
};

Tank.prototype.fire = function() {
    var bullet = new Bullet(this.direction);
    var l,t;
    switch(this.direction){
        case "up":
        l = this.x+16;
        t = this.y-16-1;
        break;
        case "right":
        l = this.x+16+1;
        t = this.y+16;
        break;
        case "down":
        l = this.x+16;
        t = this.y+16+1;
        break;     
        case "left":
        l = this.x-16-1;
        t = this.y+16;
        break;
        default:
        break;
    }
    // var el = bullet.el;
    setCss(bullet.el, 'top', t+'px');
    setCss(bullet.el, 'left', l+'px');
    getById('map').appendChild(bullet.el);
    bullet.move();
};

