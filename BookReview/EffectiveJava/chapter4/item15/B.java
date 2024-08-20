package effectiveJava.chapter4.item15;

public class B extends A {

    // attempting to assign weaker access privileges ('private'); was 'public' 에러 발생
    @Override
    private void addA() {
        System.out.println("hi");
    }
}
