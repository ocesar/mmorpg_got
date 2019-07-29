"use strict";
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class MongoDB{

    constructor(_dbName){
        this.url = 'mongodb://root:root@localhost:27017';
        this.dbName = _dbName;
        this.client = new MongoClient(this.url, {
            useNewUrlParser: true
        });
        this.assert = assert;
    }

    insertMany = async (documents, collection) => {
        try {
            const db = this.client.db(this.dbName);
            // Get the documents collection
            const coll = db.collection(collection);
            // Insert some documents
            return await coll.insertMany(documents);
        } catch(err){
            console.log(err.stack);
        }
        return null
    };

    insertOne = async (document, collection) => {
        try{
            const db = this.client.db(this.dbName);
            // Get the documents collection
            const coll = db.collection(collection);
            // Insert some documents
            return await coll.insertOne(document, {
                w: 'majority',
                wtimeout: 10000,
                serializeFunctions: true,
                forceServerObjectId: true
            });
        } catch(err){
            console.log(err.stack);
        }
        return null;
    };

    find = async (documents, collection) => {
        try {
            const db = this.client.db(this.dbName);
            // Get the documents collection
            const coll = db.collection(collection);
            // Insert some documents
            return await coll.find(documents).limit(1).toArray();
        } catch(err){
            console.log(err.stack)
        }
    };
}

module.exports = () => {
    return MongoDB;
};