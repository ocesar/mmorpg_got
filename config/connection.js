"use strict";
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class MongoDB{
    constructor(_url, _dbName){
        this.url = _url;
        this.dbName = _dbName;
        this.client = new MongoClient(this.url);
        this.assert = assert;
    }

    insertDocuments = (documents, collection, db, callback) => {
        // Get the documents collection
        const coll = db.collection(collection);
        const test = {a:1, b:2, c:3};
        // Insert some documents
        coll.insertMany(test, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted "+ documents + " into " + collection);
            callback(result);
        });
    }
}

// var mongoDB = () => {
//     // Connection URL
//     //const url = 'mongodb:root:root@//localhost:27017';
//
//     // Database Name
//     //const dbName = 'got';
//
//     // Create a new MongoClient
//     //const client = new MongoClient(url);
//
//     // Use connect method to connect to the Server
//     client.connect(function (err) {
//         assert.equal(null, err);
//         console.log("Connected successfully to mongoDB");
//
//         const db = client.db(dbName);
//
//         client.close();
//         return db;
//     });
// };

module.exports = () => {
    return MongoDB;
};