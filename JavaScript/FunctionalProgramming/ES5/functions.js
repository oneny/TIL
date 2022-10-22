// -----------------------------------------------------------------
// 1. _map
function _map(list, mapper) {
  var new_list = [];
  
  for (var i = 0; i < list.length; i++) {
    // 무엇을 push할지를 mapper에게 위임한다.
    new_list.push(mapper(list[i]));
  }

  return new_list;
}

// _each를 활용해 _map 함수 가독성 높이기
function _map2(list, mapper) {
  var new_list = [];

  _each(list, function(val) {
    new_list.push(mapper(val));
  });

  return new_list;
}

// _map애 _curryr 적용해서 가독성 높이기
var _map3 = _curryr(_map2);
console.log(_map2((val) => val * 2)([1, 2, 3]));

// _each2처럼 _map도 null 값을 넣어도 에러 안나게 작성
function _map4(list, mapper) {
  var new_list = [];

  _each2(list, function(val) {
    new_list.push(mapper(val))
  });

  return new_list;
}

// _map도 _each3을 적용해서 객체도 순환할 수 있도록 작성
var _map5 = _curryr(function (list, mapper) {
  var new_list = [];

  _each3(list, function(val) {
    new_list.push(mapper(val));
  });

  return new_list;
})

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

// -----------------------------------------------------------------
// 2. _filter
function _filter(list, predi) {
  var new_list = [];

  for (var i = 0; i < list.length; i++) {
    if (predi(list[i])) {
      new_list.push(list[i]);
    }
  }

  return new_list;
}

// _each를 활용해 _filter 함수 간결하게 만들기
function _filter2(list, predi) {
  var new_list = [];

  _each(list, function(val) {
    if (predi(val)) new_list.push(val);
  })

  return new_list;
}

// _filter3에 _curryr 적용해서 가독성 높이기
var _filter3 = _curryr(_filter2);

// -----------------------------------------------------------------

// 3. _each
function _each(list, iter) {
  for (var i = 0; i < list.length; i++) {
    iter(list[i]);
  }

  return list;
}

// _each의 외부 다형성 높이기(null 값이 들어와도 에러 안나게)
var _length = _get2("length");
function _each2(list, iter) {
  // _lenght(list)가 undefined면 루프는 그냥 통과함
  for (var i = 0; i < _length(list); i++) {
    iter(list[i]);
  }

  return list;
}

// _each 외부 다형성 높이기(객체가 들어와도 순환할 수 있게)
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

// -----------------------------------------------------------------

// 4. _curry, _curryr
function _curry(fn) {
  return function(a, b) {
    // curry 함수를 인자가 두 개 들어오면 바로 실행할 수 있도록 작성
    return arguments.length === 2
      ? fn(a, b)
      : function (b) { return fn(a, b); } // 평가 시점 미루기
  }
}

function _curryr(fn) {
  return function(a, b) {
    return arguments.length === 2 ? fn(a, b) : function(b) { return fn(b, a); }
  }
}

// -----------------------------------------------------------------

// 5. _get
function _get(obj, key) {
  return !!obj ? obj[key] : undefined;
}

// _curryr을 사용하면 obj에서 name 프로퍼티 값을 얻는 함수처럼 만들 수 있다. ex) getName(obj)
var _get2 = _curryr(function(obj, key) {
  return !!obj ? obj[key] : undefined;
});

// -----------------------------------------------------------------

// 6. _reduce
function _rest(list, num) {
  // array-list 객체가 와도 slice 사용가능
  return Array.prototype.slice.call(list, num || 1);
  // return [...list].slice(num || 1)
  // return Array.from(list).slice(num || 1)
}

// 그 결과값으로 다음 함수의 인자로 넘겨주며 memo에 결과를 누적한다.
function _reduce(list, iter, memo) {
  if (arguments.length === 2) {
    memo = lsit[0];
    list = _rest(list);
  }
  
  // val은 list가 루프 돌면서 요소 값들이다.
  // memo는 초기값 및 루프를 돌면서 결과값이 된다.
  _each(list, function(val) {
    memo = iter(memo, val);
  });
  
  return memo;
}

function _each(list, iter) {
  for (var i = 0; i < list.length; i++) {
    iter(list[i]);
  }

  return list;
}

// -----------------------------------------------------------------

// 7. _pipe
// _pipe는 함수들을 인자로 받아서 함수들을 연속적으로 실행해켜주는 함수
function _pipe() {
  var fns = arguments;

  return function(arg) { // 함수들을 연속적으로 실행시켜줄 함수를 반환
    return _reduce(fns, function(arg, fn) {
      return fn(arg); // 모든 함수를 돌면서 fn(arg)를 실행하고 memo(arg)에 누적한다.
    }, arg)
  }
}

// 8. _go
// _go는 _pipe의 즉시 실행하는 함수 버전
function _go(arg) {
  var fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

// _curryr이 적용된 _filter3, _map3 사용해서 가독성 높이기
_go(
  users,
  _filter3((user) => user.age < 30),
  _map3(_get2("name")),
  console.log
)

// -----------------------------------------------------------------

// _keys 만들기
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