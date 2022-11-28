<template >
  <v-app :style="{'background-color':getCurrentTheme.app_background,'color':getCurrentTheme.app_color}">
    <!-- APP PAGE -->
    <v-main class="app" v-if="renderApp">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import BookmarkSnackbar from './components/global/bookmarkSnackbar.vue';
import WidgetSpace from './components/global/WidgetSpace.vue';
import HQNavBar from './components/global/HQNavBar.vue';
import CategoryBar from './components/global/CategoryBar.vue';
import UserFavorites from './components/global/UserFavorites.vue';
import MaxFavoritePopup from './components/global/maxFavoritePopup.vue';
import RemoveBookmark from './components/global/removeBookmark.vue';
export default {
    name: "App",
    data: () => ({
      snackbar:false,
      success:false,
      snackText:"",
      valid_sid:false,
      renderApp:false

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
      if(localStorage.getItem('sessionid') !== null){
            // check if its a valid sid.
            console.log("check if sid in storage is good /hq")

            await axios
                    .get(this.$store.state.serverAdrr+"/shavit-mobile/hq", 
                    {params: {user_id:window.localStorage.getItem("user_id"), sid: localStorage.getItem('sessionid')}}
                    )
                    .then(response => {
                        this.$store.state.loginStore.isAuthenticated = true
                        this.$store.state.loginStore.userInfo.sid =  window.localStorage.getItem("sessionid") 
                        this.$store.state.loginStore.userInfo.user_id =  window.localStorage.getItem("user_id") 
                        this.$store.state.loginStore.userInfo.main_hq =  window.localStorage.getItem("main_hq") 
                        this.$store.state.selected_hq_id = this.$store.state.loginStore.userInfo.main_hq
                        console.log("200 - test request for sid")
                        console.log("STORE MODE:", this.$store.state.loginStore)
                        this.renderApp = true
                    })
                    .catch((error) => {
                        this.$store.state.loginStore.isAuthenticated = false
                        console.log("session ID isnt Valid, REROUTE ADFS remove this sid from localstroage")
                        localStorage.removeItem("sessionid")
                        this.$router.push("/login");
                        // window.location.href = "https://shavit-t.net.iec.co.il/adfs_mobile";
                        console.log(error);
                    });

      }
      else{
        this.$router.push("/login");
        this.renderApp = true
      }
      if(!this.$store.state.loginStore.isAuthenticated){
        console.log("reroute FROM APP to ADFS_MOBILE")

        if(!this.$store.state.isAzureEnv){
          window.location.href = "https://shavit-t.net.iec.co.il/adfs_mobile";
        }

        // GOT GOOD SID - will come back to / (home) and be autenticated (tru router)
        // GOT BAD SID - adfs reroute to login.
          // this.$router.push("/login");
      }
      else{
          console.log("APP AUTH")
          this.$router.push("/");
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