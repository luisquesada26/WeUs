const Sequelize = require('sequelize');
const db = require('../config/db');


const Categorias = db.define('categorias',{
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    nome : Sequelize.TEXT
});

module.exports = Categorias;