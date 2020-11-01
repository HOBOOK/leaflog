import Vue from 'vue'
import App from './App.vue'
import vuetify from '../../plugins/vuetify'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import '../../plugins/base'
import router from "../../routes/index.js"
import store from '../../store'

import Common from '../../services/common.js'
import Time from '../../services/time.js'

Vue.use(PerfectScrollbar)
Vue.config.productionTip = false

Vue.prototype.$Common = new Common()
Vue.prototype.$Time = new Time()

new Vue({
  vuetify,
  PerfectScrollbar,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
