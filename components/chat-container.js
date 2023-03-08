import { MessageList } from "./message-list.js";
import { InputBox } from "./input-box.js";

export class ChatContainer extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
    <style>
    .chat {
        height: 80vh;
    }
    .chat .chatInfo {
        height: 50px;
        background-color: #5d5b8d;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        color: lightgray;
    }
    .chat .chatIcons {
        display: flex;
        gap: 10px;
    }
    .chat .chatIcons img {
        height: 24px;
        cursor: pointer;
    }
    </style>

    <div class="chat">
        <div class="chatInfo">
            <span>Recipient Name</span>
            <div class="chatIcons">
                <img src="https://www.w3schools.com/images/lamp.jpg" alt="" />
                <img src="https://www.w3schools.com/images/lamp.jpg" alt="" />
                <img src="https://www.w3schools.com/images/lamp.jpg" alt="" />
            </div>
        </div>
        <message-list></message-list>
        <input-box></input-box>
    </div>
      `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    this.controller = new AbortController();
  }

  connectedCallback() {
    console.log("chat-container connected");
  }

  disconnectedCallback() {
    this.controller.abort();
  }

  attributeChangedCallback(name, newValue, oldValue) {
    //
  }
}

if (
  document.createElement("chat-container").constructor.__proto__ !== HTMLElement
)
  window.customElements.define("chat-container", ChatContainer);
