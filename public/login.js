async function login() {
  const nameEl = document.querySelector("#username");
  const passEl = document.querySelector("#password");

  const username = nameEl.value;
  const password = passEl.value;

  try {
    // response will be a list of registered users, including 
    // this posted one. Not sure if that's useful
    const response = await fetch('api/auth/login', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({username: username, password: password}),
    });
    if (response.ok) {
      localStorage.setItem("username", username);
      window.location.href = "main.html";
    } else {
      console.log("Authentication error!");
    }
  } catch {
    // *gulp*
  }
}

async function register() {
  const nameEl = document.querySelector("#username");
  const passEl = document.querySelector("#password");

  const username = nameEl.value;
  const password = passEl.value;

  try {
    const response = await fetch('api/auth/register', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({username: username, password: password}), //may not work how i want
    });
    if (response.ok) {
      localStorage.setItem("username", username);
      // to the game!
      window.location.href = "main.html";
    } else {
      console.log("Registration error!");
    }
  } catch {
    // *gulp*
  }
}