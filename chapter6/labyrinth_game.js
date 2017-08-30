var execute = require('../GetInput.js').execute;

execute(function(input) {
    let ima = input.map(e => {
        return e.split('');
    });
    let n = ima.length,
        m = ima[0].length;
    let od = getOandD(ima, n, m);
    let rec = createBlankImage(n, m);

    main(n, m, ima, rec, od);

});

/**
 * @input n * m labyrinth
 *  origin marked with 'o'; 
 *  destination marked with 'd';
 *  barrier marked with '0'
 * @output  n * m labyrinth with right track marked with '1'
 */

const O = 'o';
const B = '0';
const D = 'd';
const T = 1;

// 获取起始点坐标
function getOandD(ima, n, m) {
    let r = {o: {}, d: {}};
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (ima[i][j] === O) {
                r.o.x = i;
                r.o.y = j;
            } else if (ima[i][j] === D) {
                r.d.x = i;
                r.d.y = j;
            }
        }
    }
    return r;
}

// 创建空地图
function createBlankImage(n, m) {
    let img = new Array(n);
    for (let i = 0; i < n; i++) {
        img[i] = new Array(m);
        for (let j = 0; j < m; j++) {
            img[i][j] = 0;
        }
    }
    return img;
}

class Node {
    constructor(x, y, parn) {
        this.x = x;
        this.y = y;
        this.parn = parn; // 父节点
        this.child = []; // 子节点
        this.num = parn !== null ? parn.num + 1 : 0; // 一条路中的第几个节点
        this.end = 0; // 是否是最后一个节点（靠近终点的节点）
    }
}

function main(n, m, ima, rec, od) {
    let q = new Array();
    let o = od.o, d = od.d;
    let Origin = new Node(o.x, o.y, null);
    q.push(Origin);
    r = null;

    while(q.length !== 0) {
        let n = q.shift();
        explore(n);
        for (let i = 0; i < n.child.length; i++) {
            q.push(n.child[i]);
        }
        if (n.end) {
            if (! r || r.num > n.num) {
                r = n;
            }
        }
    }
    draw(r);

    function draw(r) {
        let bln = createBlankImage(n, m);
        while (r) {
            bln[r.x][r.y] = T;
            r = r.parn;
        }
        bln[o.x][o.y] = T;
        bln[d.x][d.y] = T;
        for (let i = 0; i < bln.length; i++) {
            console.log(bln[i]);
        }
        console.log('\n');
    }

    // 探路
    function explore(parn) {
        let x = parn.x,
            y = parn.y;
        let re = [
            addNode(x, y-1, parn),
            addNode(x, y+1, parn),
            addNode(x-1, y, parn),
            addNode(x+1, y, parn)
        ];
        if (! (re[0] || re[1] || re[2] || re[3])) {
            deleteAPath(parn);
        }
    }

    // 添加节点
    function addNode(x, y, parn) {
        if ( x < 0 || y < 0
            || x >= n || y >= m
            || rec[x][y] 
            || ima[x][y] === B) {
            return false;
        } else if (ima[x][y] === D) {
            parn.end = 1;
            return true;
        } else {
            rec[x][y] = 1;
            parn.child.push(new Node(x, y, parn));
            return true;
        }
    }

    // 删除一条路
    function deleteAPath(currNode) {
        let parn = currNode.parn;
        let index;
        if (parn.child.length > 1) {
            parn.child.forEach((e, i) => {
                if (e === currNode) {
                    index = i;
                }
            });
            parn.child.splice(index, 1);
        } else {
            deleteAPath(parn);
        }
    }
}
