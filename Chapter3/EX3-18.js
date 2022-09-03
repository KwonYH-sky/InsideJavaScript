// arr 배열 생성
var arr = ['zero', 'one', 'two'];

// push() 매서드 호출
arr.push('three');
console.log(arr); // [ 'zero', 'one', 'two', 'three' ]

// length 값 변경 후, push() 매서드 호출
arr.length = 5;
arr.push('four');
console.log(arr); // [ 'zero', 'one', 'two', 'three', <1 empty item>, 'four' ]