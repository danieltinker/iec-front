<template>
  <v-app>
    <HQNavBar/>
    <v-main class="app">
      <CategoryBar/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import HQNavBar from './components/global/HQNavBar.vue';
import CategoryBar from './components/global/CategoryBar.vue';

export default {
    name: "App",
    data: () => ({
    //
    }),
    components: { HQNavBar, CategoryBar }
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