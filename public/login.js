async function login() {
  const nameEl = document.querySelector("#username");
  const username = nameEl.value;
  const name = {"username":username};
  try {
    // response will be a list of registered users, including 
    // this posted one. Not sure if that's useful
    const response = await fetch('api/user', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(name),
    });
  } catch {
    // *gulp*
  }
  localStorage.setItem("username", username);
  window.location.href = "main.html";
}

function register() {

}