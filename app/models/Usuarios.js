"use strict";
const crypto = require('crypto');

class Usuarios {
    constructor(conn){
        //console.log("constructor usuarios");
        this.conn = conn;
        this.collection = "usuarios";
    }

    async cadastrar(usuario){
        usuario.senha = crypto.createHash("md5").update(usuario.senha).digest("hex");
        console.log(usuario);

        try {
            await this.conn.client.connect();
            const r = await this.conn.insertOne(usuario, this.collection);
            this.conn.assert.equal(1, r.insertedCount);
        } catch (err) {
            //console.log("errrrrou!");
            console.log(err.stack);
        }
        this.conn.client.close();
    }

    async autenticar(usuario, req){
        usuario.senha = crypto.createHash("md5").update(usuario.senha).digest("hex");
        try {
            await this.conn.client.connect();
            const docs = await this.conn.findOne(usuario, this.collection);
            this.conn.assert.equal(1, docs.length);
            Usuarios.criaSessao(docs[0], req);
        } catch (err) {
            console.log(err.stack);
        }

        this.conn.client.close();
    }

    static criaSessao(usuario, req){
        req.session.autorizado = true;
        req.session.usuario = usuario.usuario;
        req.session.casa = usuario.casa;
    }
}

module.exports = () => {return (Usuarios);};