import { getData } from "../js/store.js";

export class MessageHeader extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
    <style>
    .chatInfo {
        height: 50px;
        background-color: #5d5b8d;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        color: lightgray;
    }
    .chatIcons {
        display: flex;
        gap: 10px;
    }
    .chatIcons img {
        height: 24px;
        cursor: pointer;
    }
    </style>

    <div class="chatInfo">
        <span id="header-name">contact name</span>
        <div class="chatIcons">
            <img src="https://www.w3schools.com/images/lamp.jpg" alt="" />
            <img src="https://www.w3schools.com/images/lamp.jpg" alt="" />
            <img src="https://www.w3schools.com/images/lamp.jpg" alt="" />
        </div>
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
      const headerName = this.shadowRoot.querySelector("#header-name");

      headerName
        ? (headerName.innerHTML =
            getData()[this.getAttribute("contact-id")].name)
        : console.log("header element not found");
    }
  }
}

if (
  document.createElement("message-header").constructor.__proto__ !== HTMLElement
)
  window.customElements.define("message-header", MessageHeader);
