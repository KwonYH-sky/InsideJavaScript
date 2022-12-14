/** 객체를 원시형으로 변환하기
 * obj1 + obj2 나 obj1 - obj2와 같이 객체끼리 연산할 때, alert(obj)로 객체를 출력할 때 어떻게 될까?
 * 
 * 이 모든 경우에 자동 형 변환이 일어난다. 객체는 원시값으로 변환되고, 그 후 의도한 연산이 수행된디.
 * 
 * 1. 객체는 논리 평가 시 true를 반환한다. 단 하나의 예외도 없다. 따라서 객체는 숫자형이나 문자형으로만 형 변환이 일어난다고 생각하자.
 * 2. 숫자형으로의 형 변환은 객체끼리 빼는 연산을 할 때나 수학 관련 함수를 적용할 때 일어난다. 객체 Date끼리 차감하면(date1 - date2) 두 날짜의 시간 차이가 반환된다.
 * 3. 문자형으로의 형 변환은 대개 alert(obj)같이 객체를 출력하려고 할 때 일어난다.
 * 
 ** ToPrimitive
 * 특수 객체 메서드를 사용하면 숫자형이나 문자형으로의 형 변환을 원하는 대로 조절할 수 있다.
 * 
 * 객체 형 변환은 세 종류로 구분 되는데, 'hint'라 불리는 값이 구분 기준이 된다. 
 * 'hint'가 무엇인지는 명세서에 자세히 설명되어 있는데, "목표로 하는 자료형"정도로 이해하면 된다.
 */

/* "string"
 * alert 함수같이 문자열을 기대하는 연산을 수행할 때는(객체-문자형 변환), hint가 string이 된다.
 */

// 객체를 출력하려고 함
alert(obj);

// 객체를 프로퍼티 키로 사용하고 있음
anotherObj[obj] = 123;

/* "number"
 * 수학 연산을 적용하려 할 때(객체-숫자형 변환), hint는 number가 된다.
 */

// 명시적 형 변환
let num = Number(obj);

// (이항 덧셈 연산을 제외한) 수학 연산
let n = +obj; // 단항 덧셈 연산
let delta = date1 - date2;

// 크기 작음 비교하기
let greater = user1 > user2;

/* "default"
 * 연산자가 기대하는 자료형이 '확실치 않을 때' hint는 default가 된다. 이 경우 아주 드물게 발생한다.
 * 
 * 이항 덧셈 연산자 +는 피연산자의 자료형에 따라 문자열을 합치는 연산을 할 수도 있고 숫자를 더해주는 연산을 할 수도 있다.
 * 따라서 +의 인수가 객체일 때는 hint가 default가 된다.
 * 
 * 동등 연산자 ==를 사용해 객체-문자형, 객체-숫자형, 객체-심볼형끼리 비교할 때도, 객체를 어떤 자료형으로 바꿔야 할지 확신이 안 서므로 hint는 default가 된다.
 */

// 이항 덧셈 연산은 hint로 `default`를 사용한다.
let total = obj1 + obj2;

// obj == number 연산은 hint로 `default`를 사용한다.
if (user == 1) { };

/* 크고 작음을 비교할 때 쓰이는 연산자 <, > 역시 피연산자에 문자형과 숫자형 둘 다를 허용하는데, 이 연산자들은 hint를 'number'로 고정한다.
 * 즉, hint가 'default'가 되는 일이 없다. 이는 하위 호환성 때문에 정해진 일이다.
 * 
 * 실제 일을 할 때는 이런 사항을 모두 외울 필요는 없다. 
 * Date객체를 제외한 모든 내장 객체는 hint가 "default"인 경우와 "number"인 경우를 동일하게 처리하기 때문이다.
 * 우리도 커스텀 객체를 만들 땐 이런 규칙을 따르면 된다.
 */

/** "boolean" hint는 없다.
 * hint는 위에서 언급한 총 세 가지이다.
 * 'boolean' hint는 존재하지 않는다. 모든 객체는 그냥 true로 평가된다. 
 * 게다가 우리도 내장 객체에 사용되는 규칙처럼 "default"와 "number"를 동일하게 처리하면, 결국엔 두 종류의 형 변환(객체-문자형, 객체-숫자형)만 남게 된다.
 * 
 ** 자바스크립트는 형 변환이 필요할 때, 아래와 같은 알고리즘에 따라 원하는 메서드를 찾고 호출한다.
 * 1. 객체에 obj[Symbol.toPrimitive](hint) 메서드가 있는지 찾고, 있다면 메서드를 호출한다. Symbol.toPrimitive는 시스템 심볼로, 심볼형 키로 사용된다.
 * 2. 1에 해당하지 않고 hint가 "string"이라면, `obj.toString()`이나 `obj.valueOf()`를 호출한다.(존재하는 메서드만 실행됨)
 * 3. 1과 2에 해당히지 않고, hint가 "number"나 "default"라면, `obj.valueOf()`나 `obj.toString()`을 호출한다.(존재하는 메서드만 실행됨)
 */

////////////////

/** Symbol.toPrimitive
 * 자바스크립트엔 Symbol.toPrimitive라는 내장 심볼이 존재하는데, 이 심볼은 다음과 같이 목표로 하는 자료형(hint)을 명명하는 데 사용된다.
 */
obj[Symbol.toPrimitive] = function (hint) {
    // 반드시 원시값을 반환해야 한다.
    // hint는 "string", "number", "default" 중 하나가 될 수 있다.
};

// user 객체에 객체-원시형 변환 메서드 obj[Symbol.toPrimitive]를 구현
let user = {
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint) {
        alert(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.money;
    }
};

// 데모:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500

/** 이렇게 메서드를 구현해 놓으면 user는 hint에 때라 (자기 자신을 설명해주는) 문자열을 변환하기도 하고 (가지고 있는 돈의 액수를 나타내는) 숫자로 변환되기도 한다.
 * user[Symbol.toPrimitive]를 사용하면 메서드 하나로 모든 종류의 형 변환을 다룰 수 있다.
 */

/////

/** toString과 valueOf
 * `toString`과 `valueOf`는 심볼이 생기기 이전부터 존재해 왔던 '평범한' 메서드다.
 * 이 메서드를 이용하면 '구식'이긴 하지만 형 변환을 직접 구현할 수 있다.
 * 
 * 객체에 Symbol.toPrimitive가 없으면 자바스크립트는 아래 규칙에 따라 `toString`이나 `valueOf`를 호출한다.
 * *hint가 'string'인 경우: `toString -> valueOf` 순(`toString`이 있다면 `toString`을 호출, `toString`가 없다면 'valueOf`를 호출함)
 * *그외: `valueOf -> toString` 순
 * 
 * 이 메서드들은 반드시 원시값을 반환해야한다. `toString`이나 `valueOf`가 객체를 반환하면 그 결과는 무시된다.
 * 마치 메서드가 처음부터 없었던 것 처럼 되어버린다.
 * 
 * 일반 객체는 기본적으로 `toString`과 `valueOf`에 적용되는 규칙을 따른다.
 * *`toString`은 문자열 "[object Object]"을 반환한다.
 * *`valueOf`는 객체 자신을 반환한다.
 */

let userA = { name: "John" };

alert(userA); // [object Object]
alert(userA.valueOf() === userA); // true

/* 이런 이유 때문에 alert에 객체를 넘기면 [object Object]가 출력되는 것이다.
 * `valueOf`는 객체 자신을 반환하기 때문에 그 결과가 무시된다. 이유는 역사적인 이유때문이라고 한다.
 * 그래서 우리는 이 메서드가 존재하지 않는다고 생각하면 된다.
 */

// `toString`과 `valueOf`를 조합해서 Symbol.toPrimitive과 동일하게 동작
let userOther = {
    name: "Jake",
    money: 1000,

    // hint가 "string"인 경우
    toString() {
        return `{name: "${this.name}"}`;
    },

    // hint가 "number"나 "default"인 경우
    valueOf() {
        return this.money;
    }
};

alert(userOther); // toString -> {name:"Jake"}
alert(+userOther); // valueOf -> 1000
alert(userOther + 500); // valueOf -> 1500

/* 
 * 출력결과가 Symbol.toPrimitive와 완전 동일하게 작동된다.
 * 그런데 간혹 모든 형 변환을 한 곳에서 처리해야하는 경우도 생긴다. 이런 땐 toString만 구현하면 된다.
 */

let userAnother = {
    name: "Jim",

    toString() {
        return this.name;
    }
};

alert(userAnother); // toString -> Jim
alert(userAnother + 500); // toString -> Jim500
/* 객체에 Symbol.toPrimitive와 valueOf가 없으면, toString이 모든 형 변환을 처리한다. */

//////////////

/** 변환 타입
 * 위에 언급된 세 개의 메서드는 'hint'에 명시된 자료형으로의 형 변환을 보장해 주지 않는다.
 * `toString()`이 항상 문자열을 반환하리라는 보장이 없고, Symbol.toPrimitive의 hint가 "number"일 때 항상 숫자형 자료가 반환되리라는 보장이 없다.
 * 확신할 수 있는 단 한 가지는 객체가 아닌 원시값을 반환해 준다는 것이다.
 * 
 ** 과거의 잔재
 * toString이나 valueOf가 객체를 반환해도 에러가 발생하지 않는다. 다만 이때는 반환 값이 무시되고, 메서드 자체가 존재하지 않았던 것처럼 동작한다.
 * 이렇게 동작하는 이유는 과거 자바스크립트엔 "에러"라는 개념이 잘 정립되어 있지 않았기 떄문이라고 한다.
 * 반면에 Symbol.toPrimitive는 무조건 원시자료를 반환해야한다. 그렇지 않으면 에러가 발생한다.
 */

/////////////

/** 추가 형 변환
 * 상당수의 연산자와 함수가 피연산자의 형을 변환시킨다. 곱셉을 해주는 연산자*는 피연산자를 숫자형으로 변환시킨다.
 * 
 * 객체가 피연산자일 때는 다음과 같이 거쳐 형 변환이 일어난다.
 * 1. 객체는 원시형으로 변화한다. 변화 규칙는 위에 언급한 순으로 일어난다.
 * 2. 변환 후 원시값이 원하는 형이 아닌 경우엔 또다시 형 변환이 일어난다.
 */

let obj = {
    // 다른 메서드가 없으면 toString에서 모든 형 변환을 처리한다.
    toString() {
        return "2";
    }
};

alert(obj * 2); // 4, 객체가 문자열 "2"로 바뀌고, 곱셈 연산 과정에서 문자열 "2"는 숫자 2로 변경

/* 1. obj * 2 에선 객체가 원시형으로 변환되므로 toString에의해 obj는 문자열 "2"가 된다.
 * 2. 곱셈 연산은 문자열은 숫자형으로 변환시키므로 "2" * 2는 2 * 2가 된다.
 *
 * 그런데 이항 덧셈 연산은 위와 같은 상황에서 문자열을 연결한다.
 */

alert(obj + 2); // 22("2" + 2), 문자열이 반환되기 때문에 문자열끼리의 변합이 일어났다.

 ////

/** 요약
 * 원시값을 기대하는 내장 함수나 연산자를 사용할 때 객체-원시형으로의 형 변환이 자동으로 일아난다.
 * 객체-원시형으로의 형 변환은 hint를 기준으로 세 가지로 구분
 * "string" (alert 같이 문자열을 필요하는 연산)
 * "number" (수학 연산)
 * "default" (드물게 발생함)
 * 
 * 연산자별로 어떤 hint가 적용되는지는 명세서에서 볼수 있다. 연산자가 기대하는 피연산자를 '확신할 수 없을 때'에는 hint가 "default"가 된다.
 * 이런 경우 아주 드물게 발생한다. 내장 객체는 대개 hint가 "default"일 때와 "number"일 때를 동일하게 처리한다.
 * 따라서 실무에선 hint가 "default"인 경우와 "number"인 경우를 합쳐서 처리하는 경우가 많다.
 * 
 * 객체-원시형 반환엔
 * 1. 객체에 obj[Symbol.toPrimitive](hint) 메서드가 있는지 찾고, 있다면 메서드를 호출한다. 
 * 2. 1에 해당하지 않고 hint가 "string"이라면, 
 *     `obj.toString()`이나 `obj.valueOf()`를 호출한다.
 * 3. 1과 2에 해당히지 않고, hint가 "number"나 "default"라면, 
 *     `obj.valueOf()`나 `obj.toString()`을 호출한다.
 * 
 * obj.toString()만 사용해도 '모든 변환'을 다 다룰 수 있기 때문에, 실무에선 obj.toString()만 구현해도 충분한 경우가 많다.
 * 반환 값도 '사람이 읽고 이해할 수 있는'형식이기 때문에 실용성 측면에서 다른 메서드에 뒤처지지 않는다.
 * obj.toString()은 로깅이나 디버깅 목적으로도 자주 사용된다.
 */
