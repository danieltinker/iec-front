<template >
  <div v-if="doneFetching">
    <div class="widgets mt-3" v-for="(widget, index) in responseDataComp" :key="index">
      <div class="headline-toolbar">
        <div class="grid-item">
          <ThreeDotsNineDots class="grid-item" :isExpand="widget.PARAMETERS.expand"
            @switch-expand="widget.PARAMETERS.expand = !widget.PARAMETERS.expand"
            v-if="widget.PARAMETERS.headline_config.three_dots_enabled" />
        </div>
        <h1 class="headline-title grid-item">
          {{ widget.PARAMETERS.headline_config.title }}
        </h1>
        <div class="grid-item">
          <v-icon @click="BookMarkClick(widget)" color="#935287" style="font-size: 30px"
            v-if="widget.PARAMETERS.headline_config.bookmark_enabled">{{
            CheckBookmark(widget.VIEW_ID)
            ? "mdi-bookmark"
            : "mdi-bookmark-outline"
            }}</v-icon>
        </div>
      </div>
      <component :is="widget.TEMPLATE_TYPE" :params="widget.PARAMETERS" :isDrillDown="false">
      </component>
    </div>
  </div>

  <div class="skeleton-loader" v-else>
    <div class="skl"  v-if="!errorMsg || errorMsg.length === 0">
      <template>
          <v-sheet
            :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
            class="pa-3"
          >
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="card"
            ></v-skeleton-loader>
          </v-sheet>
        </template>
        <template>
          <v-sheet
            :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
            class="pa-3"
          >
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="card"
            ></v-skeleton-loader>
          </v-sheet>
        </template>
        <template >
          <v-sheet
            :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
            class="pa-3"
          >
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="card"
            ></v-skeleton-loader>
          </v-sheet>
        </template>
    </div>
    <h1 v-else>  {{errorMsg}} </h1>
        
        <!-- <div class="loader" v-if="!errorMsg || errorMsg.length === 0">
            <v-progress-circular
            indeterminate
            color="purple"
            ></v-progress-circular>
        </div>
        
        <h1 v-else>  {{errorMsg}} </h1> -->
    </div>  
</template>

<script lang="ts">
import ThreeDotsNineDots from "../utils/ThreeDotsNineDots.vue";
import BasicPie from "../widgets/BasicPie.vue";
import FavoriteAxios from "../utils/FavoriteAxios";
import genericKPI from '../widgets/genericKPI.vue';
import genericPIE from "../widgets/genericPIE.vue";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ThreeDotsNineDots,
    BasicPie,
    genericKPI,
    genericPIE
  },
  props: {
    quickViewPopup: {
      type: Array,
      default() { return [] }
    }
  },
  watch: {
    // user selected devision
    "$store.state.selected_hq_id": {
      async handler() {
        console.log(" GET /mobile/views/{hq_id}/{category_id}?sessoinid=xxx .");
      },
    },
    //user selected category
    "$store.state.selected_cat_id": {
      // fetch the widgets views from the DB
      async handler() {
        await axios
          .get("http://20.102.120.232:5080/shavit/mobile/views/" + 500 + "/" + 1, { params: { sid: "xxx" } })
          .then((response) => {
            this.responseData = response.data;
            setTimeout(()=>{
              // this.doneFetching = true;

              this.errorMsg = "View Page Unavaliable"
            },3000)
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  },
  async created() {
    if (this.quickViewPopup.length > 0 && this.errorMsg.length === 0) {
      this.doneFetching = true
    }
    //  get hqs By sid
    //  listen to store HQ,Category from user DATA RAN AND TOMMY PLEASE FINISH 
    //  fetch the server response GET /mobile/views/{hq_id}/{category_id}?sessoinid=xxx .

    //function to get last user favorite list
    this.GetUserFav();
  },
  computed:
  {
    ...mapGetters(["GET_USER_FAV","IS_FETCHING"]),
    responseDataComp: function () {
      return !this.quickViewPopup.length ? this.responseData : this.quickViewPopup
    }
  },
  data() {
    return {
      errorMsg:"",
      doneFetching: false,
      responseData: [],
    }
  },
  inject: {
      theme: {
        default: { isDark: false },
      },
    },
  methods:
  {
    ...mapActions(["SET_FAV_LIST","DO_FETCH","END_FETCH"]),
    //Get user favorites
    GetUserFav: function () {
      this.SET_FAV_LIST()
    },

    //Get user favorites

    CheckBookmark(view_id) {
      /*
          Function to check if viewId exist in user favorites list
      */
      let fav_list = this.$store.state.user_favorites;
      let i;
      //check if we have object inside user favorites without using filter...
      for (i = 0; i < fav_list.length; i++) {
        if (fav_list[i].VIEW_ID == view_id) return true;
      }
      return false
    },


    BookMarkClick(widget) {
      let view_id = widget.VIEW_ID
      //save curr widget params for bookmark
      //   widget.PARAMETERS['TEMPLATE_TYPE'] = widget.TEMPLATE_TYPE
      console.log(widget.PARAMETERS, "click params")
      this.$store.state.selected_view_param = widget.PARAMETERS
      this.$store.state.selected_view_param["TEMPLATE_TYPE"] = widget.TEMPLATE_TYPE
      ///Maybe to save custom things to custom_bookmark_data in store
      //
      this.$store.state.selected_view_id = view_id;
      if (this.IS_FETCHING === false) {
        this.DO_FETCH()
        // console.log("book clicked", view_id);
        if (this.CheckBookmark(view_id)) {
          //already bookmarked
          //remove fav
          FavoriteAxios.RemoveUserFav()
            .then((response) => {
              // console.log("removed fav", response);
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
              // console.log("added fav", response);
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
};
</script>

<style scoped>
  .skeleton-loader{
    width:100%;
    display: block;
  }
  v-skeleton-loader{
    width:100%;
  }
.widgets {
  background-color: white;
}

.headline-toolbar {
  display: grid;
  grid-template-columns: auto auto auto;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  text-align: center;
  padding-top: 10px;
}

.headline-title {
  color: #935287;
  font-family: almoni-medium;
  font-size: 22px;
  text-align: center;
  width: 240px;
}

.grid-item {
  text-align: center;
}

</style>
