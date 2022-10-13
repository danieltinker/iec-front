import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import FavoriteAxios from "./components/utils/FavoriteAxios";

import {myApi} from "./services/myAxiosRequests";
import { mapActions, mapGetters } from "vuex";
Vue.config.productionTip = false;
Vue.prototype.$pieSize = 285;
Vue.prototype.$myApi = myApi
// function booktest(p) {return {data: function(){return{test: true}}}}
Vue.mixin({
  methods:{

    toINT(value) {
      let result = parseInt(value)
      return isNaN(result) ? 0 : result
    },

    ...mapActions(["SET_FAV_LIST","DO_FETCH","END_FETCH"]),
    //Get user favorites
    GetUserFav: function () {
      this.SET_FAV_LIST()
    },

    CheckBookmark(view_id) {
      /* Function to check if viewId exist in user favorites list */
      let fav_list = this.$store.state.user_favorites;
      //check if we have object inside user favorites without using filter...
      for (let i = 0; i < fav_list.length; i++) {
        if (fav_list[i].VIEW_ID == view_id) return true;
      }
      return false
    },

    BookMarkClick(viewID,parameters,templateType, isDrillDown) {
      let view_id = viewID
      //save curr widget params for bookmark
      console.log("parameters",parameters)
      this.$store.state.selected_view_param = Object.assign({},parameters)
      this.$store.state.selected_view_param["TEMPLATE_TYPE"] = templateType
      if(isDrillDown){
        this.$store.state.selected_view_param["show_clock"] = false
      }
      else{
        this.$store.state.selected_view_param["show_clock"] = true
      }
      ///Maybe to save custom things to custom_bookmark_data in store
      this.$store.state.selected_view_id = view_id;
      if (this.IS_FETCHING === false) {
        this.DO_FETCH()
        if (this.CheckBookmark(view_id)) {
          //already bookmarked remove fav
          FavoriteAxios.RemoveUserFav()
            .then((response) => {
              //if we got new info update user favorite list
              this.GetUserFav();
            })
            .catch((error) => {
              console.log("Got error removing user fav: ", error);
            });
        } else {
          //add user fav
          FavoriteAxios.AddUserFav()
            .then((response) => {
              //if we got new info update user favorite list
              this.GetUserFav();
            })
            .catch((error) => {
              console.log("Got error adding user fav: ", error);
            });
        }
        this.END_FETCH()
      }
    },
  },
  computed: {
    ...mapGetters(["GET_USER_FAV","IS_FETCHING"]),
    getCurrentTheme(){
      return this.$store.getters.currentTheme
    },
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
