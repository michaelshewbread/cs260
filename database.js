const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

// Connect to the database cluster
const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const collection = db.collection('score');

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
    const result = await collection.insertOne(score);
    return result;
};

function getLeaderboard() {
    try {
        console.log("retrieving leaderboard");
        return collection.find({}).toArray();
    } catch {
        console.log("Error retrieving leaderboard!");
    }
  }

  module.exports = { addScore, getLeaderboard };
  