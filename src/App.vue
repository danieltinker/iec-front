<template >
  <v-app style="background-color: #ebebeb;">
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
    </v-main>
  </v-app>
</template>

<script>
import WidgetSpace from './components/global/WidgetSpace.vue';
import HQNavBar from './components/global/HQNavBar.vue';
import CategoryBar from './components/global/CategoryBar.vue';
import UserFavorites from './components/global/UserFavorites.vue';
import { mapActions } from 'vuex';
export default {
    name: "App",
    data: () => ({
      }),
    components: { WidgetSpace,HQNavBar, CategoryBar, UserFavorites },
    mounted(){
      this.$store.state.selected_hq_id = 100
      this.$store.state.selected_cat_id = 101      
    },
    created() {
      this.updatelist()
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
        // console.log(this.$store.getters.currentTheme.theme);
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
</style>