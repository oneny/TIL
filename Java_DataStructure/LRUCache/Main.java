package org.example.background;

public class Main {

  public static void main(String[] args) {
    PostRepository postRepository = new PostRepository(100_000);
    int count = 0;

    while (true) {
      if (System.currentTimeMillis() % 2 == 0) count++;

      if (count % 10 == 0) {
        CacheKey key = new CacheKey(count);
        postRepository.getPostById(key);
      }
    }
  }
}
