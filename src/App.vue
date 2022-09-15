<template>
  <v-app>
    <v-main class="app">
      <!-- <router-view/> -->
      <WidgetSpaceTwo/>
    </v-main>
  </v-app>
</template>

<script>
import WidgetSpaceTwo from './components/global/WidgetSpaceTwo.vue';

export default {
    name: "App",
    data: () => ({
    //
    }),
    components: { WidgetSpaceTwo }
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