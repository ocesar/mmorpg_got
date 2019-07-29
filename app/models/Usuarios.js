"use strict";
class Usuarios {
    constructor(conn){
        console.log("constructor usuarios");
        this.conn = conn;
        this.collection = "usuarios";
    }

    async cadastrar(usuario){
        try {
            await this.conn.client.connect();
            const r = await this.conn.insertOne(usuario, this.collection);
            this.conn.assert.equal(1, r.insertedCount);
        } catch (err) {
            console.log("errrrrou!");
            console.log(err.stack);
        }
        this.conn.client.close();
    }

    async autenticar(usuario, req){
        try {
            await this.conn.client.connect();
            const docs = await this.conn.find(usuario, this.collection);
            console.log("r > " + JSON.stringify(docs));
            this.conn.assert.equal(1, docs.length);
            console.log("retornou 1 ");
            Usuarios.criaSessao(docs[0], req);
        } catch (err) {
            console.log(err.stack);
        }

        this.conn.client.close();
        console.log("closed conn");
    }

    static criaSessao(usuario, req){
        req.session.autorizado = true;
        req.session.usuario = usuario.usuario;
        req.session.casa = usuario.casa;
    }
}

module.exports = () => {return (Usuarios);};