module.exports.load = async function(application, req, res){

    if(req.session.autorizado !== true){
        msg = "Necessário fazer login";
        res.render('index', "necessario fazer login");
        return;
    }

    var usuario = req.session.usuario;

    var connection = new application.config.connection('got');
    var Jogo = new application.app.models.Jogo(connection);

    var dadosJogo = await Jogo.iniciaJogo(usuario);
    console.log(dadosJogo);
    res.render('jogo',{img_casa:req.session.casa, jogo: dadosJogo});
};

module.exports.logout = function(application, req, res){
    req.session.destroy((err)=>{
        res.render('index',{validacao:{}});
    });
};

module.exports.suditos = function(application, req, res){
    res.render('aldeoes',{validacao:{}});    
};


module.exports.pergaminhos = function(application, req, res){
    res.render('pergaminhos',{validacao:{}});
};