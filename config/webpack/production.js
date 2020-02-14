process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.BACKEND_SOCKET = process.env.BACKEND_SOCKET  || '0.0.0.0'


const environment = require('./environment')

module.exports = environment.toWebpackConfig()
