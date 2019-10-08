import db from '../config/db'
const Sequelize = db.getConnection('kvtest')

const UserSchema = Sequelize.import('./user.js')

module.exports = { Sequelize, UserSchema }
