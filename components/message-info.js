export class MessageInfo extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
    <style>
    .message {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    }
    .message .messageInfo {
    display: flex;
    flex-direction: column;
    color: gray;
    font-weight: 300;
    }
    .message .messageInfo img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    -o-object-fit: cover;
    object-fit: cover;
    }
    .message .messageContent {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    }
    .message .messageContent p {
    background-color: white;
    padding: 10px 20px;
    border-radius: 0px 10px 10px 10px;
    max-width: -moz-max-content;
    max-width: max-content;
    font-size: 16px;
    }
    .message .messageContent img {
    width: 50%;
    }
    .message.owner {
    flex-direction: row-reverse;
    }
    .message.owner .messageContent {
    align-items: flex-end;
    }
    .message.owner .messageContent p {
    background-color: #8da4f1;
    color: white;
    border-radius: 10px 0px 10px 10px;
    }
    </style>

    <div id="message-container" class="message" >
      <div class="messageInfo">
        <img src="https://www.w3schools.com/images/lamp.jpg" alt="" />
        <span>just now</span>
      </div>
      <div class="messageContent">
        <p id="owner-message">Message User</p>
      </div>
    </div>
    `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    this.controller = new AbortController();
  }

  connectedCallback() {
    const el = this.shadowRoot.getElementById("owner-message");
    const container = this.shadowRoot.getElementById("message-container");

    if (el && container) {
      el.innerText = this.getAttribute("message");
      this.getAttribute("owner") == "true"
        ? container.classList.add("owner")
        : "";
    }
  }

  disconnectedCallback() {
    this.controller.abort();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name},${oldValue},${newValue}`);
  }
}

if (
  document.createElement("message-info").constructor.__proto__ !== HTMLElement
)
  window.customElements.define("message-info", MessageInfo);
