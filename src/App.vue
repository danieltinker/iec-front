<template >
  <v-app :style="{'background-color':getCurrentTheme.app_background,'color':getCurrentTheme.app_color}" v-if="valid_sid">
    <!-- APP PAGE -->
    <v-main class="app">
      <!-- navigation bar + Theme Selector toggle + Log out BTN -->
      <HQNavBar/> 
      <!-- FAVORITES HORIZONTAL "instagram" SCROLL -->
      <UserFavorites/>
      <!-- CATEGORIES BAR HORIZONTAL SCROLL -->
      <CategoryBar/>
      <!-- WIDGETS SPACE (CLOCKS) VERTICAL SCROLL  -->
      <WidgetSpace :class="{removeDisplay: this.$store.state.quick_view}" />
      <!-- {{$store.state.selected_view_param}} -->
      <MaxFavoritePopup v-if="$store.state.max_favorite_popup"/>

      <RemoveBookmark v-if="$store.state.removeBookmarkDialog"></RemoveBookmark>
      <BookmarkSnackbar v-if="snackbar" :text="snackText" :success="success" style="height: 40px;margin-bottom: 10px;;
    position: fixed; 
    bottom:0%;
    width:100%;"/>
    </v-main>
  </v-app>
</template>

<script>
import WidgetSpace from './components/global/WidgetSpace.vue';
import HQNavBar from './components/global/HQNavBar.vue';
import CategoryBar from './components/global/CategoryBar.vue';
import UserFavorites from './components/global/UserFavorites.vue';
import { mapActions } from 'vuex';
import MaxFavoritePopup from './components/global/maxFavoritePopup.vue';
import RemoveBookmark from './components/global/removeBookmark.vue';
import BookmarkSnackbar from './components/global/bookmarkSnackbar.vue';
export default {
    name: "App",
    data: () => ({
      snackbar:false,
      success:false,
      snackText:"",
      valid_sid:false
      }),
    components: { WidgetSpace, HQNavBar, CategoryBar, UserFavorites, MaxFavoritePopup, RemoveBookmark, BookmarkSnackbar },
    mounted(){
      this.$store.state.selected_hq_id = 100
      this.$store.state.selected_cat_id = 101      
    },
    async created() {
      this.updatelist()
      console.log(this.$store.state.isAuthenticated,"my is Auth")
      if(!this.$store.state.isAuthenticated){
        console.log("reroute to ADFS_MOBILE")
        window.location.href = "https://shavit-t.net.iec.co.il/mobile_adfs";
          // reroute to adfs_mobile
      }
      else{
        await axios
          .get(this.$store.state.serverAdrr+"/shavit-mobile/hq", 
          {params: { sid: this.$store.state.currUser.sessionId }}
          )
          .then(response => {
            console.log("400 - test request for sid ")
            this.valid_sid = true
            // this.$store.state.currUser.sessionId = localStorage["sessionid"]
            // this.hqs = response.data;
          })
          .catch((error) => {
            console.log("session ID isnt Valid")
            console.log(error);
          });
      }


/////////////
// this.$root.$on("addBookmarkSnackbar",async (text,success) => {
//         // if(this.snackbar){
//         //   console.log(this.snackbar,"lkkksakdsak");
//         //   await new Promise(() => setTimeout(()=>{this.snackbar = false;}, 5000));
//         // }
//         console.log("heree");
//         this.success = success
//         this.snackbar = true;
//         this.snackText = text;
//         setTimeout(() => {
//             this.snackbar = false;
//           }, 3000);
          ///////////////
      this.$root.$on("addBookmarkSnackbar", (text,success) => {
        this.snackbar = false;
        this.success = success
        this.snackbar = true;
        this.snackText = text;
        setTimeout(() => {
            this.snackbar = false;
          }, 3000);
        
      });
    },
    watch: {
    },
    methods: {
      ...mapActions(["SET_FAV_LIST"]),
      updatelist ()
      {
        //Get all user favorite list
        this.SET_FAV_LIST()
      }
    },
    computed:{
      getCurrentTheme(){
        return this.$store.getters.currentTheme
    }
    }
};
</script>

<style>
    html, body {
  overflow-x: hidden;
}
body {
  position: relative
}
.app{
  width: 100%;
}
.removeDisplay{
  display: none !important;
}
.loader{
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}
.v-progress-circular{
  padding:40px;
}

    @font-face {
  font-family: almoni-black;
  src: url(./assets/fonts/almoni-black-aaa.otf);
}
@font-face {
  font-family: almoni-bold;
  src: url(./assets/fonts/almoni-bold-aaa.otf);
}
@font-face {
  font-family: almoni-demibold;
  src: url(./assets/fonts/almoni-demibold-aaa.otf);
}
@font-face {
  font-family: almoni-light;
  src: url(./assets/fonts/almoni-light-aaa.otf);
}
@font-face {
  font-family: almoni-medium;
  src: url(./assets/fonts/almoni-medium-aaa.otf);
}
@font-face {
  font-family: almoni;
  src: url(./assets/fonts/almoni-regular-aaa.otf);
}
@font-face {
  font-family: almoni-thin;
  src: url(./assets/fonts/almoni-thin-aaa.otf);
}
@font-face {
  font-family: almoni-ultrablack;
  src: url(./assets/fonts/almoni-ultrablack-aaa.otf);
}
@font-face {
  font-family: almoni-ultrabold;
  src: url(./assets/fonts/almoni-ultrabold-aaa.otf);
}
@font-face {
  font-family: almoni-ultralight;
  src: url(./assets/fonts/almoni-ultralight-aaa.otf);
}
</style>