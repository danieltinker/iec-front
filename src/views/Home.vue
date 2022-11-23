<template >
      <!-- APP PAGE -->
      <div>
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
        <BookmarkSnackbar v-if="snackbar" :text="snackText" :success="success" style="height: 40px;margin-bottom: 10px;
              position: fixed; 
              bottom:0%;
              width:100%;"/>
    </div>
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
        this.$store.state.selected_hq_id = 100
        this.$store.state.selected_cat_id = 101      
      },
      async created() {
        this.updatelist()
  
        // undo this when deploy
        this.valid_sid = true
  
        // console.log(this.$store.state.isAuthenticated,"my is Auth")
        // if(!this.$store.state.isAuthenticated){
        //   console.log("reroute to ADFS_MOBILE")
        //   window.location.href = "https://shavit-t.net.iec.co.il/adfs_mobile";
        //     // reroute to adfs_mobile
        // }
        // else{
        //   await axios
        //     .get(this.$store.state.serverAdrr+"/shavit-mobile/hq", 
        //     {params: { sid: this.$store.state.currUser.sessionId }}
        //     )
        //     .then(response => {
        //       this.valid_sid = true
  
        //       console.log("400 - test request for sid ")
        //       console.log(window.localStorage.getItem("user_id"), " my user id")
        //       console.log(this.$store.state.currUser.user_id, " my user id")
        //     })
        //     .catch((error) => {
        //       window.location.href = "https://shavit-t.net.iec.co.il/adfs_mobile";
        //       console.log("session ID isnt Valid")
        //       console.log(error);
        //     });
        // }
  
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
  