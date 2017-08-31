var execute = require('../GetInput.js').execute;
execute(function(input) {
    main(input[0]);
});

/**
 * @input n
 * @output abcde/fghij
 */
function main(n) {
    let fghij_min = 1234,
        fghij_max = 87654;
    let r = [];
    for (let i = fghij_min; i <= fghij_max; i++) {
        let abcde = i * n;
        let ii = i < 10000 ? '0' + i : i;
        let all = abcde.toString() + ii;
        if (! haveDu(all)) {
            r.push(abcde + '/' + ii + ' = ' + n);
        }
    }

    for (let i = 0; i < r.length; i++) {
        console.log(r[i]);
    }
}

function haveDu(str) {
    for (let i = 0; i < str.length; i++) {
        let cur = str.substr(i, 1);
        let rest = str.slice(0, i) + str.slice(i+1);
        if (rest.indexOf(cur) !== -1) {
            return true;
        }
    }
    return false;
}
