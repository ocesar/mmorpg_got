"use strict";
class Jogo {
    constructor(conn){
        console.log("constructor jogo");
        this.conn = conn;
        this.collection = "jogo";
    }

    async gerarParametros(usuario){
        try {
            await this.conn.client.connect();
            const r = await this.conn.insertOne({
                usuario: usuario,
                moeda: 15,
                suditos:10,
                temor: Math.floor(Math.random() *1000),
                sabedoria: Math.floor(Math.random() *1000),
                comercio: Math.floor(Math.random() *1000),
                magia: Math.floor(Math.random() *1000)
            }, this.collection);
            this.conn.assert.equal(1, r.insertedCount);
        } catch (err) {
            console.log(err.stack);
        }
        await this.conn.client.close();
    }

    async iniciaJogo(usuario){
        try {
            await this.conn.client.connect();
            const docs = await this.conn.find({usuario: usuario}, this.collection);
            this.conn.assert.equal(1, docs.length);    
            
            return docs[0];
        } catch (err) {
            console.log(err.stack);
        }

        await this.conn.client.close();
    }
}

module.exports = () => {return (Jogo);};