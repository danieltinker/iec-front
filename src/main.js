import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import {myApi} from "./services/myAxiosRequests";
Vue.config.productionTip = false;
Vue.prototype.$pieSize = 285;
Vue.prototype.$myApi = myApi
// function booktest(p) {return {data: function(){return{test: true}}}}
Vue.mixin({
  computed: {
    getCurrentTheme(){
      return this.$store.getters.currentTheme
    },
    // booktest(param)
    getbookmarkIcon() {
     console.log("ddd");
      if (true) {
        return "mdi-bookmark";
      } else {
        return "mdi-bookmark-outline";
      }
    },
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
