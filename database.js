const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

// Connect to the database cluster
const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const scoreCollection = db.collection('score');
const userCollection = db.collection('user');

// Test that you can connect to the database
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

// Insert a score
async function addScore(score) {
    const result = await scoreCollection.insertOne(score);
    return result;
};

function getLeaderboard() {
    try {
        console.log("retrieving leaderboard");
        return scoreCollection.find({}).toArray();
    } catch {
        console.log("Error retrieving leaderboard!");
    }
}

function getUser(username) {
    return userCollection.findOne({ username: username });
}

async function registerUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      username: username,
      password: passwordHash,
      token: uuid.v4(),
    };

    await userCollection.insertOne(user);
    return user;
}

  module.exports = { addScore, getLeaderboard, getUser, registerUser };
  