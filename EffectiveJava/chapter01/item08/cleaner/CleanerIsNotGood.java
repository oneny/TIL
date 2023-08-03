package effectivejava.chapter01.item08.cleaner;

import java.lang.ref.Cleaner;
import java.util.ArrayList;
import java.util.List;

public class CleanerIsNotGood {

  public static void main(String[] args) throws InterruptedException {
    Cleaner cleaner = Cleaner.create();

    List<Object> resourceToCleanUp = new ArrayList<>();
    BigObject bigObject = new BigObject(resourceToCleanUp);

    // 어떤 object가 gc될 때, 두 번째 인자처럼 Runnable 구현체를 사용해서 자원을 해제
    cleaner.register(bigObject, new BigObject.ResourceCleaner(resourceToCleanUp));

    bigObject = null;
    System.gc();
    Thread.sleep(3000L);
  }
}
