const nodemailer = require('nodemailer')
const config = require('config');

var transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: false,
  auth: {
    user: config.get('mailUser'),
    pass: config.get('mailPass'),
  },
})

module.exports = transport