const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient

const MONGO_URL = "mongodb+srv://kushchhatbar19_db_user:7hnvfS2gxeGzo0WD@cluster0.jyhbqcl.mongodb.net/?appName=Cluster0";

const mongoConnect = (callback) => {
    MongoClient.connect(MONGO_URL).then(client =>{
        callback(client);
    }).catch(err => {
        console.log("Error while connecting to Mongo: ", err);
    });
}

module.exports = mongoConnect;
