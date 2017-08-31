var execute = require('../GetInput.js').execute;

execute(function(input) {
    main(parseInt(input[0]));
});

/**
 * @input n
 * @output full array
 */
function main(n) {
    result = [];

    for (let i = 1; i <= n; i++) {
        gen(i.toString());
    }

    console.log(result.length);
    // print(result);

    function print(r) {
        for (let i = 0; i < r.length; i++) {
            console.log(r[i]);
        }
    }

    function gen(head) {
        if (head.length === n) {
            result.push(head);
            return ;
        }
        for (let i = 1; i <= n; i++) {
            if (head.indexOf(i.toString()) === -1) {
                gen(head + i.toString());
            }
        }
    }
}

