<template>
    <div dir="rtl" class="mb-10 container">
    <div>
      <!-- {{GET_USER_FAV}} -->
        <div class="fav-btn" v-for="item in GET_USER_FAV" :key="item.VIEW_ID">
          <v-btn 
          
                color="#935287"
                outlined
                fab
                class="ml-4 story"
                @click="openQuickView(item)"
                >
                <img v-if="item.STATE.PARAMETERS.fav_icon != ''" :src="getImg(item.STATE.PARAMETERS.fav_icon)" />
            </v-btn>
            <span class="fav-span" v-if="item.STATE.PARAMETERS.headline_config.title.length < 8">{{ item.STATE.PARAMETERS.headline_config.title }}</span>
            <v-tooltip top v-else>
                <template v-slot:activator="{ on, attrs }">
                    <span class="fav-span" v-bind="attrs" v-on="on">
                        {{ item.STATE.PARAMETERS.headline_config.title.substring(0, 8) + ".." }}
                    </span>
                </template>
                <span class="fav-span">{{ item.STATE.PARAMETERS.headline_config.title}}</span>
            </v-tooltip>
        </div>
              
        
    </div >
    <QuickViewPopup class="quick-view" v-if="$store.state.quick_view" :mydata="data" @closeQuickView="closeQuickView" />
    </div>
</template>


<script>
import QuickViewPopup from './QuickViewPopup.vue';
import { mapGetters } from 'vuex'
export default {
  created() {
  },
    methods: {
      
        openQuickView(data){
            // console.log("quick",data);
            this.data = data
            //save quick view id clicked
            this.$store.state.selected_view_id = data.VIEW_ID
            document.querySelector('html').style.overflowY == "hidden !important"
            this.$store.state.quick_view = !this.$store.state.quick_view
        },
        closeQuickView(){
            this.$store.state.quick_view = !this.$store.state.quick_view

        },
        getImg(img) {
            try {
                return require(`@/assets/FavBar/${img}.svg`);
            }
            catch (e) {
                //defaultImage
                return require("@/assets/FavBar/bar.svg");
            }
        }
    },
    computed:
    {
      ...mapGetters(["GET_USER_FAV"]),
      getUserFavData() {
        return this.$store.state.user_favorites
      },
      getfav ()
      {
        return this.$store.getters.GET_USER_FAV
      }
    },
    mounted() {
    // console.log("stories", this.$store.getters.GET_USER_FAV);
  },
    data: () => ({
        data:"",
        QuickViewState:false,
        //getUserFavData: store.state.user_favorites//[{ template_id: 11, parameters: "Dsadsa", icon: "bar", state: "", title: "test1" }, { template_id: 22, parameters: "", icon: "pie", state: "", title: "test2" }, { template_id: 33, parameters: "Dsadsa", icon: "bar", state: "" }, { template_id: 44, parameters: "Dsadsa", icon: "bar", state: "" }]
    }),
    components: { QuickViewPopup }
}
</script>

<style scoped>
::v-deep .v-application {
    font-family: "Roboto", sans-serif;
    line-height: 1.4 !important;
}
.quick-view{
  overflow-y: auto;
}
.fav-span {
  font-size: 0.8rem;
}
.fav-btn {
  display: flex;
  flex-direction: column;
}
.container {
  background-color: rgb(244, 244, 244);
  display: flex;
  overflow-x: auto;
  /* height: 80px; */
  width: auto;
  
}

.container div:first-child {
  display: flex;
  align-self: center;

}
.favContainer {
  direction: rtl;
  right: 0;
  display: grid;
}

.story {
  box-shadow: none;
  height: 58px;
  width: 58px;
}

.favoriteLabels {
  font-family: almoni;
  size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* word-wrap: break-word; */
  text-overflow: ellipsis;
}
</style>