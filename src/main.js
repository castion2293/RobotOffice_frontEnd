// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import axios from 'axios'
import lodash from 'lodash'
import Chart from 'chart.js'
import FullCalendar from 'vue-full-calendar'

import "fullcalendar/dist/fullcalendar.min.css"

window.axios = axios
window._ = lodash

window.host = 'http://localhost:8000/api'

Vue.use(Vuetify)
Vue.use(FullCalendar)

Vue.config.productionTip = false

window.Event = new class {
    constructor() {
        this.vue = new Vue();
    }

    fire(event, data = null) {
        this.vue.$emit(event, data);
    }

    listen(event, callback) {
        this.vue.$on(event, callback);
    }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
