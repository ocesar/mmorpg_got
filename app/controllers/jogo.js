module.exports.load = async function(application, req, res){

    if(req.session.autorizado !== true){
        res.send("necessario fazer login");
        return;
    } 

    var usuario = req.session.usuario;

    var connection = new application.config.connection('mongodb://root:root@localhost:27017', 'got');
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