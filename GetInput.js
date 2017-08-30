exports.execute = function execute(fn) {
    process.stdin.setEncoding( 'utf8' );
    process.stdin.on( 'readable', function() {
        var chunk = process.stdin.read();
        var inputLineArr;
        //在程序运行时该事件会有响应，输入内容为null，在此处过滤
        if ( chunk !== null ) {
            //不同行以字符\n为间隔
            inputLineArr = chunk.split('\n');
            //输入流尾部有可能会有一个空字符串，在此过滤掉
            if( inputLineArr[inputLineArr.length-1] == '' )
            inputLineArr.pop();

            fn(inputLineArr);
        }
    } );
}
