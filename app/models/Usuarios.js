"use strict";
class Usuarios {
    constructor(conn){
        console.log("constructor usuarios");
        this.conn = conn;
    }

    get conn(){
        return this.conn;
    }

    cadastrar(usuario){
        this.conn.client.connect((err)=>{
            this.conn.assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = this.conn.client.db(this.conn.dbName);

            this.conn.insertDocuments(db, () => {
                this.conn.client.close();
                console.log("close");
            });
        });
        console.log(usuario);
    }
}

module.exports = () => {return (Usuarios);};