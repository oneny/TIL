import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

  constructor(params) {
    super(params);
    this.setTitle("Posts");
  }

  async getHtml() {
    return `
      <h1>This is Posts</h1>
      <ul>
        <li>
          <a href="/posts/1" data-link>1번 게시물</a>
        </li>
        <li>
          <a href="/posts/2" data-link>2번 게시물</a>
        </li>
        <li>
          <a href="/posts/3" data-link>3번 게시물</a>
        </li>
      </ul>
    `;
  }
}
