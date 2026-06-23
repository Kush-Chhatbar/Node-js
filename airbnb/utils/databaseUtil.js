const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient

const MONGO_URL = "your_mongo_cluster";

const mongoConnect = (callback) => {
    MongoClient.connect(MONGO_URL).then(client =>{
        callback(client);
    }).catch(err => {
        console.log("Error while connecting to Mongo: ", err);
    });
}

module.exports = mongoConnect;
