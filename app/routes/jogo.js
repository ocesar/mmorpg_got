module.exports = function(application){
    application.get('/jogo', function(req, res){
        application.app.controllers.jogo.load(application, req, res);
    });

    application.get('/logout', function(req, res){
        application.app.controllers.jogo.logout(application, req, res);
    });

    application.get('/suditos', function(req, res){
        application.app.controllers.jogo.suditos(application, req, res);
    });

    application.get('/pergaminhos', function(req, res){
        application.app.controllers.jogo.pergaminhos(application, req, res);
    });

    application.post('/ordenar_acao_suditos', function(req, res){
        application.app.controllers.jogo.ordenar_acao_suditos(application, req, res);
    });

    application.get('/revogar_acao', function(req, res){
        application.app.controllers.jogo.revogar_acao(application, req, res);
    });
};