const nodemailer = require('nodemailer')

var transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: false,
  auth: {
    user: 'hobookmanager@gmail.com',
    pass: '@pkh778129',
  },
})

module.exports = transport