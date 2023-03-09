import { NavBar } from "./nav-bar.js";
import { SearchBox } from "./search-box.js";
import { UserContact } from "./user-contact.js";
import { MessageList } from "./message-list.js";
import { MessageHeader } from "./message-header.js";
import { InputBox } from "./input-box.js";

class HomePage extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
    <style>
    .home {
      background-color: #a7bcff;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      
    }
    .home .container {
      border: 1px solid white;
      border-radius: 10px;
      width: 65%; 
      height: 80%;
      display: flex;
      overflow: hidden;
    }
    .chat {
      flex: 2;
      height: 80vh;
    }
    .sidebar {
      flex: 1;
      background-color: #3e3c61;
      position: relative;
      height: 100vh
    }
    </style>
  
    <div class="home">
      <div class="container">
        <div class="sidebar">
          <nav-bar></nav-bar>
          <search-box></search-box>
          <div id="contact-list">
            <user-contact contact-id="0"></user-contact>
            <user-contact contact-id="1"></user-contact>
            <user-contact contact-id="2"></user-contact>
          </div>
        </div>
        <div class="chat">
          <message-header contact-id="0" name=""></message-header>
          <message-list contact-id="0"></message-list>
          <input-box contact-id="0"></input-box>
        </div>
      </div>
    </div>
        `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    this.controller = new AbortController();
  }

  static get observedAttributes() {
    return ["contact-id", "last-updated"];
  }

  connectedCallback() {
    this.setAttribute("contact-id", 0);
    this.setAttribute("last-updated", new Date().getTime());
  }

  disconnectedCallback() {
    this.controller.abort();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (newValue === oldValue) return;

    if (attr === "contact-id") {
      const msgHeader = this.shadowRoot.querySelector("message-header");
      const msgList = this.shadowRoot.querySelector("message-list");
      const inputBox = this.shadowRoot.querySelector("input-box");

      msgHeader
        ? msgHeader.setAttribute("contact-id", newValue)
        : console.log("header not found");
      msgList
        ? msgList.setAttribute("contact-id", newValue)
        : console.log("list not found");
      inputBox
        ? inputBox.setAttribute("contact-id", newValue)
        : console.log("input not found");
    }

    // if (attr === "last-updated") {
    //   //sort convos
    // }
  }

  sortDivs() {
    const contactListElement = this.shadowRoot.querySelector("#contact-list");
    const contactDivElements = this.shadowRoot.querySelectorAll("user-contact");

    let toSort = Array.prototype.slice.call(contactDivElements, 0);

    toSort.sort((a, b) => {
      let timestampA = a.getAttribute("timestamp");
      let timestampB = b.getAttribute("timestamp");

      return timestampB - timestampA;
    });

    contactListElement.innerHTML = "";

    for (var a = 0; a < toSort.length; a++) {
      contactListElement.appendChild(toSort[a]);
    }
  }
}

if (document.createElement("home-page").constructor.__proto__ !== HTMLElement)
  window.customElements.define("home-page", HomePage);
