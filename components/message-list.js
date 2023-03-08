import { MessageInfo } from "./message-info.js";

export class MessageList extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
    <style>
        .messages {
            background-color: #ddddf7;
            padding: 10px;
            height: calc(100% - 160px);
            overflow: scroll;
        }
    </style>


    <div class="messages">
        <message-info data-message="Hello World" data-owner="true"></message-info>
        <message-info data-message="Foobar" data-owner="false"></message-info>
    </div>
      `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    this.controller = new AbortController();
  }

  connectedCallback() {
    console.log("message list connected");
  }

  disconnectedCallback() {
    this.controller.abort();
  }

  attributeChangedCallback(name, newValue, oldValue) {
    //
  }
}

if (
  document.createElement("message-list").constructor.__proto__ !== HTMLElement
)
  window.customElements.define("message-list", MessageList);
