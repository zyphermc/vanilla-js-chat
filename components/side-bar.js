import { NavBar } from "./nav-bar.js";
import { SearchBox } from "./search-box.js";
import { ChatList } from "./chat-list.js";

export class Sidebar extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
      <style>
      .sidebar {
        flex: 1;
        background-color: #3e3c61;
        position: relative;
        height: 100vh
      }
      </style>

    <div class="sidebar">
      <nav-bar></nav-bar>
      <search-box></search-box>
      <chat-list></chat-list>
    </div>
    `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    let p = document.createElement("p");
    p.innerText = "Hello World";

    shadow.append(p);

    this.controller = new AbortController();
  }

  connectedCallback() {}

  disconnectedCallback() {
    this.controller.abort();
  }

  attributeChangedCallback(name, newValue, oldValue) {
    //
  }
}

if (document.createElement("side-bar").constructor.__proto__ !== HTMLElement)
  window.customElements.define("side-bar", Sidebar);
