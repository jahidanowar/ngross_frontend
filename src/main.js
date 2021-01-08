import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store/index'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './registerServiceWorker'

Vue.config.productionTip = false

// window.axios = require('axios');
Vue.use(VueAxios, axios);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
