import { getData } from "../js/store.js";
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
    </div>
      `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    this.controller = new AbortController();
  }

  static get observedAttributes() {
    return ["contact-id"];
  }

  connectedCallback() {}

  disconnectedCallback() {
    this.controller.abort();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (attr === "contact-id") {
      const messages = getData()[this.getAttribute("contact-id")].messages;

      const el = this.shadowRoot.querySelector(".messages");

      //clear sample messages
      el ? (el.innerHTML = "") : console.log("messages not found");

      if (messages.length > 0) {
        for (let a = 0; a < messages.length; a++) {
          this.addMessageElement(messages[a].message, messages[a].owner);
        }
      }
    }
  }

  addMessageElement(message, owner) {
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
