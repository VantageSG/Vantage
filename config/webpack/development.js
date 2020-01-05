process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.BACKEND_PORT = process.env.BACKEND_PORT  || 'http://localhost:3000'

const environment = require('./environment')

module.exports = environment.toWebpackConfig()
