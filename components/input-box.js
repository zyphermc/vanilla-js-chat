import { pushMessage } from "../js/store.js";

export class InputBox extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
      <style>
      .input {
        height: 50px;
        background-color: white;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        }
        .input input {
        width: 100%;
        border: none;
        outline: none;
        color: #2f2d52;
        font-size: 18px;
        }
        .input input::-moz-placeholder {
        color: lightgray;
        }
        .input input::placeholder {
        color: lightgray;
        }
        .input .send {
        display: flex;
        align-items: center;
        gap: 10px;
        }
        .input .send img {
        height: 24px;
        cursor: pointer;
        }
        .input .send button {
        border: none;
        padding: 10px 15px;
        color: white;
        background-color: #8da4f1;
        cursor: pointer;
        }
        #file {
        display: none;
        }
      </style>

      <div class="input">
          <input id="text-input" type="text" placeholder="Type something..." />
          <div class="send">
              <img src="https://www.w3schools.com/images/lamp.jpg" alt="" />
              <input type="file" id="file" />
              <label htmlFor="file">
                  <img src="https://www.w3schools.com/images/lamp.jpg" alt="" />
              </label>
              <button id="submit">Send</button>
          </div>
      </div>
      `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    this.controller = new AbortController();
  }

  // static get observedAttributes() {
  //   return ["contact-id"];
  // }

  connectedCallback() {
    const sendBtn = this.shadowRoot.getElementById("submit");

    if (sendBtn) {
      sendBtn.addEventListener("click", this.handleSend.bind(this), {
        signal: this.controller.signal,
      });
    }
  }

  disconnectedCallback() {
    this.controller.abort();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    //
  }

  handleSend() {
    const input = this.shadowRoot.getElementById("text-input");

    if (input) {
      this.findContactList().setAttribute("timestamp", new Date().getTime());
      this.findContactList().setAttribute("last-message", input.value);

      pushMessage(this.getAttribute("contact-id"), input.value, true);

      this.previousElementSibling.addMessageElement(
        input.value,
        true
      );

      input.value = "";
    }
  }

  findContactList() {
    return document
      .querySelector("home-page")
      .shadowRoot.querySelector(
        `user-contact[contact-id="${this.getAttribute("contact-id")}"]`
      );
  }
}

if (document.createElement("input-box").constructor.__proto__ !== HTMLElement)
  window.customElements.define("input-box", InputBox);
