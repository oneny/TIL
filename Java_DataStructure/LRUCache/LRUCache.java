package org.example.background;

import java.util.*;

public class LRUCache<K, V> implements Cache<K, V> {

  private final int capacity;
  private final Map<K, Element<K, V>> elementMap;
  private final LinkedList<Element<K, V>> elementsList;

  public LRUCache(int capacity) {
    this.capacity = capacity;
    this.elementMap = new HashMap<>();
    this.elementsList = new LinkedList<>();
  }

  @Override
  public Optional<V> get(K key) {
    Optional<V> result = Optional.empty();

    if (containsKey(key)) {
      Element<K, V> findElement = elementMap.get(key);
      result = Optional.of(findElement.value);
      elementsList.remove(findElement);
      elementsList.addFirst(findElement);
    }

    return result;
  }

  @Override
  public void put(K key, V value) {
    if (containsKey(key)) { // 해당 key가 있으면 LinkedList에서 제거
      elementsList.remove(elementMap.get(key));
    } else { // 없는 경우 LinkedList의 사이즈가 capacity만큼 찬 경우
      ensureCapacity();
    }

    Element<K, V> newElement = new Element<>(key, value);
    elementMap.put(key, newElement);
    elementsList.addFirst(newElement);
  }

  @Override
  public boolean containsKey(K key) {
    return elementMap.containsKey(key);
  }

  @Override
  public int size() {
    return elementsList.size();
  }

  public Optional<K> getLastRecentKey() {
    return elementsList.size() > 0 ? Optional.of(elementsList.getFirst().key) : Optional.empty();
  }

  private boolean isSizeExceeded() {
    return size() == capacity;
  }

  private void ensureCapacity() {
    if (isSizeExceeded()) {
      Element<K, V> removedElement = elementsList.removeLast();
      elementMap.remove(removedElement.key);
    }
  }

  protected static class Element<K, V> {

    private final K key;
    private final V value;

    public Element(K key, V value) {
      this.key = key;
      this.value = value;
    }
  }
}
