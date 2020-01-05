process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.BACKEND_PORT = process.env.BACKEND_PORT  || 'back_end_domain'


const environment = require('./environment')

module.exports = environment.toWebpackConfig()
