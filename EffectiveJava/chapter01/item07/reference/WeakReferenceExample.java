package effectivejava.chapter01.item07.reference;

import java.lang.ref.WeakReference;

public class WeakReferenceExample {

  public static void main(String[] args) throws InterruptedException {
    Object strong = new Object();
    WeakReference<Object> weak = new WeakReference<>(strong);
    strong = null;

    System.gc();
    Thread.sleep(3000L);

    // WeakReference 경우에는 거의 없어진다.
    System.out.println(weak.get());
  }
}
