<template>
  <v-app style="background-color: #ebebeb;">
    <HQNavBar/>
    
    <v-main class="app">
      <UserFavoritesVue/>
      <CategoryBar/>
      <WidgetSpaceTwo/>
    </v-main>
  </v-app>
</template>

<script>
import WidgetSpaceTwo from './components/global/WidgetSpaceTwo.vue';
import HQNavBar from './components/global/HQNavBar.vue';
import CategoryBar from './components/global/CategoryBar.vue';
// import QuickViewPopup from './components/global/QuickViewPopup.vue'
import UserFavoritesVue from './components/global/UserFavorites.vue';

export default {
    name: "App",
    data: () => ({
      }),
    components: { WidgetSpaceTwo,HQNavBar, CategoryBar, UserFavoritesVue },
    mounted(){
      this.$store.state.selected_hq_id = 100
      this.$store.state.selected_cat_id = 101
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
</style>