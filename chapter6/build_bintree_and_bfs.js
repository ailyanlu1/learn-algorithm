var execute = require('../GetInput.js').execute;

class Node {
    constructor({
        v = null,
        left = null,
        right = null
    }) {
        this.v = v;
        this.left = left;
        this.right = right;
    }
}

var root = new Node({})

function parseInput(input) {
    input = input[0].split(' ');
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '()') {
            break;
        }
        let aNodeInfo = input[i].replace(/\(|\)/g, '').split(',');
        if (! addNode.apply(this, aNodeInfo))
            return false;
    }
    return true;
}

function addNode(v, p) {
    let n = root;
    for (let i = 0; i < p.length; i++) {
        if (p[i] === 'L') {
            if (n.left === null) {
                n.left = new Node({});
            }
            n = n.left;
        } else if( p[i] === 'R') {
            if (n.right === null) {
                n.right = new Node({});
            }
            n = n.right;
        }
    }
    if (n.v !== null) {
        return false;
    }
    n.v = v;
    return true;
}

function bfs(root) {
    let q = new Array();
    q.push(root);
    let r = [];
    while(q.length !== 0) {
        let n = q.shift();
        if (n.left)
            q.push(n.left);
        if (n.right)
            q.push(n.right);
        if (!n.v)
            return -1
        r.push(n.v);
    }

    return r.join(' ');
}

execute(function(input) {
    if (! parseInput(input)) {
        console.log(-1);
        return -1;
    }
    let r = bfs(root);
    console.log(r);
    return r;
});

