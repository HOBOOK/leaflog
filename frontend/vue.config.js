module.exports = {
  pages:{
    'index':{
      entry: './src/pages/home/main.js',
      template: 'public/index.html',
      title: 'home',
    },
    'login':{
      entry: './src/pages/login/main.js',
      template: 'public/index.html',
      title: 'login'
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port:8000,
    proxy: 'http://localhost:3000/'
  }
}