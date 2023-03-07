import { registerUser } from "../js/authentication.js";

class RegisterForm extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
    <style>
    .formContainer {
      background-color: #a7bcff;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .formContainer .formWrapper {
      background-color: white;
      padding: 20px 60px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
    .formContainer .formWrapper .logo {
      color: #5d5b8d;
      font-weight: bold;
      font-size: 24px;
    }
    .formContainer .formWrapper .title {
      color: #5d5b8d;
      font-size: 12px;
    }
    .formContainer .formWrapper form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .formContainer .formWrapper form input {
      padding: 15px;
      border: none;
      width: 250px;
      border-bottom: 1px solid #a7bcff;
    }
    .formContainer .formWrapper form input::-moz-placeholder {
      color: rgb(175, 175, 175);
    }
    .formContainer .formWrapper form input::placeholder {
      color: rgb(175, 175, 175);
    }
    .formContainer .formWrapper form button {
      background-color: #7b96ec;
      color: white;
      padding: 10px;
      font-weight: bold;
      border: none;
      cursor: pointer;
    }
    .formContainer .formWrapper form label {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #8da4f1;
      font-size: 12px;
      cursor: pointer;
    }
    .formContainer .formWrapper form label img {
      width: 32px;
    }
    .formContainer .formWrapper p {
      color: #5d5b8d;
      font-size: 12px;
      margin-top: 10px;
    }
    </style>

    <div class="formContainer">
      <div class="formWrapper">
        <span class="logo">Simple Chat</span>
        <span class="title">Register</span>
        <form id="register" onsubmit="return false">
          <input required id="name" type="text" placeholder="Display name" />
          <input required id="email" type="email" placeholder="Enter email" />
          <input
            required
            id="password"
            type="password"
            placeholder="Enter password"
          />
          <input required type="file" id="file" accept="image/*" />
          <label for="file">
            <img src="https://www.w3schools.com/images/lamp.jpg" alt="" />
            <span>Add an avatar</span>
          </label>
          <button id="submit">Sign up</button>
        </form>
        <p>You have an account? <a href="Login.html">Login</a></p>
      </div>
    </div>
    `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    this.controller = new AbortController();
  }

  connectedCallback() {
    console.log("register connected");

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

  attributeChangedCallback(name, newValue, oldValue) {
    //
  }

  on_click(ev) {
    ev.preventDefault();

    const name = this.shadowRoot.getElementById("name").value;
    const email = this.shadowRoot.getElementById("email").value;
    const password = this.shadowRoot.getElementById("password").value;
    const file = this.shadowRoot.getElementById("file").value;

    registerUser(name,email, password, file);
  }
}

if (document.createElement("register-form").constructor.__proto__ !== HTMLElement)
  window.customElements.define("register-form", RegisterForm);



