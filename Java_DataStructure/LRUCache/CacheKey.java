package org.example.background;

import java.util.Objects;

public class CacheKey {

  private Integer value;

  public CacheKey(Integer value) {
    this.value = value;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    CacheKey cacheKey = (CacheKey) o;
    return Objects.equals(value, cacheKey.value);
  }

  @Override
  public int hashCode() {
    return Objects.hash(value);
  }
}
