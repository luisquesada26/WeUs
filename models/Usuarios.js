const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome : Sequelize.STRING(60),
    imagen : Sequelize.STRING(60),
    email : {
        type: Sequelize.STRING (30),
        allowNull: false,
        validate: {
            isEmail:  { msg : 'Insira um e-mail válido'}
        },
        unique : {
            args: true,
            msg: 'O usuário já está cadastrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate : {
            notEmpty : {
                msg: 'A senha não pode estar vazia'
            }
        }
    },
    activo : {
        type: Sequelize.INTEGER,
        defaultValeu: 0 
    },
    tokenPassword : Sequelize.STRING,
    expiraToken : Sequelize.DATE
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10), null );
        }
    }
})

//Método para comparar senhas
Usuarios.prototype.validarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = Usuarios;
