module.exports.load = async function(application, req, res){
    let msg = '';
    if(req.session.autorizado != true){
        msg = "Necessário fazer login";
        res.render('index', {validacao:[{msg:msg}]});
        return;
    }

    if (req.query.msg !== '') msg = req.query.msg;

    var usuario = req.session.usuario;

    var connection = new application.config.connection('got');
    var Jogo = new application.app.models.Jogo(connection);

    var dadosJogo = await Jogo.iniciaJogo(usuario);
    console.log(dadosJogo);
    res.render('jogo',{img_casa:req.session.casa, jogo: dadosJogo, msg: msg});
};

module.exports.logout = function(application, req, res){
    req.session.destroy((err)=>{
        res.render('index',{validacao:{}});
    });
};

module.exports.suditos = function(application, req, res){

    if(req.session.autorizado !== true){
        let msg = "Necessário fazer login novamente";
        res.send(msg);
        return;
    }

    res.render('aldeoes');
};


module.exports.pergaminhos = async function (application, req, res) {
    if (req.session.autorizado !== true) {
        let msg = "Necessário fazer login novamente";
        res.send(msg);
        
        return;
    }

    let conn = new application.config.connection('got');
    let Jogo = new application.app.models.Jogo(conn);

    let usuario = req.session.usuario;
    let acoes = await Jogo.getAcoes(usuario);

    res.render('pergaminhos', {acoes: acoes});
};

module.exports.ordenar_acao_suditos = function(application, req, res){
    if(req.session.autorizado !== true){
        let msg = "Necessário fazer login novamente";
        res.send(msg);
        return;
    }

    let dados = req.body;

    req.assert('acao', "Ação deve ser informada").notEmpty();
    req.assert('quantidade', "Quantidade deve ser informada").notEmpty();

    let erros = req.validationErrors();

    if(erros) {
        res.redirect('jogo?msg=A');
        return;
    }

    let conn = new application.config.connection('got');
    let Jogo = new application.app.models.Jogo(conn);

    dados.usuario = req.session.usuario;
    Jogo.acao(dados);

    res.redirect('jogo?msg=B');
};

module.exports.revogar_acao = (application, req, res) => {
    if(req.session.autorizado !== true){
        let msg = "Necessário fazer login novamente";
        res.send(msg);
        return;
    }

    let _id = req.query.id_acao;

    let conn = new application.config.connection('got');
    let Jogo = new application.app.models.Jogo(conn);

    Jogo.revogarAcao(_id);
    res.redirect('jogo?msg=D');
};