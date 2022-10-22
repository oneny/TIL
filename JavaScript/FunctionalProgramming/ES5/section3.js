/**
 * 컬렉션 중심 프로그래밍의 4가지 유형과 함수
 * 
 * 1. 수집하기 - map, values, pluck 등
 * 2. 거르기 - filter, reject, compact, without 등
 * 3. 찾아내기 - find, some, every 등
 * 4. 접기 - reduce, min, max, group_by, count_by
 * 
 * map, filter, find, reduce와 같은 함후들이 추상단계가 높기 때문에 대표함수라고도 한다. 
 * 이 함수들로 values, reject, some 등 특화함수를 만들 수 있다.
 * 
 *  */ 

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

function _curryr(fn) {
  return function(a, b) {
    return arguments.length === 2 ? fn(a, b) : function(b) { return fn(b, a); }
  }
}

var _get = _curryr(function(obj, key) {
  return !!obj ? obj[key] : undefined;
});

function _each(list, iter) {
  var keys = _keys(list);

  for (var i = 0; i < keys.length; i++) {
    iter(list[keys[i]]);
  }

  return list;
};

function _is_object(obj) {
  return typeof obj === "object" && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

function _rest(list, num) {
  return Array.prototype.slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
  if (arguments.length === 2) {
    memo = list[0];
    list = _rest(list);
  }

  _each(list, function(val) {
    memo = iter(memo, val);
  });

  return memo;
}

function _pipe() {
  var fns = arguments;

  return function(arg) {
    return _reduce(fns, function(arg, fn) {
      return fn(arg);
    }, arg);
  }
}

function _go(arg) {
  var fns = _rest(arguments);
  
  return _pipe.apply(null, fns)(arg);
}

// -----------------------------------------------------------------

// 컬렉션 중심 프로그래밍의 유형별 함수 만들기
// 1. 수집하기 - map
var _map = _curryr(function (list, mapper) {
  var new_list = [];

  _each(list, function(val) {
    new_list.push(mapper(val));
  });

  return new_list;
});

// 1-1. values
function _values(data) {
  return _map(data, _identity);
}

console.log(users[0]); // { id: 1, name: "ID", age: 36 }
console.log(_keys(users[0])); // ["id", "name", "age"]
console.log(_values(users[0])); // [1, "ID", 36]

// values의 보조함수 _identity 함수 만들기
function _identity(val) {
  return val;
}

// _value 다른 표현
var _values2 = _map(_identity);
console.log(_values2(users[0])); // [1, "ID", 36]

// 1-2. pluck
function _pluck(data, key) {
  return _map(data, function(obj) {
    return obj[key];
  });
}

function _pluck2(data, key) {
  return _map(data, _get(key));
}

console.log(_pluck(users, "age")); // [36, 32, 32, 27, ...]
console.log(_pluck2(users, "id")); // [1, 2, 3, 4, 5, ...]

// -----------------------------------------------------------------

// 2. 거르기 - filter
var _filter = _curryr(function(list, predi) {
  var new_list = [];

  _each(list, function(val) {
    if (predi(val)) new_list.push(val);
  });

  return new_list;
})

// 2-1. reject
// _filter를 반대되는 행동으로 만들어 좀 더 선언적인 프로그래밍을 할 수 있다.
function _reject(data, predi) {
  return _filter(data, function(val) {
    return !predi(val);
  });
}

function _negate(func) {
  return function(val) {
    return !func(val);
  };
}

function _reject2(data, predi) {
  return _filter(data, _negate(predi));
}

console.log(
  _reject(users, function(user) {
  return user.age > 30
})); // // 30세 이하인 분들만 뽑아진다.

// 2-2. compact
var _compact = _filter(_identity); // if 문에서 false는 자동으로 걸러진다.

console.log(_compact([1, 2, 0, false, null, {}])); // [1, 2, {}]

// -----------------------------------------------------------------

// 3. 찾아내기 - find
// 3-1. find 만들기
var _find = _curryr(function(list, predi) {
  var keys = _keys(list);

  for (var i = 0; i < keys.length; i++) {
    var val = list[keys[i]];
    if (predi(val)) return val;
  }

  // 만족하는 것이 없으면 undefined 반환
});

console.log(
  _find(users, function(user) {
    return user.age < 30;
  })
); // { id: 4, name: "PJ", age: 27 }

console.log(
  _filter(users, function(user) {
    return user.age < 30;
  })
); // [{ id: 4, name: "PJ", age: 27 }, ...]

// find 활용
console.log(
  _get(
    _find(users, function(user) {
      return user.age < 30;
    }),
    "name"
  )
); // PJ

_go(
  users,
  _find(function(user) {
    return user.id === 4
  }),
  _get("name"),
  console.log
)

// 3-2. find_index
var _find_index = _curryr(function(list, predi) {
  var keys = _keys(list);
  
  for (var i = 0; i < keys.length; i++) {
    if (predi(list[keys[i]])) return i;
  }

  // 만족하는 것이 없으면 -1 반환
  return -1;
});

console.log(
  _find_index(users, function(user) {
    return user.age > 100;
  })
); // -1

console.log(
  _find_index(users, function(user) {
    return user.age < 30;
  })
); // 3

// 3-3. some
// 3-4. every

// -----------------------------------------------------------------

// 4. 접기 - reduce
// 4-1. min, max, min_by, max_by
// 4-2. group_by, push
// 4-3. count_by, inc