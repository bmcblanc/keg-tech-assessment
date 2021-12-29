const { MongoClient } = require("mongodb")
const { mongodb: dbConfig } = require("../../configs/mongodb.config")
const client = new MongoClient(dbConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let dbConnection

const connectToServer = async (callback) => {
  await client.connect(function (err, db) {
    if (err || !db) {
      return callback(err)
    }

    dbConnection = db.db(dbConfig.db_name)
    console.log("Successfully connected to MongoDB.")

    return callback()
  });
}

const getDb = () => {
  if (dbConnection === undefined) {
    console.log('Trying to reconnect...')
    connectToServer(function (err) {
      if (err) {
        console.error(err)
      }
    })
  }
  return dbConnection
}

const getGoatFactsFromDb = () => {
  return getDb()
    .collection('goat_facts')
    .find({})
    .toArray();      
}

module.exports = {
  connectToServer,
  getDb,
  getGoatFactsFromDb,
}
