const fs = require('fs')
const config = require('./index')
const Sequelize = require('sequelize')

const getConnection = key => {
  return new Sequelize(config.db[key].name, config.db[key].user, config.db[key].password, {
    host: config.db[key].host,
    dialect: 'mysql',
    ssl: config.db.ssl,
    dialectOptions: {
      charset: 'utf8mb4',
      supportBigNumbers: true,
      bigNumberStrings: true,
      ssl: config.db[key].ssl ? { cert: fs.readFileSync(config.db[key].sslca), rejectUnauthorized: false } : false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: '+08:00' // 东八时区
  })
}

module.exports = {
  getConnection
}
