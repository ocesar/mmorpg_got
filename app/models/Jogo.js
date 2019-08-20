"use strict";
class Jogo {
    constructor(conn){
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
            const docs = await this.conn.findOne({usuario: usuario}, this.collection);
            this.conn.assert.equal(1, docs.length);
            await this.conn.client.close();
            return docs[0];
        } catch (err) {
            console.log(err.stack);
        }
    }

    async acao(acao){
        let collection = "acao";
        try {
            // conecta
            await this.conn.client.connect();

            // salva ação na BD
            let tempo = null;
            switch (parseInt(acao.acao)) {
                case 1: tempo = 60 * 60000; break;
                case 2: tempo = 2 * 60 * 60000; break;
                case 3: tempo = 5 * 60 * 60000; break;
                case 4: tempo = 5 * 60 * 60000; break;
            }

            acao.acao_termina_em = new Date().getTime() + tempo;
            const r = await this.conn.insertOne(acao, collection);
            this.conn.assert.equal(1, r.insertedCount);

            // atualiza moedas na BD
            let moedas = null;
            switch (parseInt(acao.acao)) {
                case 1: moedas = -2 * acao.quantidade; break;
                case 2: moedas = -3 * acao.quantidade; break;
                case 3: moedas = -1 * acao.quantidade; break;
                case 4: moedas = -1 * acao.quantidade; break;
            }

            const rs = await this.conn.updateOne({usuario: acao.usuario}, {$inc: {moeda: moedas}}, this.collection);
            this.assert.equal(1, rs.matchedCount);
            this.assert.equal(1, rs.modifiedCount);
        } catch (err) {
            console.log(err.stack);
        }

        await this.conn.client.close();
    }

    async revogarAcao(id_acao){
        let collection = "acao";
        try {
            // conecta
            await this.conn.client.connect();

            // salva ação na BD
            const r = await this.conn.deleteOne({_id: require('mongodb').ObjectId(id_acao)}, collection);
            this.conn.assert.equal(1, r.deletedCount);
        } catch (err) {
            console.log(err.stack);
        }

        await this.conn.client.close();
    }

    async getAcoes(usuario){
        let collection = "acao";
        try {
            await this.conn.client.connect();
            let momento = new Date().getTime();
            let docs = await this.conn.find({'usuario': usuario, acao_termina_em:{$gt: momento}}, collection);
            await this.conn.client.close();
            return docs;
        } catch (err) {
            console.log(err.stack);
        }
    }
}

module.exports = () => {
    return (Jogo);
};