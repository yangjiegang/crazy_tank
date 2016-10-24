var Map = {
    map: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 4, 0, 5, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //change it to for loop or recursive
    ],
    Init: function() {
        for (var i = 0; i < Map.map.length; i++) {
            for (var j = 0; j < Map.map[i].length; j++) { //package codes
                if (Map.map[i][j] == 1) {
                    var el = document.createElement("div");
                    el.className = "rock";
                    setCss(el, "left", j * 32 + "px");
                    setCss(el, "top", i * 32 + "px");
                    getById("map").appendChild(el);
                } else if (Map.map[i][j]==2) {
                    var stickEle = document.createElement("div");
                    stickEle.className = "stick";
                    setCss(stickEle, "left", j * 32 + "px");
                    setCss(stickEle, "top", i * 32 + "px");
                    getById("map").appendChild(stickEle);
                } else if (Map.map[i][j]==3) {
                    var grassEle = document.createElement("div");
                    grassEle.className = "grass";
                    setCss(grassEle, "left", j * 32 + "px");
                    setCss(grassEle, "top", i * 32 + "px");
                    getById("map").appendChild(grassEle);
                } else if (Map.map[i][j]==4) {
                    var bombEle = document.createElement("div");
                    bombEle.className = "bomb";
                    setCss(bombEle, "left", j*32+"px");
                    setCss(bombEle, "top", i * 32 + "px");
                    getById("map").appendChild(bombEle);
                } else if (Map.map[i][j]==5) {
                    var enegyEle = document.createElement("div");
                    enegyEle.className = "enegy";
                    setCss(enegyEle, "left", j*32+"px");
                    setCss(enegyEle, "top", i * 32 + "px");
                    getById("map").appendChild(enegyEle);   
                }
            }
        }
    },
    /*    avoidX: function(x) {
            var rockLeft = document.getElementsByClassName("rock"); //[0].style.left;
            for (var i = 0; i < rockLeft.length; i++) {
                var l = parseInt(getCss(rockLeft[i], "left"));
                if (x > l + 8 && x < l + 32 + 8) {
                // if (x > l && x < l +32) {
                    console.info("l:",l );
                    return true;
                }
            }
        },
        avoidY: function(y) {
            var rockTop = document.getElementsByClassName("rock"); //[0].style.top;
            //console.log(rockTop);
            for (var i = 0; i < rockTop.length; i++) {
                var t = parseInt(getCss(rockTop[i], "top"));
                if (y > t + 8 && y < t + 32 + 8) {
                // if (y > t && y < t + 32) {//number 8 is adjust factor
                    console.info("t:", t );
                    return true;
                }
            }
        },*/
    conflict: function(xpos, ypos) {
        var rocks = document.getElementsByClassName("rock");
        for (var i = rocks.length - 1; i >= 0; i--) {
            var rockLeft = parseInt(getCss(rocks[i], "left"));
            var rockTop = parseInt(getCss(rocks[i], "top"));
            if (xpos > rockLeft + 8 && xpos < rockLeft + 32 + 8 && ypos > rockTop + 8 && ypos < rockTop + 32 + 8) {
                return true;
            }
        }
    },
    conflictWithTank: function(xpos, ypos) {
        var rocks = document.getElementsByClassName("rock");
        for (var i = rocks.length - 1; i >= 0; i--) {
            var rockLeft = parseInt(getCss(rocks[i], "left"));
            var rockTop = parseInt(getCss(rocks[i], "top"));
            if (
                /*(xpos > rockLeft + 16 && xpos < rockLeft + 32 - 16 &&
                                 ypos > rockTop + 16 && ypos < rockTop + 32 - 16) || */
                (xpos + 16+32 > rockLeft + 16 && xpos < rockLeft + 16 + 16) &&
                (ypos + 16+32 > rockTop + 16 && ypos < rockTop + 16 + 16)
            ) {
                return true;
            }
        }
    },
    TankConflicMaps:function(obj1, objs2){//obj1:tank , objs2:maps
        for (var i = objs2.length - 1; i >= 0; i--) {
            var mapLeft = parseInt(getCss(objs2[i], "left"));
            var mapTop = parseInt(getCss(objs2[i], "top"));
            if (
                (obj1.xpos + 16+32 > mapLeft + 16 && obj1.xpos < mapLeft + 16 + 16) &&
                (obj1.ypos + 16+32 > mapTop + 16 && obj1.ypos < mapTop + 16 + 16)
            ) {
                return true;
            }
        }
    },
    BulletConflictMaps:function(blt, maps){
        for (var i = maps.length - 1; i >= 0; i--) {
            var mapLeft = parseInt(getCss(maps[i], "left"));
            var mapTop = parseInt(getCss(maps[i], "top"));
            if (blt.xpos + 8 > mapLeft+16 && blt.xpos < mapLeft + 16 + 16 && blt.ypos+8 > mapTop + 16 && blt.ypos < mapTop + 16 + 16) {
                // document.getElementById("map").removeChild(maps[i]);
                return true;
            }
        }
    },
    BltDamageMaps:function(blt, maps){
        for (var i = maps.length - 1; i >= 0; i--) {
            var mapLeft = parseInt(getCss(maps[i], "left"));
            var mapTop = parseInt(getCss(maps[i], "top"));
            if (blt.xpos + 8 > mapLeft+16 && blt.xpos < mapLeft + 16 + 16 && blt.ypos+8 > mapTop + 16 && blt.ypos < mapTop + 16 + 16) {
                document.getElementById("map").removeChild(maps[i]);
                return true;
            }
        }  
    },
    TankConflicAddons:function(tank, addons){
         for (var i = addons.length - 1; i >= 0; i--) {
            var addonLeft = parseInt(getCss(addons[i], "left"));
            var addonTop = parseInt(getCss(addons[i], "top"));
            if (tank.xpos + 16+32 > addonLeft+16 && tank.xpos < addonLeft + 16 + 16 && tank.ypos+16+32 > addonTop + 16 && tank.ypos < addonTop + 16 + 16) {
                if (addons[i].className=="enegy") {
                    tank.enegy++;
                } else if (addons[i].className=="bomb") {
                    var enegyEles = document.getElementsByClassName("enemy");
                    for (var j = 0; j < enegyEles.length; j++) {
                        blast(enegyEles[j], 1);
                        getById("map").removeChild(enegyEles[j]);
                        MyGlobal.enemyArray.remove(MyGlobal.enemyArray[j]);
                    }
                    // enemyArray.splice(0, enemyArray.length);
                }
                document.getElementById("map").removeChild(addons[i]);
                return true;
            }
        }         
    },

};
