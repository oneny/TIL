var users = [
  { id: 1, name: "ID", age: 36 },
  { id: 2, name: "BJ", age: 32 },
  { id: 3, name: "JM", age: 32 },
  { id: 4, name: "PJ", age: 27 },
  { id: 5, name: "HA", age: 25 },
  { id: 6, name: "JE", age: 26 },
  { id: 7, name: "JI", age: 31 },
  { id: 8, name: "MP", age: 23 },
];

// 1. 명령형 코드
  // 1-1. 30세 이상인 users를 거른다.
  var temp_users = [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].age >= 30) {
      temp_users.push(users[i]);
    }
  }
  console.log(temp_users);
  // 1-2. 30세 이상인 users의 names를 거른다.
  var names = [];
  for (var i = 0; i < temp_users.length; i++) {
    names.push(temp_users[i].name);
  }
  console.log(names);
  // 1-3. 30세 미만인 users를 거른다.
  var temp_users = [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].age < 30) {
      temp_users.push(users[i]);
    }
  }
  console.log(temp_users);
  // 1-4. 30세 미만인 users의 ages를 수집한다.
  var ages = [];
  for (var i = 0; i < temp_users.length; i++) {
    ages.push(temp_users[i].age);
  }
  console.log(ages);

// ----------------------------------------------------------------------------

// 2. _filter, _map으로 리팩토링
// 어떤 조건일 때  if문 안에 들어올 것인가를 완전히 predi에 위임
// _filter와 같은 함수를 응용형 함수라 한다.
// 함수가 함수를 받아서 원하는 시점에 해당하는 함수가 알고 있는 인자를 적용하는 식이 응용형/적용형 프로그래밍/함수라 한다.
function _filter(list, predi) {
  var new_list = [];

  for (var i = 0; i < list.length; i++) {
    if (predi(list[i])) {
      new_list.push(list[i]);
    }
  }

  return new_list;
}

console.log(
  // 30세 이상
  _filter(users, function(user) { return user.age >= 30; })
);

console.log(
  // 30세 미만
  _filter(users, function(user) { return user.age < 30; })
);

// _filter는 users만을 위한 코드가 아니라 전혀 다른 값도 필터링할 수 있는 순수함수이다.
console.log(
  _filter([1, 2, 3, 4], (num) => num % 2)
);
console.log(
  _filter([1, 2, 3, 4], (num) => !(num % 2))
);

// 유사 배열 객체도 사용 가능! -> 노드에서는 DOM API가 없으므로 주석 처리!
// console.log(
//   _map(document.querySelectorAll("*"), (node) => node.nodeName)
// );

// _map 순수함수 만들어보기  
function _map(list, mapper) {
  var new_list = [];
  
  for (var i = 0; i < list.length; i++) {
    // 무엇을 push할지를 mapper에게 위임한다.
    new_list.push(mapper(list[i]));
  }

  return new_list;
}

console.log(
  _map(users, function(user) { return user.name })
)

console.log(
  _map([1, 2, 3, 4, 5], (num) => num ** 2)
)

// 함수형 프로그래밍에서는 대입문을 많이 사용하지 않는 경향이 있다.
// 대입문을 줄이면 코드가 간결해진다.
// 함수를 통과해 나가면서 변경해 나가는 것이 아닌 값을 새롭게 만들어 나가는 식이다.
// 보다 안전성이 높고 테스트가 쉬운 코드를 완성할 수 있다.
console.log(
  _map(
    _filter(users, (user) => user.age >= 30),
    (user) => user.age
  )
)

console.log(
  _map(
    _filter(users, (user) => user.age < 30),
    (user) => user.age
  )
)

// ----------------------------------------------------------------------------

// 3. each 만들기
// 3-1. _each로 _map, _filter 중복 제거
// list[i]와 for문이 중복!
function _filter(list, predi) {
  var new_list = [];

  for (var i = 0; i < list.length; i++) {
    if (predi(list[i])) {
      new_list.push(list[i]);
    }
  }

  return new_list;
}

function _map(list, mapper) {
  var new_list = [];
  
  for (var i = 0; i < list.length; i++) {
    // 무엇을 push할지를 mapper에게 위임한다.
    new_list.push(mapper(list[i]));
  }

  return new_list;
}

// 안에서 하는 일을 완전히 위임
// 점점 명령적인 코드가 숨게 되고, 좀 더 선언적인 코드 표현이 되어 단순해져 가독성이 좋아진다.
function _each(list, iter) {
  for (var i = 0; i < list.length; i++) {
    iter(list[i]);
  }

  return list;
}

function _filter(list, predi) {
  var new_list = [];

  _each(list, function(val) {
    if (predi(val)) new_list.push(val);
  })

  return new_list;
}

function _map(list, mapper) {
  var new_list = [];

  _each(list, function(val) {
    new_list.push(mapper(val));
  });

  return new_list;
}

// 결과는 위와 같이~!!
console.log(
  _map(
    _filter(users, (user) => user.age >= 30),
    (user) => user.age
  )
)

console.log(
  _map(
    _filter(users, (user) => user.age < 30),
    (user) => user.age
  )
)

// 3-2. 외부 다형성
  // 3-2-1. array_like, arguments, document.querySelectorAll
  // map, filter 같은 경우도 왜 다시 _map, _filter를 만들어준 이유: 함수가 아닌 이미 있는 메서드이기 때문에
  // 메서드는 순수 함수가 아닌 메서드는 객체의 상태에 따라 결과가 달라지는 특징을 가지고 있다.
  // 그리고 해당 클래스에서 제공하는(prototype 체인상에 존재하는) 메서드만 사용할 수 있는 제한적인 특징이 있다.
  // 다형성을 지원하기 어려운 부분이 있다.
  // 함수형 프로그래밍에서는 함수를 먼저 만들고, 함수에 맞는 데이터를 구성해서 함수에게 적용하면 높은 다형성을 가질 수 있다. -> 유연성, 실용송 ⬆️
// console.log(
//   _map(document.querySelectorAll("*"), (node) => node.nodeName)
// );
// 유사 배열 객체에서도 사용 가능
console.log(
  _map({0: 12, 1: 13, 2: 14, length: 3}, (val) => val * 2)
)

// 3-3. 내부 다형성
  // 3-3-1. predicate, iterate, mapper
  // 콜백함수지만 함수형 프로그래밍에서는 역할에 따라 붙는 이름이 다르다.
  // predicate: 조건을 리턴하는 함수
  // iterate: 루프 돌면서 반복적으로 실행되는 함수
  // mapper: 무언가와 무언가를 매핑하는 함수
  // 인자 안에 어떤 값이 들어있어도 다 수행할 수 있게 만드는 것은 보조함수, 내부 다형성의 역할이다.

// ----------------------------------------------------------------------------

// 4. 커링
// 4-1. _curry, _curryr
// 함수의 인자를 하나씩 적용해 나가다가 필요한 인자가 모두 채워지면 함수 본체를 실행하는 기법
// JS는 함수는 일급 함수고, 평가 시점을 마음대로 다룰 수 있기 때문에 구현할 수 있다.
function _curry(fn) {
  return function(a, b) {
    // curry 함수를 인자가 두 개 들어오면 바로 실행할 수 있도록 작성
    return arguments.length === 2
      ? fn(a, b)
      : function (b) { return fn(a, b); } // 평가 시점 미루기
  }
}

var add = _curry(function(a, b)  {
  return a + b;
});

// 본체 함수인 add를 가지고 있다가, 평가 결과를 원하는 시점까지 미뤄둘 수 있다.
var add10 = add(10);
console.log(add10(5)); // 15
console.log(add10(20)); // 30
console.log(add(5)(3)); // 8
console.log(add(4, 5)); // 인자가 몇 개 들어오는지에 따라서 평가 시점을 조절할 수 있다.

var sub = _curry(function(a, b) {
  return a - b;
})

console.log(sub(10, 5));
console.log(sub(10)(5));
var sub10 = sub(10);
console.log(sub10(5)); // 좋은 표현은 아님

// _curryr
// sub10(5)을 실행하는 경우, 5에서 10을 빼주는 식이 더 맞는 표현인 것 같다.
// 따라서 오른쪽 인자에서 시작하는 함수 작성
function _curryr(fn) {
  return function(a, b) {
    return arguments.length === 2 ? fn(a, b) : function(b) { return fn(b, a); }
  }
}

var sub = _curryr(function(a, b) {
  return a - b;
})

console.log(sub(10, 5)); // 5
console.log(sub(10)(5)); // -5
var sub10 = sub(10);
console.log(sub10(5)); // -5

// 4-2. _get 만들어 좀 더 간단하게 하기
// _get 함수는 객체에 있는 값을 안전하게 참조하는 함수 -> 에러 방지
function _get(obj, key) {
  return !!obj ? obj[key] : undefined;
}

var user1 = users[3];
console.log(_get(user1, "name"));

// console.log( users[10].name ); // 에러
console.log( _get(users[10], "name")); // undefined

// _get을 만들때 curry를 활용해서 코드를 간결하게 만들 수 있다.
var _get2 = _curryr(function(obj, key) {
  return !!obj ? obj[key] : undefined;
});

console.log(_get2(user1, "name")); // PJ
console.log(_get2("name")(user1)); // PJ

// 그럼 _get2("name") 자체가 이름을 꺼내는 함수가 된다.
var getName = _get2("name");
console.log(getName(user1)); // PJ
console.log(getName(users[5])); // JE
console.log(getName(users[10])); // undefined

// 아래 코드 간결하게 만들기
console.log(
  _map(
    _filter(users, (user) => user.age >= 30),
    function(user) { return user.age; }
  )
)

console.log(
  _map(
    _filter(users, (user) => user.age < 30),
    (user) => user.age
  )
)

console.log(
  _map(
    _filter(users, (user) => user.age >= 30),
    _get2("age")
  )
)

console.log(
  _map(
    _filter(users, (user) => user.age < 30),
    _get2("age") // => 루프를 돌면서 _get("age")(user)가 된다.
  )
)

// ----------------------------------------------------------------------------

// 5. _reduce 만들기
function _rest(list, num) {
  // = [...list].slice(num || 1) = Array.from(list).slice(num || 1)
  return Array.prototype.slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
  if (arguments.length === 2) {
    memo = lsit[0];
    // array-list 객체가 와도 slice 사용가능
    list = _rest(list);
  }
  
  _each(list, function(val) {
    memo = iter(memo, val);
  });
  
  return memo
}

var add = (a, b) => a + b;

console.log(
  _reduce([1, 2, 3], add, 0)
)

// memo = add(0, 1)
// memo = add(memo, 2)
// memo = add(memo, 3)
// return memo
// add(add(add(0, 1), 2), 3); -> 연속적으로 add를 실행해주는 함수

// ----------------------------------------------------------------------------

// 6. 파이프라인 만들기
// 5-1. _pipe: 함수들을 인자로 받아서 함수들을 연속적으로 실행해주는 함수를 반환한다.
// _pipe는 _reduce보다 특화시켜진 함수이다. 추상화된 레벨이 _reduce
function _pipe() {
  var fns = arguments;
  return function(arg) { // 함수들을 연속적으로 실행시켜줄 함수를 반환
    return _reduce(fns, function(arg, fn) {
      return fn(arg); // 모든 함수를 돌면서 fn(arg)를 실행하고 memo(arg)에 누적한다.
    }, arg)
  }
}

var f1 = _pipe(
  function(a) { return a + 1; }, // 1 + 1
  function(a) { return a * 2 }, // 2 * 2
  function(a) { return a * a }, // 4 * 4
)

console.log(f1(1))
// 5-2. _go
// _go 또한 _pipe 함수인데 즉시 실행하는 함수 버전라고 생각하면 된다.
function _go(arg) {
  var fns = _rest(arguments); // 제일 앞 요소 제거
  return _pipe.apply(null, fns)(arg);
}

_go(
  1, 
  function(a) { return a + 1 },
  function(a) { return a * 2 },
  function(a) { return a * a },
  console.log
)

// 5-3. users에 _go 적용
console.log(
  _map(
    _filter(users, (user) => user.age >= 30),
    _get2("name")
  )
)

console.log(
  _map(
    _filter(users, (user) => user.age < 30),
    _get2("name") // => 루프를 돌면서 _get("age")(user)가 된다.
  )
)

_go(
  users,
  function(users) {
    return _filter(users, function(user) {
      return user.age >= 30;
    });
  },
  function(users) {
    return _map(users, _get2("name"))
  },
  console.log
)

_go(
  users,
  function(users) {
    return _filter(users, function(user) {
      return user.age < 30;
    });
  },
  function(users) {
    return _map(users, _get2("name"))
  },
  console.log
)

// _map과 _filter에 _curryr을 적용해주면 더 가독성 있어진다.
var _map2 = _curryr(_map),
    _filter2 = _curryr(_filter);

console.log(
  _map([1, 2, 3], function(val) { return val * 2 })
)

console.log(
  _map2(function(val) { return val * 2})([1, 2, 3])
)

_go(
  users,
  _filter2(function(user) { return user.age >= 30 }),
  _map2(_get2("name")),
  console.log
)

// 화삺표 함수 적용
_go(
  users,
  _filter2((user) => user.age < 30),
  _map2(_get2("name")),
  console.log
)

// 7. _each의 외부 다형성 높이기
// 7-1. _each에 null 넣어도 에러 안나게
// _each(null, console.log); // 에러
var _length = _get2("length");
function _each2(list, iter) {
  for (var i = 0; i < _length(list); i++) {
    iter(list[i]);
  }
  return list;
}
_each2(null, console.log);

// map도 null 값을 넣어도 에러 안나게
function _map3(list, mapper) {
  var new_list = [];

  _each2(list, function(val) {
    new_list.push(mapper(val));
  });

  return new_list;
}
console.log(_map3(null, function(v) { return v; }));
// 7-2. _keys 만들기
console.log(Object.keys({ name: "oneny", age: 27 })); // ["name", "age"]
console.log(Object.keys([10, 20, 30, 40])); // ["0", "1", "2", "3"]
console.log(Object.keys(10)); // []
// console.log(Object.keys(null)); // 에러

// 7-3. _keys에서도 _is_object인지 검색하여 null 에러 안나게
function _is_object(obj) {
  return typeof obj === "object" && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

console.log(_keys({ name: "oneny", age: 27 })); // ["name", "age"]
console.log(_keys([10, 20, 30, 40])); // ["0", "1", "2", "3"]
console.log(_keys(10)); // []
console.log(_keys(null)); // []

// 7-4. _each 외부 다형성 높이기

_each2(
  {
    27: "oneny",
    28: "twony",
    20: "threeny",
  },
  function(name) {
    console.log(name);
  }
);

function _each3(list, iter) {
  var keys = _keys(list);

  for (var i = 0; i < keys.length; i++) {
    iter(list[keys[i]]);
  }

  return list;
}

_each3(
  {
    27: "oneny",
    28: "twony",
    20: "threeny",
  },
  function(name) {
    console.log(name);
  }
); // threey, oneny, twony

var _map4 = _curryr(function (list, mapper) {
  var new_list = [];

  _each3(list, function(val) {
    new_list.push(mapper(val));
  });

  return new_list;
});

console.log(
  _map4(
    {
      27: "oneny",
      28: "twony",
      20: "threeny",
    },
    function(name) { return name.toUpperCase() }
  )
); // ["THREENY", "ONENY", "TWONY"]

_go(
  {
    27: "oneny",
    28: "twony",
    20: "threeny",
  },
  _map4(function(name) { return name.toUpperCase() }),
  console.log
) // ["THREENY", "ONENY", "TWONY"]

_go(
  users,
  _map4(function(user) { return user.name }),
  _map4(function(name) { return name.toLowerCase() }),
  console.log
) // ["id", "bj", "jm", ...]