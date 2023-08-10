public class Main {

  public static void main(String[] args) {
    Cache<Integer, TestObject> cache = new Cache<>();

    int i = 0;
    while (true) {
      if (System.currentTimeMillis() % 2 == 0) i++;

      if (i % 10 == 0) {
        cache.put(i, new TestObject());
      }
    }
  }
}