module.exports.load = function(application, req, res){
    if(req.session.autorizado) res.render('jogo');
    else res.send("necessario fazer login");
};

module.exports.logout = function(application, req, res){
    req.session.destroy((err)=>{
        res.render('index',{validacao:{}});
    });
};