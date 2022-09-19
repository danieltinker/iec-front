<template>
  <v-app style="background-color: #ebebeb;">
    <HQNavBar/>
    <v-main class="app">
      <CategoryBar/>
      <WidgetSpaceTwo/>
    </v-main>
  </v-app>
</template>

<script>
import WidgetSpaceTwo from './components/global/WidgetSpaceTwo.vue';
import HQNavBar from './components/global/HQNavBar.vue';
import CategoryBar from './components/global/CategoryBar.vue';

export default {
    name: "App",
    data: () => ({
    //
      }),
    components: { WidgetSpaceTwo,HQNavBar, CategoryBar },
    mounted(){
      this.$store.state.selected_hq_id = 100
      this.$store.state.selected_cat_id = 101
    },
    created(){
      // console.log("puts")
      // console.log(this.$store.state.selected_hq_id)
      // console.log(this.$store.state.selected_hq_id)
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