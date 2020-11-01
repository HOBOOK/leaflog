module.exports = {
  pages:{
    'index':{
      entry: './src/pages/home/main.js',
      template: 'public/index.html',
      title: 'home',
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: 'http://localhost:3000/'
  }
}