<template>
  <v-app style="background-color: #ebebeb;">
    <HQNavBar/>
    <v-main class="app">
      <CategoryBar/>
      <!-- <router-view/> -->
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
    components: { WidgetSpaceTwo,HQNavBar, CategoryBar }
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