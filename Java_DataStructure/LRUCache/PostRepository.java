package org.example.background;

import java.util.Optional;

public class PostRepository {

  private final LRUCache<CacheKey, Post> cache;

  public PostRepository(int capacity) {
    this.cache = new LRUCache<>(capacity);
  }

  public Optional<Post> getPostById(CacheKey key) {
    if (cache.containsKey(key)) {
      return cache.get(key);
    }

    Post post = new Post();
    cache.put(key, post);
    return Optional.of(post);
  }

  public LRUCache<CacheKey, Post> getCache() {
    return cache;
  }
}
