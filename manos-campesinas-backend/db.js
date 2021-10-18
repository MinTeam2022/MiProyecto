const { Sequelize } = require('sequelize');
const logger = require('pino')()

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize({
    database: 'manos_campesinas',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    username: 'root',
    password: 'mi-secreto',
    logging: msg => logger.debug(msg)
});

module.exports = sequelize