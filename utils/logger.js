const log4js = require('log4js')
log4js.configure({
  appenders: {
    console: { type: 'console' },
    genie: { type: 'file', filename: '__output__/genie.log' }
  },
  categories: { default: { appenders: ['genie', 'console'], level: 'info' } }
})

const logger = log4js.getLogger('genie packer')

exports.logger = logger
