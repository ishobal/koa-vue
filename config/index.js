'use strict'

module.exports = process.env.NODE_ENV === 'development' ? require('./dev.env') : require('./prod.env')
