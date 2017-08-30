var execute = require('../GetInput.js').execute;
// PreOrder(T) = Root(T) + PreOrder(Left(T)) + PreOrder(Right(T))
// InOrder(T) = InOrder(Left(T)) + Root(T) + InOrder(Right(T))
// PostOrder(T) = PostOrder(Left(T)) + PostOrder(Right(T)) + Root(T)
execute(function(input) {
    input = input[0].split(' ');
    main(input[0], input[1]);
});

/**
 * @input PreOrder, InOrder
 * @output PostOrder
 */
function main(preOrder, inOrder) {
    console.log(rebuild(preOrder, inOrder));

    function rebuild(preO, inO) {
        if (preO.length === 0)
            return '';
        let root = preO[0];
        let left = inO.slice(0, inO.indexOf(root));
        let right = inO.slice(inO.indexOf(root) + 1);
        return rebuild(preO.substr(1, left.length), left)
            + rebuild(preO.substr(-right.length, right.length), right)
            + root;
    }
}
