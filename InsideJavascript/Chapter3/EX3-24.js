var arr = ['bar'];
var obj = {
    name : 'foo',
    length : 1
};

arr.push('baz');
console.log(arr); // ['bar', 'baz']

obj.push('baz'); // error