import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    return `
      <h1>Welcom back, Dom</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>
      <p>
        <a href="/posts" data-link>View recent posts</a>.
      </p>
    `;
  }
}
