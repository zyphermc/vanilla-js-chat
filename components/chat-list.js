export class ChatList extends HTMLElement {
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

    <div class="chats">
        <div class="userChat">
          <img src="https://www.w3schools.com/images/lamp.jpg" alt="" />
          <div class="userChatInfo">
            <span>Contacts Name</span>
            <p>last message</p>
          </div>
        </div>
      </div>
    `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    this.controller = new AbortController();
  }

  connectedCallback() {}

  disconnectedCallback() {
    this.controller.abort();
  }

  attributeChangedCallback(name, newValue, oldValue) {
    //
  }
}

if (document.createElement("chat-list").constructor.__proto__ !== HTMLElement)
  window.customElements.define("chat-list", ChatList);
