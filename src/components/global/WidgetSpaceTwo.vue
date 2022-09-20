<template>
  <div v-if="doneFetching">
    <div
      class="widgets mt-3"
      v-for="(widget, index) in responseData"
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
            @click="BookMarkClick(widget.VIEW_ID)"
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
import ThreeDotsNineDots from "../utils/ThreeDotsNineDots.vue";
import BasicPie from "../widgets/BasicPie.vue";
import FavoriteAxios from "../utils/FavoriteAxios";
import genericKPI from '../widgets/genericKPI.vue';
import axios from "axios";
export default {
  components: {
    ThreeDotsNineDots,
    BasicPie,
    genericKPI,
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
    //  get hqs By sid
    //  listen to store HQ,Category from user DATA RAN AND TOMMY PLEASE FINISH 
    //  fetch the server response GET /mobile/views/{hq_id}/{category_id}?sessoinid=xxx .

    //function to get last user favorite list
    this.GetUserFav();
  },
  data() {
      return{
              doneFetching: false,
              responseData: [],
            }
          },
  methods:
    {
        //Get user favorites
        GetUserFav: function(){
            FavoriteAxios.getUserFav().then((response) => {
            console.log("user fav: ",response);
            this.$store.state.user_favorites = response.data
        }).catch((error)=> {
            console.log("Got error getting user fav: ", error)
        })
        },
            
        CheckBookmark(view_id) {
          /*
              Function to check if viewId exist in user favorites list
          */
          let fav_list = this.$store.state.user_favorites;
          let i;
          //check if we have object inside user favorites without using filter...
          for(i =0; i< fav_list.length; i++){
                if(fav_list[i].VIEW_ID == view_id) return true;
            }
          return false
        },

        BookMarkClick(view_id) {
          this.$store.state.selected_view_id = view_id;
          if (this.CheckBookmark(view_id)) {  //already bookmarked
            FavoriteAxios.RemoveUserFav()
              .then((response) => { //if we got new info update user favorite list
                this.GetUserFav();
              })
              .catch((error) => {
                console.log("Got error removing user fav: ", error);
              });
          } else {
            FavoriteAxios.AddUserFav()
              .then((response) => { //if we got new info update user favorite list
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
