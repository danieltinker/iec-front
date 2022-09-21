<template>
  <div v-if="doneFetching">
    <!-- {{GET_USER_FAV}} -->
    <!-- {{quickViewPopup}} -->
    <div
      class="widgets mt-3"
      v-for="(widget, index) in responseDataComp"
      :key="index"
    >
      <div class="headline-toolbar">
        <div class="grid-item">
          <ThreeDotsNineDots
            class="grid-item"
            :isExpand="widget.PARAMETERS.expand"
            @switch-expand="
              widget.PARAMETERS.expand = !widget.PARAMETERS.expand
            "
            v-if="widget.PARAMETERS.headline_config.three_dots_enabled"
          />
        </div>
        <h1 class="headline-title grid-item">
          {{ widget.PARAMETERS.headline_config.title }}
        </h1>
        <div class="grid-item">
          <v-icon
            @click="BookMarkClick(widget)"
            class=""
            color="#935287"
            style="font-size: 30px"
            v-if="widget.PARAMETERS.headline_config.bookmark_enabled"
            >{{
              CheckBookmark(widget.VIEW_ID)
                ? "mdi-bookmark"
                : "mdi-bookmark-outline"
            }}</v-icon
          >
        </div>
      </div>
      <component
        :is="widget.TEMPLATE_TYPE"
        :params="widget.PARAMETERS"
        :isDrillDown="false"
      >
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import BasicKPI from "../widgets/BasicKPI.vue";
import ThreeDotsNineDots from "../utils/ThreeDotsNineDots.vue";
import BasicPie from "../widgets/BasicPie.vue";
import carouselKPI from "../widgets/carouselKPI.vue";
import FavoriteAxios from "../utils/FavoriteAxios";
import genericKPI from '../widgets/genericKPI.vue';
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
    // name: "",
  components: {
    BasicKPI,
    ThreeDotsNineDots,
    BasicPie,
    carouselKPI,
            genericKPI,
  },
  //added for option pass single view
  props: {
    quickViewPopup: {
        type: Array,
        default() {return []}
    }
  },
  watch: {
    "$store.state.selected_hq_id": {
      async handler() {
        console.log(" GET /mobile/views/{hq_id}/{category_id}?sessoinid=xxx .");
      },
    },
    "$store.state.selected_cat_id": {
      async handler() {
        console.log("selected_cat_id");
        await axios
          .get(
            "http://20.102.120.232:5080/shavit/mobile/views/" + 700 + "/" + 1,
            { params: { sid: "xxx" } }
          )
          .then((response) => {
            this.responseData = response.data;
            this.doneFetching = true;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  },
  async created() {
    if(this.quickViewPopup.length > 0)
    {
        this.doneFetching = true
    }
    //get hqs By sid

    //  listen to store HQ,Category
    //  fetch the server response GET /mobile/views/{hq_id}/{category_id}?sessoinid=xxx .
    //  pass data uri into the components for the fetch

    //function to get last user favorite list
    // this.GetUserFav();
  },
  computed:
  {
    ...mapGetters(["GET_USER_FAV"]),
    responseDataComp: function() {
        return !this.quickViewPopup.length ? this.responseData : this.quickViewPopup
    }
  },
  data() {
    return {
      doneFetching: false,
      responseData: [],
      //     responseData:[
      //         ///// ////////////  BASIC KPI //// ///////////////////
      //         {
      //             view_id:"103",
      //             division:"800",
      //             category:"1",
      //             template_type:"BasicKPI",
      //             fav_icon:"kpi-icon",
      //             view_order:1,

      //             params:{
      //                 show_main_clock:true,
      //                 click_open_drill_enabled:true,
      //                 data_category:["michal","michal2"],
      //                 selected_category:"michal",
      //                 chart_title:"My first KPI",
      //                 data_url:"/myKPI",
      //                 expand:false,

      //                 headline_config:{
      //                     three_dots_enabled:true,
      //                     bookmark_enabled:true,
      //                     title:"STOP CLIENTS OR SOMTHING",
      //                 },

      //                 drill_down_params:{
      //                     headline_config:{
      //                         three_dots_enabled:true,
      //                         bookmark_enabled:true,
      //                         title:"drill headline :)",
      //                     },
      //                     data_category:["ran1","ran2"],
      //                     selected_category:null,
      //                     enabled:true,
      //                     data_url:"/myDrillKpi",
      //                     template_type:"BasicKPI",
      //                 },

      //                 jsonData:[{
      //                     "label":"michal",
      //                     "value":0,
      //                 },
      //                 {
      //                     "label":"ran",
      //                     "value":2,
      //                 },
      //                 {
      //                     "label":"daniel",
      //                     "value":1,
      //                 }
      //                 ],
      //         },
      //     },
      // ///// ////////////  BASIC KPI  2 //// ///////////////////
      // {
      //             view_id:"103",
      //             division:"800",
      //             category:"1",
      //             template_type:"carouselKPI",
      //             fav_icon:"kpi-icon",
      //             view_order:1,

      //             params:{
      //                 show_main_clock:true,
      //                 click_open_drill_enabled:true,
      //                 data_category:["michal","michal2"],
      //                 selected_category:"michal",
      //                 chart_title:"My first KPI",
      //                 data_url:"/myKPI",
      //                 expand:false,

      //                 headline_config:{
      //                     three_dots_enabled:true,
      //                     bookmark_enabled:true,
      //                     title:"STOP CLIENTS OR SOMTHING",
      //                 },

      //                 drill_down_params:{
      //                     headline_config:{
      //                         three_dots_enabled:true,
      //                         bookmark_enabled:true,
      //                         title:"drill headline :)",
      //                     },
      //                     data_category:["ran1","ran2"],
      //                     selected_category:null,
      //                     enabled:true,
      //                     data_url:"/myDrillKpi",
      //                     template_type:"BasicKPI",
      //                 },



                    //                 jsonData:[{
                    //                     "label":"michal",
                    //                     "value":0,
                    //                 },
                    //                 {
                    //                     "label":"ran",
                    //                     "value":2,
                    //                 },
                    //                 {
                    //                     "label":"daniel",
                    //                     "value":1,
                    //                 }
                    //                 ],
                    //         },
                    //     },
                    // ///// ////////////  BASIC Pie //// ///////////////////
                    // ]
                }
            },
        methods:
        {
            ...mapActions(["SET_FAV_LIST"]),
            //Get user favorites
            GetUserFav: function(){
                this.SET_FAV_LIST()
            },
        
    CheckBookmark(view_id) {
        /*
            Function to check if viewId exist in user favorites list
        */

      //check if user have this view in favorites
      let fav_list = this.$store.state.user_favorites;
      let i;
      //check if we have object inside user favorites without using filter...
      for(i =0; i< fav_list.length; i++)
      {
        if(fav_list[i].VIEW_ID == view_id)
        {
            return true
        }
      }
      return false
    },

    BookMarkClick(widget) {
      let view_id = widget.VIEW_ID
      //save curr widget params for bookmark
    //   widget.PARAMETERS['TEMPLATE_TYPE'] = widget.TEMPLATE_TYPE
      this.$store.state.selected_view_param = widget.PARAMETERS
      this.$store.state.selected_view_param["TEMPLATE_TYPE"] = widget.TEMPLATE_TYPE 
      ///Maybe to save custom things to custom_bookmark_data in store
      //
      this.$store.state.selected_view_id = view_id;
      console.log("book clicked", view_id);
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

    },
  },
};
</script>

<style scoped>
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
