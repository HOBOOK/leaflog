const path = require('path');

module.exports = {
  pages:{
    'index':{
      entry: './src/pages/home/main.js',
      template: 'public/index.html',
      title: 'home',
    },
    'sign':{
      entry: './src/pages/sign/sign.js',
      title: 'sign'
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    disableHostCheck: true,
    port:8080,
    proxy: {
        '/sign':{
          target: 'http://localhost:8080',
          pathRewrite: {'^/.*' : '/sign.html'}
        }
    }
  }
}