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

function getHighScores() {
    const query = { score: { $gt: 0, $lt: 900 } };
    const options = {
      sort: { score: -1 },
      limit: 10,
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
  }

  module.exports = { addScore, getHighScores };
  