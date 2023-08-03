package effectivejava.chapter01.item08.autoclosable;

import java.io.BufferedInputStream;
import java.io.IOException;

public class AutoCloseableIsGood implements AutoCloseable {

  private BufferedInputStream inputStream;

  @Override
  public void close() {
    try {
      inputStream.close();
    } catch (IOException e) {
      throw new RuntimeException("failed to close " + inputStream);
    }
  }
}
