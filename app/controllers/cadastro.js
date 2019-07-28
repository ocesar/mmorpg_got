module.exports.load = (application, req, res) => {
    res.render('cadastro', {validacao:{}, dadosCadastro:{}});
};
module.exports.cadastrar = (application, req, res) => {
    let dados = req.body;

    req.assert('nome', "Nome não pode ser vazio").notEmpty();
    req.assert('usuario', "Usuario não pode ser vazio").notEmpty();
    req.assert('senha', "Senha não pode ser vazio").notEmpty();
    req.assert('casa', "Casa não pode ser vazio").notEmpty();

    let erros = req.validationErrors();

    if (erros){
        res.render('cadastro', {validacao:erros, dadosCadastro:dados});
        return;
    }

    var connection = new application.config.connection('mongodb://root:root@localhost:27017', 'got');
    var Usuarios = new application.app.models.Usuarios(connection);
    Usuarios.cadastrar(dados);

    res.send(req.body);
};