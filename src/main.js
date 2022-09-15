import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.prototype.$pieSize = 285
Vue.mixin({
  computed:{
    getbookmarkIcon() {
      if (true) {
          return "mdi-bookmark";
      } else {
          return "mdi-bookmark-outline";
      }
  }
  }
})
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
