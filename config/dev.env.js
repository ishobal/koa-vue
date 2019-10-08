'use strict'
const merge = require('merge')
const prodConfig = require('./prod.env')

let config = {
  db: {
    kvtest: {
      host: 'localhost',
      name: 'kvtest',
      user: 'root',
      password: '',
      ssl: false
    }
  }
}

try {
  const local = require('./local.env')
  config = merge(config, local)
} catch (e) { }

module.exports = merge(prodConfig, config)
