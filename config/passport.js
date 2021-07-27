const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/Usuarios');

passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
    },
    async (email, password, next) => {  
        //O código é executado ao preencher o formulário
        const usuario = await Usuarios.findOne({ 
                                            where : { email, activo : 1 } });

        //Verificar se existe ou não
        if(!usuario) return next(null, false, {
            message : 'Usuário não existe'
        });
        //Se o usuário existir, compare a senha
        const verificarPass = usuario.validarPassword(password);
        //Se a senha estiver errada
        if(!verificarPass) return next(null, false, {
            message: 'Senha Errada'
        });

        //Todo OK
        return next(null, usuario);
    
    } 

))

passport.serializeUser(function(usuario, cb){
    cb(null, usuario);
});
passport.deserializeUser(function(usuario, cb){
    cb(null, usuario);
});

module.exports = passport;