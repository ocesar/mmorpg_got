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
        // Insert some documents
        coll.insertMany(documents, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted "+ documents + " into " + collection);
            callback(result);
        });
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
        console.log("buscar:" + JSON.stringify(documents));
        const db = this.client.db(this.dbName);
        // Get the documents collection
        const coll = db.collection(collection);
        // Insert some documents
        return await coll.find(documents).limit(1).toArray();
    };
}

module.exports = () => {
    return MongoDB;
};