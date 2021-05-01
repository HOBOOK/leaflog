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
import Lang from '../../services/lang.js'
import Config from '../../services/config'

Vue.use(PerfectScrollbar)
Vue.config.productionTip = false

Vue.prototype.$Common = new Common()
Vue.prototype.$Storage = new Storage()
Vue.prototype.$Time = new Time()
Vue.prototype.$File = new File()
Vue.prototype.$Lang = new Lang()

//디버그 모드에 따른 로그설정
if(Config.DEBUG && window.console && console.log && console.warn && console.error){
  window.console = {
      'log': window.console.log,
      'warn': window.console.warn,
      'error': window.console.error
  };
}else{
  window.console = {
      'log': function(){},
      'warn': function(){},
      'error': function(){}
  };
}

new Vue({
  vuetify,
  PerfectScrollbar,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
