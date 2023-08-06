package org.example.background;

import org.w3c.dom.Node;

import java.util.Map;
import java.util.Optional;

public interface Cache<K, V> {

  Optional<V> get(K key);

  void put(K key, V value);

  boolean containsKey(K key);

  int size();
}
