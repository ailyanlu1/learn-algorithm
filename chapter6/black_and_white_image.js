var execute = require('../GetInput.js').execute;
execute(function(input) {
    let ima = input.map(e => {
        return e.split('').map(e => {return parseInt(e);});
    });
    let n = ima.length;
    let rec = new Array(n);
    for (let i = 0; i <= n; i++) {
        rec[i] = new Array(n);
    }

    console.log(main(n, ima, rec));
});

/**
 * @input n * n binary image
 * @output num of joined region
 */

function main(n, ima, rec) {

    let count = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (ima[i][j] && (! rec[i][j])) {
                count++;
                dfs(i, j);
            }
        }
    }
    function dfs(x, y) {
        if (x < 0 || y < 0 || x >= n || y >= n) {
            return ;
        }
        if (!ima[x][y] || rec[x][y]) {
            return ;
        }
        rec[x][y] = 1;
        dfs(x-1, y-1); dfs(x, y-1); dfs(x+1, y-1);
        dfs(x-1, y);                dfs(x+1, y);
        dfs(x-1, y+1); dfs(x, y+1); dfs(x+1, y+1);
    }

    return count;
}

