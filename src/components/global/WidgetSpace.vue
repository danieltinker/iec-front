<template >
  <div v-if="doneFetching">
    <div :style="'background-color:' + getCurrentTheme.headline.background" class=" mt-3" v-for="(widget, index) in responseDataComp" :key="index">
      <div class="headline-toolbar" v-if="widget.PARAMETERS.show_clock">
        <div class="grid-item">
          <div style="width:40px">
          <ThreeDotsNineDots class="grid-item" :isExpand="widget.PARAMETERS.expand"
            @switch-expand="widget.PARAMETERS.expand = !widget.PARAMETERS.expand"
            v-if="widget.PARAMETERS.headline_config && widget.PARAMETERS.headline_config.three_dots_enabled" />
          </div>
        </div>
        <h1 :style="'color:' + getCurrentTheme.headline.title_color" class="headline-title grid-item" v-if="widget.PARAMETERS.headline_config">
          {{ widget.PARAMETERS.headline_config.title }} {{widget.VIEW_ID}}
        </h1>
        <div class="grid-item">
          <div style="width:40px">
          <v-icon @click="BookMarkClick(widget.VIEW_ID,widget.PARAMETERS,widget.TEMPLATE_TYPE,false)" color="#935287" style="font-size: 30px"
            v-if="widget.PARAMETERS.headline_config && widget.PARAMETERS.headline_config.bookmark_enabled">{{
            CheckBookmark(widget.VIEW_ID)
            ? "mdi-bookmark"
            : "mdi-bookmark-outline"
            }}</v-icon>
          </div>
        </div>
      </div>
      <component :is="widget.TEMPLATE_TYPE" :params="widget.PARAMETERS" :isDrillDown="false" :view_ID="widget.VIEW_ID">
      </component>
    </div>
  </div>

  <div class="skeleton-loader" v-else >
    <div class="skl" v-if="!isErrorMsg">
      <div class="skely"  v-for="i in [1,2,3]" :key="i">
        <template >
          <v-sheet
            :color="getCurrentTheme.theme ==='darkTheme' ? getCurrentTheme.baseGenericPie.btn_color_drill : getCurrentTheme.baseGenericPie.btn_color"
            class="pa-3"
          >
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="image, actions"
              :dark= "getCurrentTheme.theme ==='darkTheme'"
            ></v-skeleton-loader>
          </v-sheet>
        </template>
      </div>      
    </div>
    <h1 class="error-msg" v-else>  {{errorMsg}} </h1>
    </div>  
</template>

<script>
import ThreeDotsNineDots from "../utils/ThreeDotsNineDots.vue";
import genericKPI from '../widgets/genericKPI.vue';
import genericPIE from "../widgets/genericPIE.vue";
import genericBAR from "../widgets/genericBAR.vue";
import genericKPITWO from "../widgets/genericKPITWO.vue"
import genericGraph from "../widgets/genericGraph.vue"
import cyberStatus from "../widgets/cyberStatus.vue"
import iecLineChart from "../widgets/iecLineChart.vue"
import remoteUsers from "../widgets/remoteUsers.vue"
import genericLIST from "../widgets/genericLIST.vue"
import totalElectricityLevel from "../widgets/totalElectricityLevel"
import axios from "axios";
import { mapGetters } from "vuex";
import MaxFavoritePopup from "./maxFavoritePopup.vue";
export default {
  components: {
    ThreeDotsNineDots,
    genericKPI,
    genericPIE,
    genericBAR,
    genericGraph,
    genericKPITWO,
    MaxFavoritePopup,
    cyberStatus,
    remoteUsers,
    genericLIST,
    totalElectricityLevel,
    iecLineChart
},
  props: {
    quickViewPopup: {
      type: Array,
      default() { return [] }
    }
  },
  data() {
    return {
      isMaxFavorite:false,
      errorMsg:"",
      doneFetching: false,
      responseData: [],
      fetch_interval:undefined
    }
  },
  watch: {
    // user selected devision
    "$store.state.selected_hq_id": {
      async handler() {
        this.$store.state.selected_cat_id=1
        this.doneFetching=false
        await axios
            .get(this.$store.state.serverAdrr+"/shavit-mobile/views/" + this.$store.state.selected_hq_id + "/" + this.$store.state.selected_cat_id, { params: { sid: "xxx" } })
            .then((response) => {
              this.responseData = response.data;
              this.doneFetching = true;
              this.errorMsg = ""
            })
            .catch((error) => {
              this.errorMsg = "תצוגת דף לא זמינה"
              console.log(error);
            });

 
      },
    },
    //user selected category
    "$store.state.selected_cat_id": {
      // fetch the widgets views from the DB

      
      async handler() {
        this.$store.state.selected_cat_id=1
        await axios
            .get(this.$store.state.serverAdrr+"/shavit-mobile/views/" + this.$store.state.selected_hq_id + "/" + this.$store.state.selected_cat_id, { params: { sid: "xxx" } })
            .then((response) => {
              this.responseData = response.data;
              this.doneFetching = true;
              this.errorMsg = ""
            })
            .catch((error) => {
              this.errorMsg = "תצוגת דף לא זמינה"
              console.log(error);
            });

 
      },
    },
  },

  async created() {
    this.fetch_interval = setInterval(async ()=>{
          console.log("Refreshing Page")
          await axios
            .get(this.$store.state.serverAdrr+"/shavit-mobile/views/" + this.$store.state.selected_hq_id + "/" + this.$store.state.selected_cat_id, { params: { sid: "xxx" } })
            .then((response) => {
              this.responseData = response.data;
              this.doneFetching = true;
              this.errorMsg = ""
            })
            .catch((error) => {
              this.errorMsg = "תצוגת דף לא זמינה"
              console.log(error);
            });
        },120000)

    this.$on('bookmark-drill', (viewID,params,templateType,isDrillDown)=>{
            console.log("widget lets make the save",viewID,params,templateType,isDrillDown)
            this.BookMarkClick(viewID,params,templateType,isDrillDown)
        })

    if (this.quickViewPopup.length > 0 && this.errorMsg.length === 0) {
      this.doneFetching = true
    }

    this.GetUserFav();
  },

  computed:{
    isErrorMsg(){
        return this.errorMsg.length !== 0;
    },
    ...mapGetters(["GET_USER_FAV","IS_FETCHING"]),
    responseDataComp: function () {
      return !this.quickViewPopup.length ? this.responseData : this.quickViewPopup
    }
  },
  // skeleton loader config
  inject: {
      theme: {
        default: { isDark: false },
      },
    },

  methods:
  {
    //Get user favorites
    GetUserFav: function () {
      this.SET_FAV_LIST()
    },
    //Get user favorites
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
.error-msg{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
