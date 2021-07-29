const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const gruposController = require('../controllers/gruposController');

module.exports = function() {
    router.get('/', homeController.home);

    //** Criar e confirmar contas */
    router.get('/criar-conta', usuariosController.formCriarConta);
    router.post('/criar-conta', usuariosController.criarNovaConta);
    router.get('/confirmar-conta/:correo', usuariosController.confirmarConta);
    
    //Iniciar Sessão
    router.get('/iniciar-sessao', usuariosController.formIniciarsessao);
    router.post('/iniciar-sessao', authController.autenticarUsuario);

    //**Painel de Administração*/
    router.get('/administracao', 
        authController.usuarioAutenticado,
        adminController.painelAdministracao 
    );

    //**Novos Grupos */
    router.get('/novo-grupo',
        authController.usuarioAutenticado,
        gruposController.formNovoGrupo
    );

    router.post('/novo-grupo',
    gruposController.criarGrupo
    )

    
    return router;
}