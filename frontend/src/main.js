import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./routes/index.js"
import store from './store'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  router,
  store,
}).$mount('#app')
