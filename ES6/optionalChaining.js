// 옵셔널 체이닝 '?.'
// 옵셔널 체이닝(optional chaining) ?.을 사용하면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근 할 수 있다.

/** 옵셔널 체이닝이 필요한 이유
 * 만약 사용자가 여러 명 있는데 그 중 몇 명은 주소 정보를 가지고 있지 않다고 가정해보자.
 * 이럴 때 uer.address.street를 사용해 주소 정보에 접근하면 에러가 발생할 수 있다.
 */

let user = {}; // 주소 정보가 없는 사용자
alert(user.address.street); // TypeError: Cannot read property 'street' of undefined

/* 또 다른 사례론 브라우저에서 동작하는 코드르 개발할 때 밸생할 수 있는 문제가 있다. 
 * 자바스크립트를 사용해 페이지에 존재하지 않는 요소에 접근해 요소의 정보를 가려오려 하면 문제가 발생한다.
 */

//  querySelector(...) 호출 결과가 null인 경우 에러 발생
let html = document.querySelector('.my-element').innerHTML;

//  명세서에 ?.이 추가되기 전엔 이런 문제들을 해결하기 위헤 && 연산자를 사용하곤 했다.
alert(user && user.address && user.address.street); // undefined, 에러가 발생하지 않는다.
/** 중첩 객체의 특정 프로퍼티에 접근하기 위헤 거쳐야 할 구성요소들을 AND로 연결해 
 * 실제 해당 객체나 프로퍼티가 있는지 확인하는 방법을 사용했었다.
 * 이렇게 AND를 연결해서 사용하면 코드가 아주 길어진다는 단점이 있다.
 * 
 ** 옵셔널 체이닝의 등장
 * ?.은 ?. '앞'의 평가 대상이 undefined나 null이면 평가를 멈추고, undefined를 반환한다.
 */

alert(user?.address?.street); // undefined, 에러가 발생하지 않는다.

user = null;
alert(user?.address); // undefined
alert(user?.address.street); // undefined

/** ?.은 ?.'앞'평가 대상에만 동작되고, 확장은 되지 않는다는 사실을 알 수 있다.
 * user?.는 user가 null이나 undefined인 경우만 처리 할 수 있다.
 * user가 null이나 undefined가 아니고 실제 값이 존재하는 경우엔 반드시 user.address 프로퍼티는 있어야 한다.
 * 그렇지 않으면 user?.address.street의 두 번째 점 연산자에서 에러가 발생한다.
 * 
 ** 옵셔널 체이닝을 남용하지 말자
 * ?.는 존재하지 않아도 괜찮은 대상에만 사용해야 한다.
 * 사용자 주소를 다루는 위 예시에서는 논리상 user는 반드시 있어야 하는데 address는 필수값이 아니다.
 * 그러니 user.address?.street를 사용하는 것이 바람직하다.
 * 실수로 인해 user에 값을 할당하지 않았다면 바로 알아낼 수 있도록 해야 한다.
 * 그렇지 않으면 에러를 조기에 발셩하지 못하고 디버깅이 어려워진다.
 * 
 ** ?. 앞의 변수는 꼭 선언되어 있어야 한다. 
 * 변수가 선언되어 있지 않으면 평가시 에러가 발생한다.
 * ex)
 *  // ReferenceError: user is not defined 
 *  user?.address;
 * 옵셔널 체이닝 선언이 완료된 변수를 대상으로만 동작한다.
 */

/** 단락 평가
 * ?.는 왼쪽 평가대상에 값이 없으면 즉시 평가를 멈춘다. 참고로 이런 평가 방법을 단락 평가(short-circuit)라고 부른다.
 * 그렇기 때문에 함수 호출을 비롯한 ?. 오른쪽에 있는 부가 동장은 ?.의 평가가 멈췄을 때 더는 일어나지 않는다.
 */

let userOther = null;
let x = 0;

user?.sayHi(x++); // 아무 일도 일어나지 않는다.
alert(x); // 0, x는 증가하지 않는다.

/** ?.()와 ?.[]
 * ?.은 연산자가 아니다. ?.은 함수나 대괄호와 함께 동작하는 특별한 문법 구조체(syntax construct)이다.
 * 존재 여부가 확실치 않는 함수를 호출할 때 ?.()의 동작
 */

let user1 = {
    admin() {
        alert("관리자 계정입니다.");
    }
}

let user2 = {};

user1.admin?.(); // 관리자 계정입니다.
user2.admin?.();
/**
 * ?.()를 사용해 admin의 존재 여부를 확인하자 user1엔 admin이 정의되어 있기 때문에 메서드가 제대로 호출되었다.
 * 반면 user2엔 admin이 정의되어 있지 않음에도 불굴하고 메서드를 호출하면 에러 없이 그냥 평가가 멈춘다.
 * 
 * .대신 대괄호[]를 사용해 객체 프로퍼티에 접근하는 경우엔 ?.[]를 사용할 수도 있다.
 * 위 예시와 마찬가지로 ?.[]를 사용하면 객체 존재 여부가 확실치 않는 경우에도 안전하게 프로퍼티를 읽을 수 있다.
 */

let userA = {
    firstName: "Violet"
};

let userB = null; // user2는 권한이 없는 사용자라고 가정

let key = "firstName";

alert(userA?.[key]); // Violet
alert(userB?.[key]); // undefined

alert(userA?.[key]?.something?.not?.existing); // undefined

// ?.은 delete와 조합해 사용할 수도 있다.
delete user?.name; // user가 존재하면 user.name을 삭제한다.

/** ?.은 읽기나 삭제하기에는 사용할 수 있지만 쓰기에는 사용할 수 없다.
 * ?.은 할당 연산자 왼쪽에서 사용 할 수 없다.
 */
// user가 존재할 경우 user.name에 값을 쓰려는 의도로 아래와 같이 코드를 작성
user?.name = "Violet"; // SyntaxError: Invalid left-hand side in assignment
// 에러가 발생하는 이유는 undefined = "Violet"이 되기 때문이다.

/**
 * 옵셔널 체이닝 문법 ?.은 세 가지 형태로 사용할 수 있다.
 * 1. obj?.prop - obj가 존재하면 obj.prop을 반환하고, 그렇지 않으면 undefined를 반환
 * 2. obj?.[prop] - obj가 존재하면 obj.[prop]을 반환하고, 그렇지 않으면 undefined를 반환
 * 3. obj?.method() - obj가 존재하면 obj.method()을 반환하고, 그렇지 않으면 undefined를 반환
 * 
 * 옵셔널 체이닝 문법은 직관적이고 사용하기 쉽다.
 * ?.왼쪽 평가 대상이 null이나 undefined인지 확인하고 null이나 undefined가 아니라면 평가를 계속 진행한다.
 * 
 * ?.를 계속 연결해서 체인을 만들면 중첩 프로퍼티들에 안전하게 접근할 수 있다.
 * ?.은 ?.왼쪽 평가대상이 없어도 괜찮을 경우에만 선택적으로 사용해야 한다.
 * 꼭 있어야 하는 값인데 없는 경우에 ?.을 사용하면 프로그래밍 에러를 쉽게 찾을 수 없으므로 주의해야 한다.
 */