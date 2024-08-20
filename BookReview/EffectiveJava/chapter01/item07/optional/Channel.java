package effectivejava.chapter01.item07.optional;

import java.util.Optional;

public class Channel {

  private int numOfSubscriber;

  public Optional<MemberShip> defaultMemberShip() {
    if (this.numOfSubscriber < 2000) {
      return Optional.empty();
    } else {
      return Optional.of(new MemberShip());
    }
  }
}
