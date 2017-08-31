var execute = require('../GetInput.js').execute;

execute(function(input) {
    main(input[0].split(' '));
});

/**
 * @input array P
 * @output full array of P
 */
function main(P) {
    let result = [];
    P.sort((a, b) => {
        return a - b;
    });
    let PInfo = genPInfo(P);

    for (let i = 0; i < P.length; i++) {
        if (P[i] !== P[i+1]) {
            gen(P[i]);
        }
    }

    print(result);
    
    function print(r) {
        for (let i = 0; i < r.length; i++) {
            console.log(r[i]);
        }
    }

    function gen(head) {
        if (head.length === P.length) {
            result.push(head);
            return ;
        }
        for (let i = 0; i < P.length; i++) {
            if (! isDu(head, P[i]) && P[i] !== P[i+1]) {
                gen(head + P[i]);
            }
        }
    }

    // 生成每个元素存在次数的哈希表
    function genPInfo(P){
        let r = {};
        for (let i = 0; i < P.length; i++) {
            if (! r[P[i]]) {
                r[P[i]] = 1;
            } else {
                r[P[i]]++;
            }
        }
        return r;
    }

    // 判断某元素在已组元素中的出现次数是否超过在P中的个数
    function isDu(head, e) {
        let num = 0;
        let posi = -1;
        while ((posi = head.indexOf(e)) !== -1) {
            head = head.slice(posi + 1);
            num++;
        }

        if (num < PInfo[e]) {
            return false;
        } else {
            return true;
        }
    }
}


