var circlecnt = 0, linecnt = 0;
var game = null;
var gamelevel = 0, gametotalcorret = 0, gametotalyou = 0;
function circle(posx, posy) {
    circlecnt++;
    this.thecell = document.createElement('div');
    this.parent = document.querySelector('#contain');
    this.thecell.className = 'cell';
    this.thecell.id = 'circle' + circlecnt;
    this.thecell.style.left = posx + 'px';
    this.thecell.style.top = posy + 'px';
    this.thecell.x = posx;
    this.thecell.y = posy;
    this.thecell.innerHTML = circlecnt;
    this.parent.appendChild(this.thecell);
}

function line(ind1, ind2, val) {
    var This = this;
    linecnt++;
    var len = (game.cir[ind1].thecell.x - game.cir[ind2].thecell.x) * (game.cir[ind1].thecell.x - game.cir[ind2].thecell.x) +
        (game.cir[ind1].thecell.y - game.cir[ind2].thecell.y) * (game.cir[ind1].thecell.y - game.cir[ind2].thecell.y);
    len = Math.floor(Math.sqrt(len));
    var posx = (game.cir[ind1].thecell.x + game.cir[ind2].thecell.x) / 2 + 20;
    var posy = (game.cir[ind1].thecell.y + game.cir[ind2].thecell.y) / 2 + 20;
    var k = (game.cir[ind1].thecell.y - game.cir[ind2].thecell.y) / (game.cir[ind1].thecell.x - game.cir[ind2].thecell.x);

    k = Math.atan(k) / 3.14159 * 180;

    var This = this;
    this.theline = document.createElement('div');
    this.parent = document.querySelector('#contain');
    this.theline.select = 0;
    this.theline.onmouseenter = function () {
        document.getElementById('info').innerHTML = "这条路连接" + ind1 + "号城市和" + ind2 + "号城市，长度为" + val;
        game.cir[ind1].thecell.style.boxShadow = '2px 5px 5px #888888';
        game.cir[ind2].thecell.style.boxShadow = '2px 5px 5px #888888';
    }
    this.theline.onmouseout = function () {
        game.cir[ind1].thecell.style.boxShadow = 'none';
        game.cir[ind2].thecell.style.boxShadow = 'none';
    }
    this.theline.onmousedown = function () {
        if (This.theline.select == 0) {
            var he = 0, ta = 0, que = [], vis = [], flag = 0;
            que[he] = ind1;
            vis[ind1] = 1;
            while (he <= ta) {
                var now = que[he];
                he++;
                console.log(now);
                for (var i = 1; i <= game.cirnum; i++) {
                    if (game.linkedge[now][i] && !vis[i]) {
                        console.log(now + " fint " + i);
                        if (i == ind2) {
                            flag = 1;
                            break;
                        }
                        vis[i] = 1;
                        que[++ta] = i;
                    }
                }
                if (flag) break;
            }
            if (!flag) {

                game.linkedge[ind1][ind2] = game.linkedge[ind2][ind1] = 1;
                This.theline.select = 1;
                This.theline.style.backgroundColor = 'yellow';
                game.youval += val;
                game.youedge += 1;
                document.getElementById('info2').innerHTML = "你已经选择了" + game.youedge + "条路，总长度为" + game.youval;
            } else {
                document.getElementById('info').innerHTML = "这条路连接的" + ind1 + "号城市和" + ind2 + "号城市已经直接或间接连接了，不能再连了";
            }
        } else {
            game.youval -= val;
            game.youedge -= 1;
            document.getElementById('info2').innerHTML = "你已经选择了" + game.youedge + "条路，总长度为" + game.youval;
            game.linkedge[ind1][ind2] = game.linkedge[ind2][ind1] = 0;
            This.theline.select = 0;
            This.theline.style.backgroundColor = '#78B811';
        }
    }


    this.theline.className = 'line';
    this.theline.id = 'line' + linecnt;
    This.theline.style.width = 0;
    var width = -200;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 500) {
            clearInterval(id);


        } else if (width >= 0 && width <= 200) {
            width++;
            This.theline.style.width = len * width / 200 + 'px';
            This.theline.style.left = posx - len * width / 400 + 'px';
        } else {

            width++;
        }
    }

    this.theline.style.left = posx + 'px';
    this.theline.style.top = posy + 'px';
    this.theline.style.transform = 'rotate(' + k + 'deg)';
    this.parent.appendChild(this.theline);


    this.num = document.createElement('div');
    this.num.className = "num";
    this.num.innerHTML = val;

    this.theline.appendChild(this.num);
}
Game.prototype.init = function () {
    this.cir = [];
    this.line = [];
    this.cx = [];
    this.cy = [];
    this.cirnum  = 0;
    this.cirnum = Math.round(Math.random()*5) + 10;
    this.xiege = 20;

    this.from = [];
    this.to = [];
    this.val = [];
    this.linkedge = [];
    this.youval = 0;
    this.youedge = 0;
    this.edgecnt = 0;
    this.fa = [];
    this.totalval = 0;
    circlecnt = 0, linecnt = 0;
}
function Game(level) {
    this.init();
    for (var i = 1; i <= this.cirnum; i++) {
        this.linkedge[i] = [];
    }
    //-450 450 -350 350 
    for (var i = 1; i <= this.cirnum; i++) {
        var flag = 1;
        while (flag) {
            flag = 0;
            this.cx[i] = Math.round(Math.random() * 1000);
            this.cy[i] = Math.round(Math.random() * 600);
            for (var j = 1; j < i; j++) {
                if (((this.cx[j] - this.cx[i]) * (this.cx[j] - this.cx[i]) + (this.cy[j] - this.cy[i]) * (this.cy[j] - this.cy[i])) < 4000) {
                    flag = 1;
                    break;
                }
            }
        }
        this.cir[i] = new circle(this.cx[i] - 500, this.cy[i] - 300)

    }
}
Game.prototype.create = function (level) {

    var link = [];
    var cnt = 0;
    var xie = [];
    var mindis;
    var ind = 0;
    var xiecnt = [];
    for (var i = 1; i <= this.cirnum; i++) {
        link[i] = [];
        xie[i] = [];
        xiecnt[i] = 0;
    }
    for (var i = 1; i <= this.cirnum; i++) {
        for (var va = 1; va <= 3; va++) {
            mindis = 999999;
            ind = 0;
            for (var j = 1; j <= this.cirnum; j++) {
                if (j == i) continue;
                var dis = (this.cx[j] - this.cx[i]) * (this.cx[j] - this.cx[i]) + (this.cy[j] - this.cy[i]) * (this.cy[j] - this.cy[i]);
                if (mindis > dis && !link[i][j]) {
                    var xiekk = (this.cy[i] - this.cy[j]) / (this.cx[j] - this.cx[i]);
                    console.log(this.cy[j], this.cy[i], this.cx[j], this.cx[i])
                    console.log(this.cy[i] - this.cy[j], this.cx[j] - this.cx[i])
                    xiekk = Math.atan(xiekk) / Math.PI * 180;
                    if (this.cx[j] - this.cx[i] < 0) xiekk += 180;
                    console.log("now " + i + " to " + j + " is " + xiekk);
                    var flag = 1;
                    for (var k = 1; k <= xiecnt[j]; k++) {
                        console.log("di " + k + " is " + xie[j][k]);
                        if ((xiekk + 180 - xie[j][k] < this.xiege) && (xiekk + 180 - xie[j][k] > -this.xiege)) {
                            console.log("break");
                            flag = 0;
                            break;
                        }
                    }
                    for (var k = 1; k <= xiecnt[i]; k++) {
                        console.log("me " + k + " is " + xie[i][k]);
                        if ((xiekk - xie[i][k] < this.xiege) && (xiekk - xie[i][k] > -this.xiege)) {
                            console.log("break");
                            flag = 0;
                            break;
                        }
                    }
                    if (flag) {
                        mindis = dis;
                        ind = j;
                    }
                }
            }


            if (!ind) break;
            var xiek = (this.cy[i] - this.cy[ind]) / (this.cx[ind] - this.cx[i]);
            xiek = Math.atan(xiek) / Math.PI * 180;


            xie[i][++xiecnt[i]] = xiek;
            xie[ind][++xiecnt[ind]] = xiek + 180;
            if (this.cx[ind] - this.cx[i] < 0) {
                xie[i][xiecnt[i]] += 180;
                xie[ind][xiecnt[ind]] -= 180;
            }
            console.log(i + " to " + ind + " addddd is " + xie[i][xiecnt[i]]);
            console.log(ind + " to " + i + " addddd is " + xie[ind][xiecnt[ind]]);
            var rn = Math.round(Math.random() * 99) + 1;
            link[i][ind] = link[ind][i] = 1;
            this.line[++this.edgecnt] = new line(i, ind, rn);
            this.from[this.edgecnt] = i;
            this.to[this.edgecnt] = ind;
            this.val[this.edgecnt] = rn;
        }
    }
}
function findd(x) {
    while (game.fa[x] != x)
        x = game.fa[x];
    return x;

}
Game.prototype.prim = function () {
    var hasedge = 0, vis = [];
    for (var i = 1; i <= 50; i++) {
        this.fa[i] = i;
    }

    for (var nu = 1; nu <= this.edgecnt; nu++) {
        var tmp = 9999, idx = 0;

        for (var i = 1; i <= this.edgecnt; i++) {
            if (vis[i]) continue;
            if (tmp > this.val[i]) {
                tmp = this.val[i];
                idx = i;
            }
        }
        vis[idx] = 1;

        var ta = 0, tb = 0;
        ta = findd(this.from[idx]);
        tb = findd(this.to[idx]);
        if (ta == tb) continue;
        else {
            this.fa[ta] = tb;
            this.totalval += this.val[idx];
            console.log(this.from[idx] + " he " + this.to[idx]);
            hasedge++;
            if (hasedge == this.cirnum - 1) return;
        }
    }
}
game = new Game();
game.create();
game.prim();
document.getElementById('main').style.display = 'none';
document.getElementById('board').style.display = 'none';

document.getElementById('donate').style.display = 'none';
document.getElementById('btn').onmouseover = function () {

    document.getElementById('main').style.display = 'inline-block';
    document.getElementById('telldis').innerHTML = "悄咪咪告诉你，最少需要走" + game.totalval + "的距离。";
}
document.getElementById('btn').onmouseleave = function () {

    document.getElementById('main').style.display = 'none';
}
document.getElementById('btn2').onmouseup = function () {
    if (game.youedge == game.cirnum - 1) {
        
    document.getElementById('info').innerHTML = ' ';
    document.getElementById('info2').innerHTML = ' ';

        document.getElementById('board').style.display = 'inline-block';
        document.getElementById('tellans').innerHTML = "你一共使用了" + game.youval + ",但实际上只要" + game.totalval + "就行了。";
   
        gamelevel++;
        gametotalcorret += game.totalval;
        gametotalyou += game.youval;
        document.getElementById('info3').innerHTML = "一共进行了" + gamelevel + "关";
        var per = Math.floor(gametotalyou * 100 / gametotalcorret) - 100;
        document.getElementById('info4').innerHTML = "误差率为" + per + "%";

    }else
    {
        document.getElementById('info').innerHTML = "你还没有把所有城市连接！不能选下一关！";
    }
}

document.getElementById('btn4').onmouseup= function () {
     document.getElementById('board').style.display = 'none';
    document.getElementById('contain').innerHTML = '';
    game = new Game();
    game.create();
    game.prim();
}
document.getElementById('btn3').onmouseover = function () {

    document.getElementById('donate').style.display = 'inline-block';
}
document.getElementById('btn3').onmouseleave = function () {

    document.getElementById('donate').style.display = 'none';
}