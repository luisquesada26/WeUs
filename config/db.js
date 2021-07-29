const Sequelize = require('sequelize');

module.exports = new Sequelize('weus', 'postgres', 'Totidiversidade', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    //define: {
    //    timestamps : false
    //}
    //logging : false
});