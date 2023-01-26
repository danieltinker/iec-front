import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import FavoriteAxios from "./components/utils/FavoriteAxios";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import { mapActions, mapGetters } from "vuex";

import {myApi,myShavitApiV1} from "./services/myAxiosRequests";
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.use(VueBottomSheet);
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false;
Vue.prototype.$pieSize = 285;
Vue.prototype.$myApi = myApi
Vue.prototype.$myShavitApi = myShavitApiV1
// function booktest(p) {return {data: function(){return{test: true}}}}
Vue.mixin({
  methods:{

    toINT(value) {
      let result = parseInt(value)
      return isNaN(result) ? 0 : result
    },
    numToLocaleString(value){
      if (typeof value === "number") {
        return value.toLocaleString("en-US");
      } else {
        return value
      }

    },

    ...mapActions(["SET_FAV_LIST","DO_FETCH","END_FETCH"]),
    //Get user favorites
    GetUserFav: function () {
      this.SET_FAV_LIST()
    },

    async removeBookmark(){
      await FavoriteAxios.RemoveUserFav()
            .then(() => {
              //if we got new info update user favorite list
              this.GetUserFav();
            })
            .catch((error) => {
              console.log("Got error removing user fav: ", error);
            });
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

    BookMarkClick(viewID,parameters,templateType, isDrillDown,activeIndex) {
      console.log("Bookmark Click (viewID, activeIndex)",viewID, activeIndex)
      let view_id = viewID
      //save curr widget params for bookmark
      this.$store.state.selected_view_param = Object.assign({},parameters)
      this.$store.state.selected_view_param["TEMPLATE_TYPE"] = templateType
      
      if(isDrillDown){
        this.$store.state.selected_view_param["drill_down_params"]["carouselActiveIndex"] = activeIndex
        this.$store.state.selected_view_param["show_clock"] = false
      }
      else{
        this.$store.state.selected_view_param["carouselActiveIndex"] = activeIndex
        this.$store.state.selected_view_param["show_clock"] = true
        if(this.$store.state.selected_view_param["drill_down_params"]){
          this.$store.state.selected_view_param["expand"] = true
        }

        if(this.$store.state.selected_view_param["data_intersection"]==true){
          this.$store.state.selected_view_param["expand"] = false
        }
      }
      ///Maybe to save custom things to custom_bookmark_data in store
      this.$store.state.selected_view_id = view_id;
      if (this.IS_FETCHING === false) {
        this.DO_FETCH()
        if (this.CheckBookmark(view_id)) {
          this.$store.state.removeBookmarkDialog = true
        } else {
          //add user fav
          FavoriteAxios.AddUserFav()
          .then(() => {
            //if we got new info update user favorite list
            this.GetUserFav();
            this.$root.$emit("addBookmarkSnackbar", "השעון נוסף בהצלחה למבט מהיר!",true);
          })
            .catch((error) => {
              console.log("Got error adding user fav: ", error);
              if(error.response.status == 405){
                this.$store.state.max_favorite_popup = true
              }
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
