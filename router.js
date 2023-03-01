const urlTitle = "Simple Chat App"

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routes = {
    404: {
      template: "/pages/404.html",
      title: "404 Error | " + urlTitle,
      description: "",
    },
    "/": {
      template: "/pages/Login.html",
      title: "Login | " + urlTitle,
      description: "",
    },
    "/register": {
      template: "/pages/Register.html",
      title: "Register | " + urlTitle,
      description: "",
    },
    "/home": {
      template: "/pages/Home.html",
      title: "Home | " + urlTitle,
      description: "",
    },
}

const handleLocation = async ()=>{
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route.template).then((data)=>data.text());
    document.getElementById("main-page").innerHTML = html;
    document.title = route.title;
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();