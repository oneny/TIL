public class Cache<K, V> {

  private final HashMap<K, CacheSoftReference<K, V>> map = new HashMap<>();

  // 참조 대상 객체들의 생명 주기를 추적하고 gc에 의해 수집되는 객체들을 모으는데 사용
  // 참조가 약한 객체들은 여기에 담긴다.
  private final ReferenceQueue<V> queue = new ReferenceQueue<>();

  public void put(K key, V value) {
    cleanUp(); // 참조가 약한 객체들을 먼저 제거하고 넣는다.
    CacheSoftReference<K, V> ref = new CacheSoftReference<>(key, value, queue);
    map.put(key, ref);
  }

  public V get(K key) {
    CacheSoftReference<K, V> ref = map.get(key);
    if (ref == null) {
      return null;
    }

    return ref.get(); // referent 가져오기
  }

  public V remove(K key) {
    cleanUp();
    CacheSoftReference<K, V> ref = map.remove(key);
    if (ref == null) {
      return null;
    }

    return ref.get();
  }

  private void cleanUp() {
    CacheSoftReference<K, V> ref;

    // queue에는 참조가 약한 객체들이 담겨있고, OOM을 방지하기 위해 제거한다.
    // 참조 카운트가 0이 된 객체들은 JVM이 queue에 담는다.
    while ((ref = (CacheSoftReference<K, V>) queue.poll()) != null) {
      map.remove(ref.key);
    }
  }

  private static class CacheSoftReference<K, V> extends SoftReference<V> {

    private final K key;

    public CacheSoftReference(K key, V referent, ReferenceQueue<V> queue) {
      super(referent, queue);
      this.key = key;
    }

    @Override
    public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      CacheSoftReference<?, ?> that = (CacheSoftReference<?, ?>) o;
      return Objects.equals(key, that.key);
    }

    @Override
    public int hashCode() {
      return Objects.hash(key);
    }
  }
}