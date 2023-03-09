import { logoutUser } from "../js/authentication.js";

export class NavBar extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
      <style>
      .navbar {
        display: flex;
        align-items: center;
        background-color: #2f2d52;
        height: 50px;
        padding: 10px;
        justify-content: space-between;
        color: #ddddf7;
      }
      .navbar .logo {
        font-weight: bold;
        margin-right: 20px; 
      }
      .navbar .user {
        display: flex;
        gap: 10px;
      }
      .navbar .user img {
        background-color: #ddddf7;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        -o-object-fit: cover;
          object-fit: cover;
      }
      .navbar .user button {
        background-color: #5d5b8d;
        color: #ddddf7;
        font-size: 10px;
        border: none;
        cursor: pointer;
      }
      </style>

      <div class="navbar">
        <span class="logo">Simple Chat</span>
        <div class="user">
          <img id="user-image" src="https://www.w3schools.com/images/lamp.jpg" alt="" />
          <span id="user-name">Display Name</span>
          <button id="submit">Logout</button>
        </div>
      </div>
      `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    this.controller = new AbortController();
  }

  connectedCallback() {
    const logoutBtn = this.shadowRoot.getElementById("submit");
    // const elName = this.shadowRoot.getElementById("user-name");
    // const elImage = this.shadowRoot.getElementById("user-image");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", this.handleLogout.bind(this), {
        signal: this.controller.signal,
      });
    }
  }

  disconnectedCallback() {
    this.controller.abort();
  }

  attributeChangedCallback(name, newValue, oldValue) {
    //
  }

  handleLogout(e) {
    e.preventDefault();
    logoutUser();
  }
}

if (document.createElement("nav-bar").constructor.__proto__ !== HTMLElement)
  window.customElements.define("nav-bar", NavBar);
