import Vue from 'vue'
import axios from 'axios'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Button,
  Input,
  Form,
  FormItem
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
