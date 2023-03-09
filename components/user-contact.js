import { getData } from "../js/store.js";

export class UserContact extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
    <style>
    .userChat {
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: white;
        cursor: pointer;
      }
      .userChat:hover {
        background-color: #2f2d52;
      }
      .userChat img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        -o-object-fit: cover;
          object-fit: cover;
      }
      .userChat .userChatInfo span {
        font-size: 18px;
        font-weight: 500;
      }
      .userChat .userChatInfo p {
        font-size: 14px;
        color: lightgray;
      }
    </style>

    <div id="contact" class="userChat">
      <img src="https://www.w3schools.com/images/lamp.jpg" alt="" />
      <div class="userChatInfo">
        <span id="contact-name">contact name</span>
        <p id="last-message">last message</p>
      </div>
    </div>
 
    `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    this.controller = new AbortController();
  }

  static get observedAttributes() {
    return ["timestamp", "last-message"];
  }

  connectedCallback() {
    const contactNameElement = this.shadowRoot.querySelector("#contact-name");
    const lastMessageElement = this.shadowRoot.querySelector("#last-message");
    const contactName = getData()[this.getAttribute("contact-id")].name;
    const messagesArr = getData()[this.getAttribute("contact-id")].messages;
    const lastMessage = messagesArr[messagesArr.length - 1].message;

    this.setAttribute("last-message", lastMessage);

    contactNameElement
      ? (contactNameElement.innerHTML = contactName)
      : console.log("contactNameElement not found");
    lastMessageElement
      ? (lastMessageElement.innerHTML = this.getAttribute("last-message"))
      : console.log("lastMessageElement not found");

    this.shadowRoot.addEventListener(
      "click",
      () => {
        const homePage = document.querySelector("home-page");

        homePage
          ? homePage.setAttribute("contact-id", this.getAttribute("contact-id"))
          : console.log("homePage not found");
      },
      { signal: this.controller.signal }
    );

    console.log("user-contact connected");
  }

  disconnectedCallback() {
    this.controller.abort();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (attr === "last-message") {
      const lastMessageElement = this.shadowRoot.querySelector("#last-message");
      lastMessageElement.innerHTML = newValue;

      const homePage = document.querySelector("home-page");

      homePage
        ? homePage.setAttribute("last-updated", new Date().getTime())
        : console.log("homePage not found");
    }
  }
}

if (
  document.createElement("user-contact").constructor.__proto__ !== HTMLElement
)
  window.customElements.define("user-contact", UserContact);
