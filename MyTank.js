// var MyTank = new Tank("me","up");

function MyTank(id, dir, x, y){
	    this.el = getById(id);
	    // this.direction = dir ? dir : 'up';
	    // this.tid = null;
	    this.speed = 10;
	    this.enegy = 3;
	    // this.activeState = 0;
	    this.x = x ? x : 100;
	    this.y = y ? y : 200;
/*	    this.dirState = {
	        up: 1,
	        right: 1,
	        down: 1,
	        left: 1
	    };*/
	    // var dir = this.direction;
	    var tank = this.el;
	    setCss(tank, 'left', this.x + 'px');
	    setCss(tank, 'top', this.y + 'px');
	    this.setDirection(this.direction);

	    this.destroy =  function(blt) {
		    // if ((blt.x > this.x - 16 && blt.x < this.x + 16) && (blt.y > this.y - 16 && blt.y < this.y + 16)) {
			if ((blt.x+4 > this.x && blt.x < this.x+16) && (blt.y+4 > this.y && blt.y < this.y + 16)) {		        
				// blt.blast();//bullet blast again ???
				console.log(this, blt);
				blt = null;
				// delete blt;
		        
		        if (this.enegy>1) {
		        	this.enegy--;
		        	return true;
		        } else {		        	
		        	getById("map").removeChild(this.el);
		        	alert("Game Over! Your tank were destroyed by bomb!");
		        	return true;
		        }
		    }
		};

}
/*MyTank.prototype.init = function(id, dir, x, y) {
	    this.el = getById(id);
	    this.direction = dir ? dir : 'up';
	    this.tid = null;
	    this.speed = 10;
	    this.activeState = 0;
	    this.x = x ? x : 100;
	    this.y = y ? y : 200;
	    this.dirState = {
	        up: 1,
	        right: 1,
	        down: 1,
	        left: 1
	    };
	    // var dir = this.direction;
	    var tank = this.el;
	    setCss(tank, 'left', this.x + 'px');
	    setCss(tank, 'top', this.y + 'px');
	    setDirection(this.direction);
	    // this.setDirection(this.direction);
	};*/
/*MyTank.prototype.destroy =  function(blt) {
	    if ((blt.x > this.x - 16 && blt.x <= this.x + 16) && (blt.y > this.y - 16 && blt.y <= this.y + 16)) {
	        blt.blast();
	        getById("map").removeChild(this.el);
	        alert("Game Over! Your tank were destroyed by bomb!");
	    }
	};*/
MyTank.prototype = new Tank("me","up");

//Keyboard Control
function getDir(code) {
    if (code == '87' || code == '119') {
        return 'up';
    }
    if (code == '100' || code == '68') {
        return 'right';
    }
    if (code == '115' || code == '83') {
        return 'down';
    }
    if (code == '97' || code == '65') {
        return 'left';
    }
    return null;
}
document.onkeydown = function(evt) {
    evt = (evt) ? evt : window.event;
    var keyCode = evt.keyCode;
    var charCode = evt.charCode;
    var dir = getDir();
    if (keyCode) {
        dir = getDir(keyCode.toString());
    }
    if (charCode) {
        dir = getDir(charCode.toString());
    }
    if (dir)
        myTank.move(dir);
    if (charCode == '106' || keyCode == '74') {
        myTank.fire();
    }
    evt.preventDefault();
    return false;
};
document.onkeyup = function(evt) {
    myTank.stop();
};
/*document.onkeypress = function(evt) {
    evt = (evt) ? evt : window.event;
    var keyCode = evt.keyCode;
    var charCode = evt.charCode;
    var dir = getDir();
    if (keyCode) {
        dir = getDir(keyCode.toString());
    }
    if (charCode) {
        dir = getDir(charCode.toString());
    }
    if (dir)
        myTank.move(dir);
    if (charCode == '106' || keyCode == '74') {
        myTank.fire();
    }
    evt.preventDefault();
    return false;
};*/