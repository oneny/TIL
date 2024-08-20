package effectivejava.chapter01.item07.reference;

import java.lang.ref.PhantomReference;
import java.lang.ref.Reference;
import java.lang.ref.ReferenceQueue;

public class PhantomReferenceExample {

  public static void main(String[] args) throws InterruptedException {
    BigObject strong = new BigObject();
    ReferenceQueue<BigObject> rq = new ReferenceQueue<>();

//    PhantomReference<BigObject> phantom = new PhantomReference<>(strong, rq);
    BigObjectReference<BigObject> phantom = new BigObjectReference<>(strong, rq);
    System.gc();
    Thread.sleep(3000L);


    // 팬텀은 유령이기 때문에 죽었지만 사라지진 않고 큐에 들어간다.
    System.out.println(phantom.enqueue()); // strong이 사라져 queue에 들어갔는지 확인 가능

    Reference<? extends BigObject> reference = rq.poll();
    BigObjectReference bigObjectCleaner = (BigObjectReference) reference;
    bigObjectCleaner.cleanUp(); // 자원반납 메서드 실행
    reference.clear(); // 직접 레퍼런스를 해제
  }
}
