const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}
  
const url = `mongodb+srv://${userName}:${password}@${hostname}`;
  
const client = new MongoClient(url);
const userCollection = client.db('startup').collection('user');
const historyCollection = client.db('startup').collection('history');
  
function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email, 
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function addMatch(match) {
  historyCollection.insertOne(match);
}
  
function getMatchHistory() {
  const query = {score: {$gt: 0}};
  const options = {
    sort: {score: -1},
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}
  
module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addMatch, 
  getMatchHistory
};