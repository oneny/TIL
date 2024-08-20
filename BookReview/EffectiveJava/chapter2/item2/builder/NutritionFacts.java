package effectiveJava.chapter2.item2.builder;

/**
 * 점층적 생성자 패턴과 자바빈즈 패턴의 장점만 취했다(17 - 18쪽)
 * 점층적 생성자 패턴 단점: 매개변수가 아래 예시보다 더 많아지면 실수할 가능성이 커지고, 확장하기 어렵다!
 * 자바빈즈 패턴 단점: 객체 하나 만들기 위해 메서드 여러 호출, 완전히 생성 전까지는 일관성이 깨지고, 불변으로 만들 수 없다.
 * 빌더 패턴의 사용
 *   1. 클라이언트는 필요한 객체를 직접 만드는 대신, 필수 매개변수만으로 생성자(혹은 정적 팩토리)를 호출해 빌더 객체를 얻는다.
 *   2. 그런 다음 빌더 객체가 제공하는 일종의 세터 메서드들로 원하는 선택 매개변수들을 설정한다.
 *   3. 마지막으로 매개벼수가 없는 build 메서드를 호출해 필요한(보통 불변인) 객체를 얻는다.
 *   빌더는 생성할 클래스 안에 정적 멤버 클래스로 만들어 두는 것이 보통이다.
 */
public class NutritionFacts {

    private final int servingSize; // (mL, 1회 제공량), 필수
    private final int servings; // (회, 총 n회 제공량), 필수
    private final int calories; // (1회 제공량당), 선택
    private final int fat; // (g/1회 제공량), 선택
    private final int sodium; // (mg/1회 제공량), 선택
    private final int carbohydrate; // (g/1회 제공량0), 선택

    private NutritionFacts(Builder builder) {
        this.servingSize = builder.servingSize;
        this.servings = builder.servings;
        this.calories = builder.calories;;
        this.fat = builder.fat;
        this.sodium = builder.sodium;
        this.carbohydrate = builder.carbohydrate;
    }

    /**
     * 아래 빌더 패턴을 사용하면 빌더의 생성자와 메서드에서 입력 매개변수들을 검사하여
     * 잘못된 매개변수를 일찍 발견할 수 있다.
     * 공격에 대비해 불변식을 보장하려면 빌더로부터 매개변수를 복사한 후 해당 객체 필드들도 검사해야 한다고 하는데
     * 이는 나중에 아이템50에서 나옴...
     * 암튼, 검사해서 잘못된 점을 발견하여 어떤 매개변수가 잘못되었는지 자세히 알려주는 메시지를 담아
     * IllegalArgumentException을 던지면 된다.(아이템 75)
     */
    public static class Builder {
        // 필수 매개변수
        private final int servingSize;
        private final int servings;

        // 선택 매개변수 - 기본값으로 초기화한다.
        private int calories = 0;
        private int fat = 0;
        private int sodium = 0;
        private int carbohydrate = 0;

        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings = servings;
        }

        public Builder calories(int value) {
            calories = value;
            return this;
        }

        public Builder fat(int value) {
            fat = value;
            return this;
        }

        public Builder sodium(int value) {
            sodium = value;
            return this;
        }

        public Builder carbohydrate(int value) {
            carbohydrate = value;
            return this;
        }

        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }

    public static void main(String[] args) {
        // 빌더의 세터 메서드들은 빌더 자신을 반환하기 때문에 연쇄적으로 호출할 수 있다.
        // 이러한 클라이언트 코드는 쓰기 쉽고, 가독성이 좋다.
        NutritionFacts cocaCola = new Builder(240, 8)
                .calories(100)
                .sodium(35)
                .carbohydrate(27)
                .build();
    }
}
