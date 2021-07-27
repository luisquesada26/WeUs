const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/emails');

exports.formCriarConta = (req, res) => {
    res.render('criar-conta', {
        nomePagina : 'Criar Conta'
    })
}

exports.criarNovaConta = async (req, res) => {
    const usuario = req.body;

    //console.log(usuario);

    req.checkBody('confirmar', 'A senha confirmada não pode estar vazia').notEmpty();
    req.checkBody('confirmar', 'Senha diferente da anterior').equals(req.body.password);

    //Ler os erros express
    const erroresExpress = req.validationErrors();

    try {
        await Usuarios.create(usuario);

        //URL de confirmação
        const url = `http://${req.headers.host}/confirmar-conta/${usuario.email}`;

        //Enviar email de confirmação
        await enviarEmail.enviarEmail({
            usuario,
            url,
            subject : 'Confirme sua conta de WeUs',
            arquivo : 'confirmar-conta'
        })


        //Flash message e redirecionar
        req.flash('exito', 'Enviamos um E-mail, Por favor confirme sua conta');
        res.redirect('iniciar-sessao');
    } catch (error) {

        //Extrair o message dos erros
        const erroresSequelize = error.errors.map(err => err.message);
        
        //Extrair o msg dos erros
        const errExp = erroresExpress.map(err => err.msg);

        console.log(errExp);

        //Unir os erros
        const listaErrores = [...erroresSequelize, ...errExp];

        req.flash('error', listaErrores);
        res.redirect('/criar-conta');
    }
}

//Confirme a assinatura do usuario
exports.confirmarConta = async (req, res, next) => {
    //verificar se o usuário existe
    const usuario = await Usuarios.findOne({ where : { email: req.params.correo}});

    //Se não existir, redirecione
    if(!usuario) {
        req.flash('error', 'Não existe tal conta');
        res.redirect('/criar-conta');
        return next();
    }

    //se existir, confirme e redirecione
    usuario.activo = 1;
    await usuario.save();

    req.flash('exito', 'A conta foi confirmada, agora você pode fazer login');
    res.redirect('/iniciar-sessao');
}

//Formulario para Iniciar Sessão
exports.formIniciarsessao = (req, res) => {
    res.render('iniciar-sessao', {
        nomePagina : 'Iniciar Sessão'
    })
}    
