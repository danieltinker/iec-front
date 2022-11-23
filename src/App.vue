<template >
  <v-app :style="{'background-color':getCurrentTheme.app_background,'color':getCurrentTheme.app_color}">
    <!-- APP PAGE -->
    <v-main class="app">
      <router-view/>
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
import axios from 'axios';
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
      console.log("APP MOUNTED")
      // this.$store.state.selected_hq_id = 100
    },
    async created() {
      console.log("APP CREATED")
      this.updatelist()
      
      // console.log(this.$store.state.isAuthenticated,"my is Auth")
      if(!this.$store.state.isAuthenticated){
        // console.log("reroute to ADFS_MOBILE")
        // window.location.href = "https://shavit-t.net.iec.co.il/adfs_mobile";

        // GOT GOOD SID - will come back to / (home) and be autenticated (tru router)
        // GOT BAD SID - adfs reroute to login .
          this.$router.push("/login");

      }
      else{
          this.$router.push("/");
            //   await axios
            //     .get(this.$store.state.serverAdrr+"/shavit-mobile/hq", 
            //     {params: { sid: this.$store.state.currUser.sessionId }}
            //     )
            //     .then(response => {
            //       console.log("400 - test request for sid ")
            //       console.log(window.localStorage.getItem("user_id"), " my user id")
            //       console.log(this.$store.state.currUser.user_id, " my user id")
            //     })
            //     .catch((error) => {
              //       console.log(error);
              //       console.log("HQ TEST FETCH FAILED REROUTE TO /adfs_mobile")
            //       window.location.href = "https://shavit-t.net.iec.co.il/adfs_mobile";
            //     });
      }

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