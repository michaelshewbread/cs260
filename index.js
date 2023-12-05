const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GET the leaderboard
apiRouter.get('/leaderboard', (_req, res) => {
  res.send(scores);
});

// POST new score
apiRouter.post('/score', (req, res) => {
  scores = updateLeaderboard(req.body, scores);
  res.send(scores);
});

// POST new user
apiRouter.post('/user', (req, res) => {
    users = addUser(req.body, users);
    res.send(users);
  });

// GET users from storage
apiRouter.get('/users', (_req, res) => {
    res.send(users);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// inserts new score in leaderboard if applicable
let scores = [];
function updateLeaderboard(newScore, scores) {
  /*let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }*/

  //if (!found) {
  scores.push(newScore);
  //}

  /*if (scores.length > 10) {
    scores.length = 10;
  }*/

  return scores;
}

let users = [];
function addUser(newUser, users) {
    let found = false;
    for (let i = 0; i < users.length; i++) {
      if (newUser.name === users[i].name) {
        found = true;
        break;
      }
    }
  
    if (!found) {
      users.push(newUser);
    }
  
    return users;
  }