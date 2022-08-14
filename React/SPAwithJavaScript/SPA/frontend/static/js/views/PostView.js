import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

  constructor(params){
    super(params);
    this.setTitle("Viewing Post");
  }

  async getHtml() {
    return `
      <h1>${this.params.id}번 Posts</h1>
      <p>You are viewing the posts!</p>
    `;
  }
}
