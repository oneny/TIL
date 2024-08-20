# 8. 메서드

이번 장에서는 메서드를 설계할 때 주의할 점들을 살펴본다.
구체적으로는 매개변수와 반환값을 어떻게 처리해야 하는지, 메서드 시그니처는 어떻게 설계해야 하는지, 문서화는 어떻게 해야하는지를 다룬다.
이번 장의 내용 중 상당부분은 메서드뿐 아니라 생성자에도 적용된다.
그리고 '4장 클래스와 인터페이스'와 마찬가지로 이번 장도 사용성, 견고성, 유연성에 집중할 것이다.

## Item 49. 매개변수가 유효한지 검사하라

메서드나 생성자를 작성할 때면 그 매개변수들에 어떤 제약이 있을지 생각해야 한다. 그 제약들을 문서화하고 메서드 코드 시작 부분에서 명시적으로 검사해야 한다. 이런 습관을 반드시 기르도록 하자. 그 노력은 유효성 검사가 실제 오류를 처음 걸러낼 대 충분히 보상받을 것이다.

### 매개변수 검사하지 않으면 발생하는 문제

매개변수 검사를 제대로 하지 못하면 몇 가지 문제가 생길 수 있다.

1. 메서드가 수행되는 중간에 모호한 예외를 던지며 실패할 수 있다.
2. 메서드가 잘 수행되지만 잘못된 결과를 반환할 수 있다.
3. 메서드는 문제없이 수행됐지만, 어떤 객체를 이상한 상태로 만들어 미래의 알 수 없는 시점에 이 메서드와 관련 없는 오류가 발생할 수 있다.

따라서, public과 protected 메서드는 매개변수 값이 잘못됐을 때 던지는 예외를 문서화해야 한다.(@throws 자바독 태그를 사용하면 된다. 아이템 74)
보통은 IllegalArgumentException, IndexOutOfBoundsException, NullPointerException 중 하나로 문서화가 잘되어있으면 API 사용자는 제약을 지킬 가능성이 높아진다.

### `@throws` 자바독 태그 예시

```java
/**
 * (현재 값 mod m) 값을 반환한다. 이 메서드는
 * 항상 음이 아닌 BigInteger를 반환핟나는 점에서 remainder 메서드와 다르다.
 * 
 * @param m 계수(양수여야 한다.)
 * @return 현재 값 mod m
 * @throws ArtihmeticException m이 0보다 작거나 같으면 발생한다.
 */
public BigInteger mod(BigInteger m) {
    if (m.signum() <= 0) {
      throw new ArithmeticException("계수(m)는 양수여야 합니다. " + m);
    }

    ... // 계산 수행
}
```

### NullPointerException 검사

```java
this.strategy = Objects.requireNonNull(strategy, "전략");
```

자바 7에 추가된 java.util.Objects.requireNonNull 메서드는 유연하고 사용하기도 편하니, 더 이상 null 검사를 수동으로 하지 않아도 된다. 그리고 원하는 예외 메시지도 지정할 수 있으며, 입력을 그대로 반환하므로 값을 사용하는 동시에 null 검사를 수행할 수 있다.

#### 빠른 실패(Fail-Fast)

```java
void method1(String text) {
  // ...
  method2(text);
}

void method2(String text) {
  // ...
  method3(text);
}

void method3(String text) {
  // ...
  System.out.println(text.toUpperCase());
}

String text = null;
method1(text);
```

만약 위와 같이 method1이 호출되면 문자열 형식의 매개변수를 아무 의심없이 method2 -> method3에 전달하고 method3에서 필드나 메서드에 접근하려는 순간 NPE가 발생할 것이다.

이것을 방지하기 위해서 아래처럼 코드를 작성하면 조기에 이상 감지를 하여 methdo1에서 빠르게 실패할 수 있어 어디서 null이 발생했는지 추적하기 어려운 앞 예시 코드보다 좀 더 디버깅하기가 수월해진다.

```java
void method1(String text) {
  // ...
  method2(Objects.requireNonNull(text));
}
```

#### 명시성과 가독성

```java
String nullString = null;

if (nullString == null) {
  throw new NullPointerException("입력이 null입니다!");
}

Objects.requireNonNull(nullString, "입력이 null입니다!");
```

requireNonNull을 사용한 코드가 수동으로 널 체크한 코드보다 가독성이 더 좋고, 명시적임을 확인할 수 있다. 이러한 이유로 Objects.requireNonNull을 사용한다.

## Item 50. 적시에 방어적 복사본을 만들어라

```
클래스가 클라이언트로부터 받는 혹은 클라이언트로 반환하는 구성요소가 가변이라면 그 요소는 반드시 방어적으로 복사해야 한다. 복사 비용이 너무 크거나 클라이언트가 그 요소를 잘못 수정할 일이 없음을 신뢰한다면 방어적 복사를 수행하는 대신 해당 구성 요소를 수정했을 때의 책임이 클라이언트에 있음을 문서에 명시하도록 하자.
```

### 기간을 표현하는 클래스 - 불변식을 지키지 못한 경우

**클라이언트가 우리가 개발한 불변식을 깨뜨리려 혈안이 되어 있다고 가정하고 방어적으로 프로그래밍해야 한다.** 어떤 객체든 그 객체의 허락 없이는 외부에서 내부를 수정하도록 만들면 안된다. 하지만 주의를 기울이지 않으면 자기도 모르게 내부를 수정하도록 허락하는 경우가 생긴다.

```java
public final class Period {
  private final Date start;
  private final Date end;

  /**
   * @param start 시작 시각
   * @param end 종료 시각. 시작 시각보다 뒤여야 한다.
   * @throws IllegalArgumentException 시작 시각이 종료 시작보다 늦을 때 발생한다.
   * @throws NullPointerException start나 end가 null이면 발생한다.
   */
  public Period(Date start, Date end) {
    if (start.compareTo(end) > 0) {
      throw new IllegalArgumentException(start + " after " + end);
    }

    this.start = start;
    this.end = end;
  }
   
  public Date start() {
    return start;
  }

  public Date end() {
    return end;
  }

  // ...
}
```

위 Period 클래스는 한번 값이 정해지면 변하지 않도록 할 생각이었다. 그래서 실제로 위처럼 코드를 작성하면 Period 클래스는 불변처럼 보이고, 시작 시각이 종료 시각보다 늦을 수 없다는 불변식이 무리없이 지켜질 것 같다. 하지만 Date가 가변이라는 사실을 이용하면 어렵지 않게 그 불변식을 깨뜨릴 수 있다.

```java
// Period 인스턴스의 내부를 공격해보자.
Date start = new Date();
Date end = new Date();
Period p = new Period(start, end);
System.out.println("p = " + p);
end.setYear(96); // p의 내부를 수정했다.
System.out.println("p = " + p);
```


#### 결과

![image](https://github.com/marchidx04/db-practice/assets/126429401/22d94c6d-c43d-47da-a7f0-32bc33448a91)

다행히 자바 8 이후로는 Date 대신 불변(아이템 17)인 Instant를 사용하면 된다(혹은 LocalDateTime이나 ZonedDateTime을 사용해도 된다). Date는 낡은 API이니 새로운 코드를 작성할 때는 더 이상 사용하면 안된다. 만약 **외부 공격으로부터 Period 인스턴스의 내부를 보호하려면 생성자에서 받은 가변 매개변수 각각을 방어적으로 복사(defensive copy)해야 한다.** 그런 다음 Period 인스턴스 안에서는 워본이 아닌 복사본을 사용한다.

```java
// 수정한 생성자 - 매개변수의 방어적 복사본을 만든다.
public Period(Date start, Date end) {
  this.start = new Date(start.getTime());
  this.end = new Date(end.getTime());

  if (this.start.compareTom(this.end) > 0) {
    throw new IllegalArgumentException(this.start + " after " + this.end);
  }
}
```

**매개변수의 유효성을 검사(아이템 49)하기 전에 방어적 복사본을 만들고, 이 복사본으로 유효성을 검사한 점에 주목하자.** 멀티스레딩 환경이라면 원본 객체의 유효성을 검사한 후 복사본을 만드는 그 찰나의 취약한 순간에 다른 스레드가 원본 객체를 수정할 위험이 있기 때문이다. 방어적 복사를 매개변수 유효성 검사 전에 수행하면 이런 위험에서 해방될 수 있다. 컴퓨터 보안 커뮤니티에서는 이를 검사시점/사용시점(time-of-check/time-of-use) 공격 혹은 영어 표기를 줄여서 TOCTOU 공격이라 한다.   

방어적 복사에 Date의 clone 메서드를 사용하지 않은 점에도 주목하자. Date는 final이 아니므로 clone이 Date가 정의한 것이 아닐 수 있다. 즉, clone이 악의를 가진 하위 클래스의 인스턴스를 반환할 수도 있다. 예를 들어, 하위 클래스는 start와 end 필드의 참조를 private 정적 리스트에 담아뒀다가 공격자에게 이 리스트에 접근하는 길을 열어줄 수도 있다. 결국 공격자에게 Period 인스턴스 자체를 송두리째 맡기는 꼴이 된다.     
이런 공격을 막기 위해서는 **매개변수가 제3자에 의해 확장될 수 있는 타입이라면 방어적 복사본을 만들 때 clone을 사용해서는 안 된다.**   

### 가변 필드의 방어적 복사본 반환

```java
Date start = new Date();
Date end = new Date();
Period p = new Period(start, end);
System.out.println(p); // Period{start=Thu Jul 27 17:02:54 KST 2023, end=Thu Jul 27 17:02:54 KST 2023}
p.end().setYear(96); // p의 내부를 수정했다.
System.out.println(p); // Period{start=Thu Jul 27 17:02:54 KST 2023, end=Sat Jul 27 17:02:54 KST 1996}
```

위 코드로 봤듯이 생성자를 수정하면 앞서의 공격은 막아낼 수 있지만, Period 인스턴스는 아직도 접근자 메서드가 내부의 가변 정보를 직접 드러내기 때문에 변경이 가능하다.

#### 해결

```java
public Date start() {
  return new Date(start.getTime());
}

public Date end() {
  return new Date(end.getTime());
}
```

위 코드처럼 단순히 접근자가 **가변 필드의 방어적 복사본을 반환하면 된다.** 새로운 접근자까지 갖추면 Period는 완벽한 불변으로 거듭난다. 이제 아무리 악의적인 혹은 부주의한 프로그래머라도 시작 시각이 종료 시각보다 나중일 수 없다는 불변식으 위배할 방법은 없다. Period 자신 말고는 가변 필드에 접근할 방법이 없으니 확실하다. 모든 필드가 객체 안에 완벽하게 캡슐화되었다.     
생성자와 달리 접근자메서드에서는 방어적 복사에 clone을 사용해도 된다. Period가 가지고 있는 Date 객체는 java.util.Date임이 확실하기 떄문이다. 그렇더라도 아이템 13에서 설명한 이유 때문에 인스턴스를 복사하는 데는 일반적으로 생성자나 정적 팩터리를 쓰는 것이 좋다.

