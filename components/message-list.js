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
        <message-info message="Hello World" owner="true"></message-info>
        <message-info message="Foobar" owner="false"></message-info>
        <button id="submit">Add Message</button>
    </div>
      `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    this.controller = new AbortController();
  }

  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    const el = this.shadowRoot.getElementById("submit");

    if (el) {
      el.addEventListener("click", this.on_click.bind(this), {
        signal: this.controller.signal,
      });
    }
  }

  disconnectedCallback() {
    this.controller.abort();
  }

  attributeChangedCallback(name, oldValue, newValue) {}

  on_click(e) {
    e.preventDefault();
    this.addMessage("hello", "true");
  }

  addMessage(message, owner) {
    const myMessage = document.createElement("message-info");
    myMessage.setAttribute("message", message);
    myMessage.setAttribute("owner", owner);

    this.shadowRoot.querySelector(".messages").appendChild(myMessage);
  }
}

if (
  document.createElement("message-list").constructor.__proto__ !== HTMLElement
)
  window.customElements.define("message-list", MessageList);
