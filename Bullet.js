var Bullet = function(dir) {
    this.direction = dir ? dir : 'up';
    this.speed = 2;
    var factor = 0; 
    this.tid = null;
    this.activeState = 0;
    this.blastState = 0; 
    this.blastReason = 0; 
    this.x = 0;
    this.y = 0;
    if (dir) {
        switch (dir) {
            case 'up':
                factor = 0;
                break;
            case 'right':
                factor = 1;
                break;
            case 'down':
                factor = 2;
                break;
            case 'left':
                factor = 3;
                break;
        }
    }
    var el = document.createElement('div');
    var bp = 'background-position :' + (0 - 8 * factor) + 'px  0 ;';
    el.setAttribute('style', bp);
    el.setAttribute('class', 'bullet');
    this.el = el;
};

Bullet.prototype.move = function() {
    var bullet = this.el;
    var dir = this.direction;
    var xpos = getCss(bullet, 'left') ? getCss(bullet, 'left') : 0;
    var ypos = getCss(bullet, 'top') ? getCss(bullet, 'top') : 0;
    xpos = parseInt(xpos);
    ypos = parseInt(ypos);
    var mx = MyGlobal.mapWidth - 8;
    var my = MyGlobal.mapHeight - 8;
    var stop = false;

/*    var rocks = document.getElementsByClassName("rock");
    var grasses = document.getElementsByClassName("grass");
    var sticks = document.getElementsByClassName("stick");*/
    var obj = {"xpos":xpos, "ypos":ypos};
    switch (dir) {
        case 'up':
            if (ypos <= 0 || Map.BulletConflictMaps(obj, rocks) ) {
                stop = true;
            } else {
                ypos--;
            }
            break;
        case 'right':
            if (xpos >= mx||Map.BulletConflictMaps(obj, rocks) ) {
                stop = true;
            } else {
                xpos++;
            }
            break;
        case 'down':
            if (ypos >= my||Map.BulletConflictMaps(obj, rocks) ) {
                stop = true;
            } else {
                ypos++;
            }
            break;
        case 'left':
            if (xpos <= 0 ||Map.BulletConflictMaps(obj, rocks) ) {
                stop = true;
            } else {
                xpos--;
            }
            break;
        default:
            break;
    }

    //check if blast during Object move
    if (Map.BltDamageMaps(obj, sticks)) {stop=true;}
    if (Map.BulletConflictMaps(this, rocks)) {stop = true;}
    for (var i = 0; i < MyGlobal.enemyArray.length; i++) {
        if (MyGlobal.enemyArray[i].destroy(this)){stop=true;}
    }
    if(myTank.destroy(this)){stop=true;}

    setCss(bullet, 'left', xpos + 'px');
    setCss(bullet, 'top', ypos + 'px');
    this.x = xpos;
    this.y = ypos;

    var scope = this;
    var speed = this.speed;
    var repeat = function() {
        scope.move();
    };
    if (this.tid) {
        clearTimeout(this.tid);
        this.tid = null;
    }
    if (!this.tid) {
        this.tid = setTimeout(repeat, speed);
    }
    if (stop) {
        this.blast();
    }

};

Bullet.prototype.blast = function(reason) {
    var el = this.el;
    var x = this.x - 28;
    var y = this.y - 28;
    setCss(el, 'left', x + 'px');
    setCss(el, 'top', y + 'px');
    this.x = x;
    this.y = y;
    var scope = this;
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
                delete this;
                // delete this;
            }
            // scope = null;
            // delete scope;
        }*/
        if (scope.el!==null && scope.el!=="undefined" && scope.el) {
            getById('map').removeChild(scope.el);
            // getById('map').removeChild(el);
        //     // scope = null;
        //     // delete scope;
        //     // delete this;
        }
    };
    if (reason) {
        this.blastReason = reason;
    }
    setTimeout(action, 20);

    clearTimeout(this.tid);
    this.tid = null;
    // scope = null;
            // delete scope;
            // delete this;
    //    this.blastState
};
