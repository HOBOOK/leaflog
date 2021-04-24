import Vue from 'vue'
import App from './App.vue'
import vuetify from '../../plugins/vuetify'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import '../../plugins/base'
import '../../plugins/axios'
import router from "../../routes/index.js"
import store from '../../store'

import Common from '../../services/common.js'
import Storage from '../../services/storeage.js'
import File from '../../services/file.js'
import Time from '../../services/time.js'

Vue.use(PerfectScrollbar)
Vue.config.productionTip = false

Vue.prototype.$Common = new Common()
Vue.prototype.$Storage = new Storage()
Vue.prototype.$Time = new Time()
Vue.prototype.$File = new File()

new Vue({
  vuetify,
  PerfectScrollbar,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
