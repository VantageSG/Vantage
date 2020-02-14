process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.BACKEND_SOCKET = process.env.BACKEND_SOCKET  || 'http://localhost:3000'

const environment = require('./environment')

module.exports = environment.toWebpackConfig()
