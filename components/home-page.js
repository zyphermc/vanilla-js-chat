import { Sidebar } from "./side-bar.js";
import { ChatContainer } from "./chat-container.js";

class Home extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
    <style>
    .home {
      background-color: #a7bcff;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .home .container {
      border: 1px solid white;
      border-radius: 10px;
      width: 65%;
      height: 80%;
      display: flex;
      overflow: hidden;
    }
    chat-container {
    flex: 2;
    }
    </style>
  
    <div class="home">
      <div class="container">
      <side-bar></side-bar>
      <chat-container></chat-container>
      </div>
    </div>
        `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

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

if (document.createElement("home-page").constructor.__proto__ !== HTMLElement)
  window.customElements.define("home-page", Home);
