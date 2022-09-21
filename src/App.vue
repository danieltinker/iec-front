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
import UserFavoritesVue from './components/global/UserFavorites.vue';
import { mapActions } from 'vuex';
export default {
    name: "App",
    data: () => ({
      }),
    components: { WidgetSpaceTwo,HQNavBar, CategoryBar, UserFavoritesVue },
    mounted(){
      
      this.$store.state.selected_hq_id = 100
      this.$store.state.selected_cat_id = 101
      //this.$store.actions.SET_FAV_LIST
      
    },
    created() {
      this.updatelist()
    },
    methods: {
      ...mapActions(["SET_FAV_LIST"]),
      updatelist ()
      {
        this.SET_FAV_LIST()
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