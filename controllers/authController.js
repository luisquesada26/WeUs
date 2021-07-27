const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect : '/administracao',
    failureRedirect: '/iniciar-sessao',
    failureFlash : true,
    badRequestMessage : 'Os campos são obrigatórios'
});

//Verifique se o usuário está autenticado
exports.usuarioAutenticado = (req, res, next) => {
    //Se o usuário estiver autenticado, ok
    if(req.isAuthenticated() ) {
        return next();                                                                                                                                                                                                                  
    }

    //Se não esta autenticado
    return res.redirect('/iniciar-sessao');
}
