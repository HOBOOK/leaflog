import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import './plugins/base'
import router from "./routes/index.js"
import store from './store'

Vue.use(PerfectScrollbar)
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  PerfectScrollbar,
  router,
  store,
}).$mount('#app')
