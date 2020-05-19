process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.BACKEND_SOCKET = 'https://vantage-sg.com' //Change this to local host if you want to test prod env on local


const environment = require('./environment')

module.exports = environment.toWebpackConfig()
