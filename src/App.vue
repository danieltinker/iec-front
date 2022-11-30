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
      // console.log(this.$router.currentRoute.path,"current path")
      // console.log(this.$router.currentRoute.path.includes("mobile_login"),"current path includes mobile_login")

      if(localStorage.getItem('sessionid') !== null && localStorage.getItem('user_id') !== null){
            console.log("validating SID /hq")
            await axios
                    .get(this.$store.state.serverAdrr+"/shavit-mobile/hq", 
                    {params: {user_id:window.localStorage.getItem("user_id"), sid: localStorage.getItem('sessionid')}}
                    )
                    .then(response => {
                        this.$store.state.loginStore.isAuthenticated = true
                        this.$store.state.loginStore.userInfo.sid =  window.localStorage.getItem("sessionid") 
                        this.$store.state.loginStore.userInfo.user_id =  window.localStorage.getItem("user_id") 
                        this.$store.state.loginStore.userInfo.main_hq =  window.localStorage.getItem("main_hq")
                        this.$store.state.prefTheme = window.localStorage.getItem("prefTheme") 
                        this.$store.state.hebrew_name = window.localStorage.getItem("hebrew_name") 
                        this.$store.state.hq_name = window.localStorage.getItem("hq_name") 
                        this.$store.state.selected_hq_id = this.$store.state.loginStore.userInfo.main_hq
                        console.log("200 - request w sid for hq LoginStore:", this.$store.state.loginStore)
                        console.log("APP AUTHENTICATE rerouting APP -> HomePage")
                        this.$router.push("/");
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("test request Failed, REROUTE to ADFS/mobile_login")
                        this.$store.state.loginStore.isAuthenticated = false
                        if(this.$store.state.isAzureEnv){
                          this.$router.push("/mobile_login");
                        }
                        else{
                          window.location.href = "https://shavit-t.net.iec.co.il/adfs_mobile";
                        }
                    });

      }
      if(!this.$store.state.loginStore.isAuthenticated){
        console.log("No Autentication rerouting APP --> ADFS_MOBILE/login page")
        if(!this.$store.state.isAzureEnv){
          window.location.href = "https://shavit-t.net.iec.co.il/adfs_mobile";
        }
        else{
          this.$router.push("/mobile_login");
        }
      }

      this.renderApp = true

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
  src: url(./assets/fonts/Heebo-Black.ttf);
}
@font-face {
  font-family: almoni-bold;
  src: url(./assets/fonts/Heebo-Bold.ttf);
}
@font-face {
  font-family: almoni-demibold;
  src: url(./assets/fonts/Heebo-SemiBold.ttf);
}
@font-face {
  font-family: almoni-light;
  src: url(./assets/fonts/Heebo-Light.ttf);
}
@font-face {
  font-family: almoni-medium;
  src: url(./assets/fonts/Heebo-Medium.ttf);
}
@font-face {
  font-family: almoni;
  src: url(./assets/fonts/Heebo-Regular.ttf);
}
@font-face {
  font-family: almoni-thin;
  src: url(./assets/fonts/Heebo-Thin.ttf);
}
@font-face {
  font-family: almoni-ultrablack;
  src: url(./assets/fonts/Heebo-Black.ttf);
}
@font-face {
  font-family: almoni-ultrabold;
  src: url(./assets/fonts/Heebo-ExtraBold.ttf);
}
@font-face {
  font-family: almoni-ultralight;
  src: url(./assets/fonts/Heebo-Regular.ttf);
}
</style>