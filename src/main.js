import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ViserVue from 'viser-vue'

import api from '@/conf/api'
import { request } from '@/api/http'
import AsyncComputed from 'vue-async-computed'
import './components/componentRegister'

import '../src/icons/index.js'
import '@/assets/css/reset.css'
import '@/assets/css/main.styl'

import imgPreview from '@/plugins/imgPreview/index.js'
import importExcel from '@/plugins/importExcel/index.js'
Vue.use(AsyncComputed)
Vue.use(ElementUI, { size: 'small' })
Vue.use(ViserVue)

Vue.prototype.$api = api
Vue.prototype.$request = request
Vue.prototype.$imgPreview = imgPreview
Vue.prototype.$importExcel = importExcel
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
