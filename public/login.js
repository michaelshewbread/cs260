function login() {
    const nameEl = document.querySelector("#username");
    localStorage.setItem("username", nameEl.value);
    window.location.href = "main.html";
  }