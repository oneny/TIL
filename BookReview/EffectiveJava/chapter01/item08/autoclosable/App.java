package effectivejava.chapter01.item08.autoclosable;

public class App {

  public static void main(String[] args) {

    try (AutoCloseableIsGood goood = new AutoCloseableIsGood()) {
      // TODO 자원 반납 처리가 됨
    }
  }
}
