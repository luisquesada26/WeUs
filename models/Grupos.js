const Sequelize = require('sequelize');
const db = require('../config/db');
//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const Categorias = require('./Categorias');
const Usuarios = require('./Usuarios');


const grupos = db.define('grupos', {
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4()
    },

    nome: {
        type: Sequelize.TEXT(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O grupo deve ter um nome'
            }
        }
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Coloque uma descrição'
            }
        }
    },
    url: Sequelize.TEXT,
    imagem: Sequelize.TEXT
})

grupos.belongsTo(Categorias);
grupos.belongsTo(Usuarios);

module.exports = grupos;
