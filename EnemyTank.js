// var EnemyTank = new Tank();
EnemyTank.prototype = new Tank("enemy", "down");

function EnemyTank(id, dir, x, y) {
    this.direction = dir ? dir : 'down'; //override
    this.x = x ? x : 200;
    this.y = y ? y : 200;
    this.speed = 400;
    this.el = document.createElement("div");
    this.el.className = "enemy";
    setCss(this.el, 'left', this.x + 'px');
    setCss(this.el, 'top', this.y + 'px');
    getById("map").appendChild(this.el);

    this.getDir = function() {
        var code = Math.random() * 4;
        code = Math.floor(code);
        switch (code) {
            case 0:
                //this.eDir = 'up';
                //ypos <= 0 ? 0 : ypos--;
                this.direction = 'up';
                break;
            case 1:
                this.direction = 'right';
                //xpos >= mx ? mx : xpos++;
                break;
            case 2:
                this.direction = 'down';
                //ypos >= my ? my : ypos++;
                break;
            case 3:
                this.direction = 'left';
                //xpos <= 0 ? 0 : xpos--;
                break;
            default:
                this.direction = 'down';
                break;
        }
        return this.direction;
    };
    //override
    this.move = function() {
        var dir = this.direction;
        var xpos = getCss(this.el, 'left') ? getCss(this.el, 'left') : 0;
        var ypos = getCss(this.el, 'top') ? getCss(this.el, 'top') : 0;
        xpos = parseInt(xpos);
        ypos = parseInt(ypos);
        var mx = MyGlobal.mapWidth - 32;
        var my = MyGlobal.mapHeight - 32;
        var prevXpos = xpos, prevYpos = ypos;
        switch (dir) {
            case 'up':
                ypos = ypos <= 0 ? 0 : ypos - 1;
                break;
            case 'right':
                xpos = xpos >= mx ? mx : xpos + 1;
                break;
            case 'down':
                ypos = ypos >= my ? my : ypos + 1;
                break;
            case 'left':
                xpos = xpos <= 0 ? 0 : xpos - 1;
                break;
            default:
                break;
        }
        var rocks = document.getElementsByClassName("rock");
		var grasses = document.getElementsByClassName("grass");
		var sticks = document.getElementsByClassName("stick");
        var obj = {"xpos":xpos, "ypos":ypos};
        // if (Rock.conflictWithTank(xpos, ypos)) {xpos = prevXpos; ypos = prevYpos;}
        if (Map.TankConflicMaps(obj, rocks) || Map.TankConflicMaps(obj, sticks)) {xpos = prevXpos; ypos = prevYpos;}
        setCss(this.el, 'left', xpos + 'px');
        setCss(this.el, 'top', ypos + 'px');
        this.x = xpos;
        this.y = ypos;
    };
    this.rush = function(myTank) {
        var ex = this.x;
        var ey = this.y;
        var mx = myTank.x;
        var my = myTank.y;
        if ((mx >= ex - 16 && mx <= ex + 16) && (my >= ey - 16 && my <= ey + 16)) {
            getById("me").style.display = "none";
            alert("Game Over! Your tank were destroyed by rush attack!");
        }
    };
    this.destroy = function(blt) {
        if ((blt.x > this.x - 16 && blt.x <= this.x + 16) && (blt.y > this.y - 16 && blt.y <= this.y + 16)) {
            blt.blast();
            getById("map").removeChild(this.el);
            MyGlobal.enemyArray.remove(this);
            // enemyArray.splice(enemyArray.indexOf(this), 1);
            scores++;
        }
    };
    this.fireOrNot = function(){
	    var factor = Math.random();
	    var flag = factor>0.7 ? true:false;
	    return flag;
	};

}
