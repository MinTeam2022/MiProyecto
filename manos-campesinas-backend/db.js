const { Sequelize } = require('sequelize');
const logger = require('pino')()

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize({
    database: 'manos_campesinas',
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: msg => logger.debug(msg)
});

module.exports = sequelize