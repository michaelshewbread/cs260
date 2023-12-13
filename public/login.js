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
      unlockHeader();
      window.location.href = "main.html";
    } else {
      console.log("Authentication error!");
    }
  } catch {
    // *gulp*
  }
}

async function authenticate(username) {

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
      unlockHeader();
      // to the game!
      window.location.href = "main.html";
    } else {
      console.log("Registration error!");
    }
  } catch {
    // *gulp*
  }
}

//see if the current user is authenticated
async function authenticate() {
  try {
    const response = await fetch('api/auth/me');
    console.log(response.username);
    if (response.ok) {
      unlockHeader();
    } else {
      lockHeader();
    }
  } catch {
    // *gulp*
  }
}

function unlockHeader() {
  const header = document.getElementsByClassName('restricted');
  for (let i = 0; i < header.length; i++) {
    header[i].style.visibility = "visible";
  }
  console.log("done");
}

function lockHeader() {
  const header = document.getElementsByClassName('restricted');
  for (let i = 0; i < header.length; i++) {
    header[i].style.visibility = "hidden";
  }
  console.log("done");
}

authenticate();
