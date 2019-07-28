module.exports.load = function(application, req, res){
    if(req.session.autorizado) res.render('jogo',{img_casa:req.session.casa});
    else res.send("necessario fazer login");
};

module.exports.logout = function(application, req, res){
    req.session.destroy((err)=>{
        res.render('index',{validacao:{}});
    });
};