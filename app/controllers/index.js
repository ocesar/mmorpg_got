module.exports.load = function(application, req, res){

    res.render('index',{validacao:{}});
};

module.exports.autenticar = async function(application, req, res){

    var dados = req.body;

    req.assert('usuario', "Usuario não pode ser vazio").notEmpty();
    req.assert('senha', "Senha não pode ser vazia").notEmpty();

    var erros = req.validationErrors();
    console.log(erros);

    if (erros) {
        res.render("index", {validacao:erros});
        return;
    }

    // autenticacao com base no DB
    var connection = new application.config.connection('got');
    var Usuarios = new application.app.models.Usuarios(connection);
    await Usuarios.autenticar(dados, req);

    if(req.session.autorizado) {
        res.redirect('jogo');
    }
    else {
        res.render("index", {validacao:[{msg:'Usuário inexistente'}]});
    }
};