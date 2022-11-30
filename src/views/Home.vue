<template >
      <!-- APP PAGE -->
      <div  v-if="valid_sid">
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
  import WidgetSpace from '../components/global/WidgetSpace.vue';
  import HQNavBar from '../components/global/HQNavBar.vue';
  import CategoryBar from '../components/global/CategoryBar.vue';
  import UserFavorites from '../components/global/UserFavorites.vue';
  import { mapActions } from 'vuex';
  import MaxFavoritePopup from '../components/global/maxFavoritePopup.vue';
  import RemoveBookmark from '../components/global/removeBookmark.vue';
  import BookmarkSnackbar from '../components/global/bookmarkSnackbar.vue';
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
      async created() {
        console.log("WELCOME TO HOME PAGE")
        if(this.$store.state.loginStore.isAuthenticated){
            console.log("User Info: ",this.$store.state.loginStore.userInfo)
            this.updatelist()
            this.valid_sid = true
        }
        else{
            console.log("route to login from HOME !")
            // this.$router.push("/login");
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
  