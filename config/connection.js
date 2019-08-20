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

    findOne = async (documents, collection) => {
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

    find = async (documents, collection) => {
        try {
            const db = this.client.db(this.dbName);
            // Get the documents collection
            const coll = db.collection(collection);
            // Insert some documents
            return await coll.find(documents).toArray();
        } catch(err){
            console.log(err.stack)
        }
    };

    updateOne = async (where, document, collection) => {
        try{
            const db = this.client.db(this.dbName);
            // Get the documents collection
            const coll = db.collection(collection);
            // Update a single document
            return await coll.updateOne(where, document);
        } catch(err){
            console.log(err.stack);
        }
        return null;
    };

    deleteOne = async (where, collection) => {
        try{
            const db = this.client.db(this.dbName);
            // Get the documents collection
            const coll = db.collection(collection);
            // Remove a single document
            return await coll.deleteOne(where);
        } catch(err){
            console.log(err.stack);
            return err.stack;
        }
        return null;
    };
}

module.exports = () => {
    return MongoDB;
};