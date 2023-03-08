export class SearchBox extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
      <style>
      .search {
        border-bottom: 1px solid gray;
      }
      .search .searchForm {
        padding: 10px;
      }
      .search .searchForm input {
        background-color: transparent;
        border: none;
        color: white;
        outline: none;
      }
      .search .searchForm input::-moz-placeholder {
        color: lightgray;
      }
      .search .searchForm input::placeholder {
        color: lightgray;
      }
      .search .userChat {
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: white;
        cursor: pointer;
      }
      .search .userChat:hover {
        background-color: #2f2d52;
      }
      .search .userChat img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        -o-object-fit: cover;
          object-fit: cover;
      }
      .search .userChat .userChatInfo span {
        font-size: 18px;
        font-weight: 500;
      }
      .search .userChat .userChatInfo p {
        font-size: 14px;
        color: lightgray;
      }
      </style>

      <div class="search">
        <div class="searchForm">
          <input type="text" placeholder="Find a user"/>
        </div>

        <div class="userChat">
          <img src="https://www.w3schools.com/images/lamp.jpg" alt="" />
          <div class="userChatInfo">
            <span>Search Result Name</span>
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

if (document.createElement("search-box").constructor.__proto__ !== HTMLElement)
  window.customElements.define("search-box", SearchBox);
