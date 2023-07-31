# 4. 클래스와 인터페이스

추상화의 기본 단위인 클래스와 인터페이스는 자바 언어의 심장과도 같다. 그래서 자바 언어에는 클래스와 인터페이스 설계에 사용하는 강력한 요소가 많이 있다. 이번 장에서는 이런 요소를 적절히 활용하여 클래스와 인터페이스를 쓰기 편하고, 견고하며, 유연하게 만드는 방법을 안내한다.

## Item 15. 클래스와 멤버의 접근 권한을 최소화하라

> 프로그램 요소의 접근성은 가능한 한 최소한으로 하라. 꼭 필요한 것만 골라 최소한의 public API를 설계하자. 그 외에는 클래스, 인터페이스, 멤버가 의도치 않게 API로 공개되는 일이 없도록 해야 한다. public 클래스는 상수용 public static final 필드 외에는 어떠한 public 필드도 가져서는 안 된다. public static final 필드가 참조하는 객체가 불변인지도 꼭 확인해야 한다.

잘 설계된 컴포넌트는 외부 컴포넌트로부터 클래스의 모든 내부 데이터와 내부 구현을 완벽히 숨겨, **구현과 API를 깔끔히 분리**한다. 오직 API를 통해서만 다른 컴포넌트와 소통하며 서로의 내부 동작 방식에는 전혀 개의치 않는다. 정보 은닉, 혹은 캡슐화라고 하는 이 개념은 소프트퉤어 설계의 근간이 되는 원리이다.    
시스템을 구성하는 컴포넌트들을 서로 독립시켜주는 정보 은닉의 장점은 다음과 같다.
- 시스템 개발 속도를 높인다. 여러 컴포넌트를 병렬로 개발할 수 있기 때문읻.
- 시스템 관리 비용을 낮춘다. 각 컴포넌트를 더 빨리 파악하여 디버깅할 수 있고, 다른 컴포넌트로 교체하는 부담도 적기 때문이다.
- 정보 은닉 자체가 성능을 높여주지는 않지만, 성능 최적화에 도움을 준다. 완성된 시스템을 프로파일링해 최적화할 컴포넌트를 정한 다음(아이템 67), 다른 컴포넌트에 영향을 주지 않고 해당 컴포넌트만 최적화할 수 있기 때문이다.
- 소프트웨어 재사용성을 높인다. 외부에 거의 의존하지 않고 독자적으로 동작할 수 있는 컴포넌트라면 그 컴포넌트와 함께 개발되지 않은 낯선 환경에서도 유용하게 쓰일 가능성이 있기 때문이다.
- 큰 시스템을 제작하는 난이도를 낮춰준다. 시스템 전체가 아직 완성되지 않은 상태에서도 개별 컴포넌트의 동작을 검증할 수 있기 때문이다.

### 정보 은닉의 기본 원칙

기본 원칙은 간단하다. **모든 클래스와 멤버의 접근성을 가능한 한 좁혀야 한다.** 즉, 가능한한 가장 낮은 접근 수준을 부여해야 한다는 뜻이다. 멤버(필드, 메서드, 중첩 클래스, 중첩 인터페이스)에 부여할 수 있는 접근 수준은 네 가지다. 접근 범위가 좁은 것부터 순서대로 살펴보면 다음과 같다.    

- **private:** 멤버를 선언한 톱레벨 클래스에서만 접근할 수 있다.
- **package-private:** 멤버가 소속된 패키지 안의 모든 클래스에서 접근할 수 있다. 접근 제한자를 명시하지 않았을 때 적용되는 패키지 접근 수준이다(단, 인터페이스의 멤버는 기본적으로 public이 적용된다).
  - 패키지를 외부에서 쓸 이유가 없다면 package-private으로 정해 내부 구현이 되도록 만들어 언제든 수정 가능하도록 만들자.
- **protected:** package-private의 접근 범위를 포함하며, 이 멤버를 선언한 클래스의 하위 클래스에서도 접근할 수 있다.
- **public**: 모든 곳에서 접근할 수 있다.
  - 공개 API가 되므로 영원히 관리해줘야 한다.

클래스의 공개 API를 세심히 설계한 후, 그 외의 모든 멤버는 private으로 만들자. 그런 다음 오직 같은 패키지의 다른 클래스가 접근해야 하는 멤버에 한하여 (private 제한자를 제거해) package-private으로 풀어주자. 권한을 풀어주는 일을 자주 하게 된다면 시스템에서 컴포넌트를 더 분해해야 하는 것은 아닌지 다시 고민해보자. private과 package-private 멤버는 모두 해당 클래스의 구현에 해당하므로 보통은 공개 API에 영향을 주지 않는다. 단, Serializable을 구현한 클래스에서는 그 필드들도 의도치 않게 공개 API가 될 수도 있다(아이템 86, 87).

### 멤버 접근성 좁히기 제약

![image](https://github.com/marchidx04/rails-practice/assets/126429401/ef9ba33e-2aa6-4f10-8dfe-bd5665b94cc4)

```
attempting to assign weaker access privileges ('private'); was 'public'
```

멤버 접근성을 좁히지 못하게 방해하는 제약이 하나 있다. 상위 클래스의 메서드를 재정의할 때는 그 접근 수준을 상위 클래스에서보다 좁게 설정할 수 없다는 것이다.  이 제약은 상위 클래스의 인스턴스는 하위 클래스의 인스턴스로 대체해 사용할 수 있어야 한다는 규칙(**리스코프 치환 원칙, 아이템 10)을 지키기 위해 필요하다. 이 규칙을 어기면 위 예시처럼 접근 수준을 더 좁게 재정의할 때 위와 같은 컴파일 에러가 나타난다

### public 클래스의 인스턴스 필드

public 클래스의 인스턴스 필드는 되도록 public이 아니어야 한다(아이템 16). 필드가 가변 객체를 참조하거나, public으로 선언하면 그 필드에 담을 수 있는 값을 제한할 힘을 잃어 불변식을 보장할 수 없다. 이러한 문제는 정적 필드에서도 마찬가지인데 한 가지 예외가 있다. 해당 클래스가 표현하는 추상 개념을 완성하는 데 꼭 필요한 구성요소로써의 상수라면 public static final 필드로 공개해도 괜찮다. 그리고 이런 필드는 반드시 기본 타입 갑시안 불변 객체를 참조해야 한다.

#### 잘 모르겠는 내용

public으로 설정한 필드는 필드가 수정될 때 (락 획득 같은) 다른 작업을 할 수 없게 되므로 public 가변 필드를 갖는 클래스는 일반적으로 스레드 안전하지 않다.

### public static final 주의점

길이가 0이 아닌 배열은 모두 변경 가능하다. 따라서 **클래스에서 public static final 배열 필드를 두거나 이 필드를 반환하는 접근자 메서드를 제공해서는 안 된다.** 이런 필드나 접근자를 제공한다면 이 필드를 사용하는 클라이언트에서 그 배열의 내용을 수정할 수 있어 보안 허점이 존재하게 된다.

#### 해결책

```java
private static final Thing[] PRIVATE_VALUES = { ... };
public static final List<Thing> VALUES = Collections.unmodifiableList(Arrays.asList(PRIVATE_VALUES));

private static final Thing[] PRIVATE_VALUES = { ... };
public static final Thing[] values() {
  return PRIVATE_VALUES.clone();
}
```

해결책은 두 가지다. 첫 번째 방법은 앞 코드의 public 배열을 private으로 만들고 public 불변 리스트를 추가하는 것이다. 두 번째 방법은 배열을 private으로 만들고 그 복사본을 반환하는 public 메서드를 추가하는 방법이다(방어적 복사). 클라이언트가 무엇을 원하느냐를 판단해 둘 중 하나를 선택하면 된다. 어느 반환 타입이 더 쓰기 편할지, 성능은 어느 쪽이 나을지를 고민해 정하자.

### 모듈과 패키지

패키지가 클래스들의 묶음이듯, 모듈은 패키지들의 묶음이다. 자바 9에서는 모듈 시스템이라는 개념이 도입되면서 두 가지 암묵적 접근 수준이 추가되었다.   
모듈은 자신에 속하는 패키지 중 공개(export)할 것들을 (관례상 module-info.java 파일에) 선언한다. protected 혹은 public 멤버라도 해당 패키지를 공개하지 않았다면 모듈 외부에서는 접근할 수 없다. 모듈 시스템을 활용하면 클래스를 외부에 공개하지 않으면서도 같은 모듈을 이루는 패키지 사이에서는 자유롭게 공유할 수 있는 장점이 있다.

#### 부분 이해가 가는 내용

앞서 다룬 4개의 기존 접근 수준과 달리, 모듈에 적용되는 새로운 두 접근 수준은 상당히 주의해서 사용해야 한다. 모듈의 JAR 파일을 자신의 모듈 경로가 아닌 애플리케이션의 클래스패스(classpath)에 두면 그 모듈 안의 모든 패키지는 마치 모듈이 없는 것처럼 행동한다. 즉, 모듈이 공개했는지 여부와 상관없이, public 클래스가 선언한 모든 public 혹은 protected 멤버를 모듈 밖에서도 접근할 수 있게 된다. 새로 등장한 이 접근 수준을 적극 활용한 대표적인 예가 JDK 자체다. 자바 라이브러이에서 공개하지 않은 패키지들은 해당 모듈 밖에서는 절대로 접근할 수 없다.

## Item 16. public 클래스에서는 public 필드가 아닌 접근자 메서드를 사용하라

> public 클래스는 절대 가변 필드를 직접 노출해서는 안 된다. 불변 필드라면 노출해도 덜 위험하지만 완전히 안심할 수는 없다. 하지만 package-private 클래스나 private 중첩 클래스에서는 종종 (불변이든 가변이든) 필드를 노출하는 편이 나을 때도 있다.

```java
// 16-1. 이처럼 퇴보한 클래스는 public 이어서는 안 된다!
class Point {
  public double x;
  public double y;
}
```

위 클래스는 데이터 필드에 직접 접근할 수 있으니 캡슐화의 이점을 제공하지 못한다(아이템 15). API를 수정하지 않고는 내부 표현을 바꿀 수 없고, 불변식을 보장할 수 없으며, 외부에서 필드에 접근할 때 부수 작업을 수행할 수도 없다.

```java
class Point {
  private double x;
  private double y;

  public Point(double x, double y) {
    this.x = x;
    this.y = y;
  }

  public double getX() {
    return x;
  }

  public double getY() {
    return y;
  }

  public void setX(double x) {
    this.x = x;
  }

  public void setY(double y) {
    this.y = y;
  }
}
```

public 클래스에서라면 이 방식이 확실히 맞다. **패키지 바깥에서 접근할 수 있는 클래스라면 접근자를 제공**함으로써 클래스 내부 표현 방식을 언제든 바꿀 수 있는 유연성을 얻을 수 있다. 하지만 package-private 클래스 혹은 private 중첩 클래스인 경우에는 패키지 바깥에서는 수정이 불가하기 땜누에 클라이언트 코드가 해당 public 클래스 내부 표현에 묶여 패키지 안에서만 동작하는 코드로 동작하기 때문에 데이터 필드를 노출한다해도 하등의 문제가 없다.

## Item 17. 변경 가능성을 최소화하라

> 클래스는 꼭 필요한 경우가 아니라면 불변이어야 한다. 하지만 모든 클래스를 불변으로 만들 수는 없기 때문에 불변으로 만들 수 없느 클래스라도 변경할 수 있는 부분을 최소한으로 줄이자. 객체가 가질 수 있는 상태의 수를 줄이면 그 객체를 예측하기 쉬워지고 오류가 생길 가능성이 줄어든다. 따라서 다른 합당한 이유가 없다면 모든 필드는 private final이어야 한다. 그리고 생성자느 불변식 설정이 모두 완료된, 초기화가 완벽히 끝난 상태의 객체를 생성해야 하다.

불변 클래스란 간단히 말해 그 인스턴스의 내부 값을 수정할 수 없는 클래스로 불변 인스턴스에 간직된 정보는 고정되어 객체가 파괴되는 순간까지 절대 달라지지 않는다. 자바 플랫폼 라이브러리에도 다양한 불변 클래스가 있는데 String, 기본 타입의 박싱된 클래스들, BigInteger, BigDecimal이 여기에 속한다. 불변 클래스는 가변 클래스보다 설계하고 구현하고 사용하기 쉬우며, 오류가 생길 여지가 적고 훨씬 안전하다.

### 불변 클래스를 만들기 위한 다섯 가지 규칙

- **객체의 상태를 변경하는 메서드(변경자)를 제공하지 않는다.**
- **클래스를 확장할 수 없도록 한다.**
  - 하위 클래스에서 부주의하게 혹은 나쁜 의도로 객체의 상태를 변하게 만드는 사태를 막아준다.
- **모든 필드를 final로 선언한다.**
  - 시스템이 강제하는 수단을 이용해 설계자의 의도를 명확히 드러내는 방법이다.
  - 새로 생성된 인스턴스를 동기화 없이 다른 스레드로 건네도 문제없이 동작하게끔 보장하는 데도 필요하다.
- **모든 필드를 private으로 선언한다.**
  - 필드가 참조하는 가변 객체를 클라이언트에서 직접 접근해 수정하는 일을 막아준다.
- **자신 외에는 내부의 가변 컴포넌트에 접근할 수 없도록 한다.** 
  - 클래스에 가변 객체를 참조하는 필드가 하나라도 있다면 클라이언트에서 그 객체의 참조를 얻을 수 없도록 해야 한다.
  - 생성자, 접근자, readObject 메서드(아이템 88) 모두에서 방어적 복사를 수행해야 한다.

### 불변 복소수 클래스

```java
public final class Complex {

    private final double re;
    private final double im;

    public Complex(double re, double im) {
        this.re = re;
        this.im = im;
    }

    public double realPart() {
        return re;
    }

    public double imaginaryPart() {
        return im;
    }

    public Complex plus(Complex c) {
        return new Complex(re + c.re, im + c.im);
    }

    public Complex minus(Complex c) {
        return new Complex(re - c.re, im - c.im);
    }

    public Complex times(Complex c) {
        return new Complex(re * c.re - im * c.im,
                        re * c.im + im * c.re);
    }

    public Complex dividedBy(Complex c) {
        double tmp = c.re * c.re + c.im * c.im;
        return new Complex((re * c.re + im * c.im) / tmp,
                        (im * c.re - re * c.im) / tmp);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Complex complex = (Complex) o;

        // == 대신 compare을 사용하는 이유는 p.63을 확인!
        return Double.compare(complex.re, re) == 0 && Double.compare(complex.im, im) == 0;
    }

    @Override
    public int hashCode() {
        return 31 * Double.hashCode(re) + Double.hashCode(im);
    }
}
```

이 클래스는 복소수(실수부와 허수부로 구성된 수)를 표현한다. 사칙연산 메서드들이 인스턴스 자신은 수정하지 않고 새로운 Complex 인스턴스를 만들어 반환하는 것에 주목하자. 이처럼 피연산자에 함수를 적용해 그 결과를 반환하지만, 피연산자 자체는 그대로인 프로그래밍 패턴을 함수형 프로그래밍이라 한다. 이와 달리, 절차적 혹은 명령형 프로그래밍에서는 메서드에서 피연산자인 자신을 수정해 자신의 상태가 변하게 된다.    
함수형 프로그래밍을 하면 코드에서 불변이 되는 영역의 비율이 높아지는 장점을 누릴 수 있다. 따라서 모든 생성자가 클래스 불변식을 보장한다면 그 클래스를 사용하는 프로그래머가 다른 노력을 들이지 않더라도 영원히 불변으로 남는다. 반면 가변 객체는 임의의 복잡한 상태에 놓일 수 있기 때문에 변경자 메서드가 일으키는 상태 전이를 정밀하게 문서로 남겨놓은 가변 클래스는 믿고 사용하기 어려울 수 있다.

### 불변 클래스의 장점

**불변 객체는 근본적으로 스레드 안전하여 따로 동기화할 필요 없다.** 불변 객체에 대해서는 그 어떤 스레드도 다른 스레드에 영향을 줄 수 없으니 **불변 객체는 안심하고 공유할 수 있다.** 따라서 불변 클래스라면 한 번 만든 인스턴스를 최대한 재활용하기를 권한다. 가장 쉬운 재활용 방법은 자주 쓰이는 값들을 상수(public static final)로 제공하는 것인데 Complext 클래스는 다음 상수들을 제공할 수 있다.

```java
public static final Complex ZERO = new Complex(0, 0);
public static final Complex ONE = new Complex(1, 0);
public static final Complex I = new Complex(0, 1);
```

이 방식으로 불변 클래스는 자주 사용되는 인스턴스를 캐싱하여 같은 인스턴스를 중복 생성하지 않게 해주는 정적 팩터리(아이템 1)를 제공할 수 있다. 박싱된 기본 타입 클래스 전부와 BigInteger가 여기 속하는데 정적 팩토리를 사용하여 여러 클라이언트가 인스턴스를 공유하여 메모리 사용량과 가비지 컬렉션 비용이 줄어든다.    
    
> 관련 블로그 글을 작성한 것이 있는데 [정적 팩토리 메서드, 인스턴스 캐싱](https://oneny.tistory.com/9)을 참고해보자.    
     
**객체를 만들 때 다른 불변 객체들을 구성요소로 사용하면 이점이 많다.** 값이 바뀌지 않는 구성요소들로 이뤄진 객체라면 그 구조가 아무리 복잡하더라도 불변식을 유지하기 훨씬 수월하기 때문이다. 좋은 예로, 불변 객체는 맵의키와 집합(Set)의 원소로 쓰기에 안성맞춤이다. 맵이나 집합은 안에 담긴 값이 바뀌면 불변식이 허물어지는데, 불변 객체를 사용하면 그런 걱정은 하지 않아도 된다.     
     
불변 객체는 그 자체로 실패 원자성을 제공한다(아이템 76). 상태가 절대 변하지 않으니 잠깐이라도 불일치 상태에 빠질 가능성이 없다.

### 불변 클래스의 단점

**값이 다르면 반드시 독립된 객체로 만들어야 한다는 것이다.** 값의 가짓수가 많다면 이들을 모두 만드는데 큰 비용을 치러야 한다.

#### 불변 클래스의 단점 해결

**다단계 연산(multistep operation)**들을 예측하여 기본 기능을 제공하여 더 이상 각 단계마다 객체를 생성하지 않도록 만들어 줄 수 있는데 BigInteger는 모듈러 지수 같은 다단계 연산 속도를 높여주는 가변 동반 클래스(companion class)를 package-private으로 두고 있다. 이 가변 동반 클래스를 사용하기는 BigInteger를 쓰는 것보다 훨씬 어려운데 다행히 BigInteger가 대신 처리해주고 있다.    
String 클래스 같은 경우에는 String의 가변 동반 클래스 StringBuilder(와 구닥다리 전임자 StringBuffer)를 제공하여 매번 String 객체를 생성하는 것을 방지할 수 있다.

### 불변 클래스의 다른 설계

```java
public final class Complex {

  private final double re;
  private final double im;

  private Complex(double re, double im) {
    this.re = re;
    this.im = im;
  }
  
  public static Complex valueOf(double re, double im) {
    return new Complex(re, im);
  }

  // ... 나머지 코드 생략
}
```

클래스가 불변임을 보장하려면 자신을 상속하지 못하게 해야 하는데 위에서 봤듯이 final 클래스로 선언하는 것도 있지만, 모든 생성자를 private 혹은 package-private으로 만들고 public 정적 팩토리를 제공하는 방법이 있다(아이템 1).    
패키지 바깥의 클라이언트에서 바라본 이 불변 객체는 사실상 final이기 때문에 package-private 구현 클래스를 원하는 만큼 만들어 활용할 수있으니 훨씬 유연하다. 정적 팩토리 방식은 다수의 구현 클래스를 활용한 유연성을 제공하고, 이에 더해 다음 릴리스에서 객체 캐싱 기능을 추가해 성능을 끌어올릴 수도 있다. 똑같은 값을 다시 요청하면 캐시해둔 값을 반환하여 계산 비용을 절감하는 것도 하나의 방법이다.

> 직렬화할 때는 추가로 주의할 점이 있다. Serializable을 구현하는 불변 클래스의 내부에 가변 객체를 참조하는 필드가 있다면 readObject나 readResolve 메서드를 반드시 제공하거나, ObjectOutputStream.writeUnshared와 ObjectInputStream.readUnshared 메서드를 사용해야 한다. 플랫폼이 제공하는 기본 직렬화 방법이면 충분하더라도 그렇지 않은 경우 공격자가 이 클래스로부터 가변 인스턴스를 만들어낼 수 있다(이 주제는 아이템 88에서 다룬다).

## Item 18. 상속보다는 컴포지션을 사용하라

> 상속은 강력하지만 캡슐화를 해친다는 문제가 있다. 상속은 상위 클래스와 하위 클래스가 순수한 is-a 관계일 때만 써야 한다. is-a 관계일 때도 안심할 수만은 없는 게, 하위 클래스의 패키지가 상위 클래스와 다르고, 상위 클래스가 확장을 고려해 설계되지 않았다면 여전히 문제가 될 수 있다. 상속의 취약점을 피하려며 상속 대신 컴포지션과 전달을 사용하자. 특히 래퍼 클래스로 구현할 적당한 인터페이스가 있다면 더욱 그렇다. 래퍼 클래스는 하위 클래스보다 견고하고 강력하다.

|구분|설명|
|--|--|
|상속|하위 클래스가 상위 클래스의 특성을 재정의한 것 -> (IS-A) 관계|
|컴포지션|기존 클래스가 새로운 클래스의 구성요소가 되는 것 -> (HAS-A) 관계|

### 상속의 단점

**메서드 호출과 달리 상속은 캡슐화를 깨뜨린다.** 상위 클래스는 릴리즈마다 내부 구현이 달라질 수 있으며, 그 여파로 코드 한 줄 건드리지 않은 하위 클래스가 오동작할 수 있다는 말이다. 이러한 이유로 상위 클래스 설계자가 확장을 충분히 고려하고 문서화도 제대로 해두지 않으면 하위 클래스느 상위 클래스의 변화에 발맞춰 수정돼야만 한다.

### 잘못된 상속을 한 경우

```java
public class InstrumentHashSet<E> extends HashSet<E> {

  // 추가된 원소의 수
  private int addCount = 0;

  public InstrumentHashSet() {

  }

  public InstrumentHashSet(int initCap, float loadFactor) {
    super(initCap, loadFactor);
  }

  @Override
  public boolean add(E e) {
    addCount++;
    return super.add(e);
  }

  @Override
  public boolean addAll(Collection<? extends  E> c) {
    addCount += c.size();
    return super.addAll(c);
  }

  public int getAddCount() {
    return addCount;
  }

  public static void main(String[] args) {
    InstrumentHashSet<String> s = new InstrumentHashSet<>();
    s.addAll(List.of("틱", "탁탁", "펑"));
    System.out.println("s.getAddCount() = " + s.getAddCount()); // 6
  }
}
```

이 클래스는 잘 구현된 것처럼 보이지만 제대로 작동하지 않는다. 이 클래스의 인스턴스에 addAll 메서드로 원소 3개를 더하고, getAddCount 메서드를 호출하며 3을 반환하리라 기대했지만, 실제로는 6을 반환한다.

```java
public boolean addAll(Collection<? extends E> c) {
  boolean modified = false;
  for (E e : c)
    if (add(e))
      modified = true;
  return modified;
}
```

그 원인은 HashSet의 addAll 메서드가 add 메서드를 사용해 구현되어 있다. 즉, InstrumentedHashSet의 addAll은 addCount에 3을 더한 후 HashSet의 addAll 구현을 호출했다. HashSet의 addAll은 각 원소를 add 메서드를 호출해 추가하는데, 이때 불리는 add는 InstrumentHashSet에서 재정의한 메서드다. 따라서 addCount에 값이 중복해서 더해져, 최종값이 6으로 늘어난 것이다. 이런 내부 구현 방식은 HashSet 문서에는 (당연히) 쓰여 있지 않다.

#### 상속에 따른 하위 클래스가 깨지기 쉬운 이유

addAll 메서드를 다른 식으로 재정의하여 문제를 해결할 수도 있지만 상위 클래스의 메서드 동작을 다시 구현하는 이 방식은 어렵고, 시간도 더 들고, 자칫 오류를 내거나 성능을 떨어뜨릴 수도 있다. 또한 하위 클래스에서는 접근할 수 없는 private 필드를 써야하는 상황이라면 이 방식으로는 구현 자체가 불가능하다.    
    
하위 클래스에서 보안 때문에 원소를 추가하는 모든 메서드를 재정의해 필요한 조건을 먼저 검사하게끔 만들었다고 가정해보자. 이 방식이 통하는 것은 상위 클래스에 또 다른 원소 추가 메서드가 만들어지기 전까지다. 다음 릴리즈에서 우려한 일이 생기면, 하위 클래스에서 재정의하지 못한 그 새로운 메서드를 사용해 '허용되지 않은' 원소를 추가할 수 있게 된다. 실제로도 컬렉션 프레임워크 이저부터 존재하던 Hashtable과 Vector를 컬렉션 프레임워크에 포함시키자 이와 관련한 보안 구멍들을 수정해야 하는 사태가 벌어졌다.    
    
다음 릴리즈에서 상위 클래스에 새 메서드가 추가됐는데, 운 없게 하위 클래스에 추가한 메서드와 시그니처가 같고 반환 타입은 다르다면 클래스는 컴파일조차 되지 않고, 반환 타입마저 같다하더라도 상위 클래스의 메서드가 요구하는 규악을 만족하지 못할 가능성이 크다.

### 컴포지션 사용

다행히 위 문제들을 모두 피해 가는 묘안이 있다. 기존 클래스를 확장하는 대신, 새로우 클래스를 만들고 private 필드로 기존 클래스의 인스턴스를 참조하게 만들면 된다. 기존 클래스가 새로운 클래스의 구성요소로 쓰인다는 뜻에서 이러한 설계를 컴포지션(composition, 구성)이라 한다.

### 컴포지션을 활용한 래퍼 클래스

```java
// 코드 18-3. 재사용할 수 있는 전달 클래스
public class ForwardingSet<E> implements Set<E> {

  private final Set<E> s;

  public ForwardingSet(Set<E> s) {
    this.s = s;
  }

  public void clear() {
    s.clear();
  }

  public boolean contains(Object o) {
    return s.contains(o);
  }

  public boolean isEmpty() {
    return s.isEmpty();
  }

  public int size() {
    return s.size();
  }

  public Iterator<E> iterator() {
    return s.iterator();
  }

  public boolean add(E e) {
    return s.add(e);
  }

  public boolean remove(Object o) {
    return s.remove(o);
  }

  public boolean containsAll(Collection<?> c) {
    return s.containsAll(c);
  }

  public boolean addAll(Collection<? extends  E> c) {
    return s.addAll(c);
  }

  public boolean removeAll(Collection<?> c) {
    return s.removeAll(c);
  }

  public boolean retainAll(Collection<?> c) {
    return s.retainAll(c);
  }

  public Object[] toArray() {
    return s.toArray();
  }

  public <T> T[] toArray(T[] a) {
    return s.toArray(a);
  }

  @Override
  public boolean equals(Object o) {
    return s.equals(o);
  }

  @Override
  public int hashCode() {
    return s.hashCode();
  }

  @Override
  public String toString() {
    return s.toString();
  }
}
```

새 클래스의 인스턴스 메서드들은 (private 필드로 참조하는) 기존 클래스의 대응하는 메서드를 호출해 그 결과를 반환한다. 이 방식을 전달(forwarding)이라 하며, 새 클래으싀 메서드들을 전달 메서드(forwarding method)라 부른다. 그 결과 새로운 클래스는 기존 클래스의 내부 구현 방식의 영향에서 벗어나며, 심지어 기존 클래스에 새로운 메서드가 추가되더라도 전혀 영향을 받지 않는다. 위 클래스가 전달 메서드만으로 이뤄진 재사용 가능한 전달 클래스이다.

```java
// 18-2. 래퍼 클래스 - 상속 대신 컴포지션을 사용했다.
public class InstrumentedSet<E> extends ForwardingSet<E> {

  private int addCount = 0;

  public InstrumentedSet(Set<E> s) {
    super(s);
  }

  @Override
  public boolean add(E e) {
    addCount++;
    return super.add(e);
  }

  @Override
  public boolean addAll(Collection<? extends E> c) {
    addCount += c.size();
    return super.addAll(c);
  }

  public int getAddCount() {
    return addCount;
  }

  public static void main(String[] args) {
    InstrumentedSet<String> s = new InstrumentedSet<>(new HashSet<>());
    s.addAll(List.of("틱", "탁탁", "펑"));
    System.out.println("s.getAddCount() = " + s.getAddCount()); // 3
  }
}
```

InstrumentSet은 HashSet의 모든 기능을 정의한 Set 인터페이스를 활용해 설계되어 견고하고 아주 유연하다. 구체적으로는 Set 인터페이스를 구현했고, Set의 인스턴스를 인수로 받는 생성자를 하나 제공한다. 임의의 Set에 계측 기능을 덧씌워 새로운 Set으로 만드는 것이 이 클래스의 핵심이다. 지금 보이는 컴포지션 방식은 한 번만 구현해두면 어떠한 Set 구현체라도 계측할 수 있으며, 기존 생성자들과 함께 사용할 수 있다.    
    
다른 Set 인스턴스를 감싸고(wrap) 있다는 뜻에서 InstrumentedSet 같은 클래스를 래퍼 클래스라 하며, 다른 Set에 계측 기능을 덧씌운다는 뜻에서 데코레이터 패턴(Decorator pattern)이라고 한다. 전달 메서드들을 작성하는 것이 지루할 수도 있지만, 재사용할 수 있는 전달 클래스(코드 18-3)를 인터페이스당 하나씩만 만들어두면 원하는 기능을 덧씌우는 전달 클래스들을 아주 손쉽게 구현할 수 있다.

### 컴포지션의 단점

컴포지션의 단점은 거의 없지만 한 가지 주의할 점은 클래스가 콜백 프레임워크와는 어울리지 않는다는 점이다. 콜백 프레임워크에서는 자기 자신의 참조를 다른 객체에 넘겨서 사용하도록 한다. 내부 객체는 자신을 감싸고 있는 래퍼의 존재를 모르니 자신의 참조를 넘기고, 콜백 때는 래퍼가 아닌 내부 객체를 호출하게 된다.(SELF 문제)
