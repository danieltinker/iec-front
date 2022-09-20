<template>
    <div dir="ltr"
    class="main_container">
     <v-row
      class=""
      style="text-align: center; margin-top: 5px; margin-bottom: 5px"
    >
      <v-col cols="4" style="text-align: left;padding-top:0;padding:bottom:0;"
        ><v-icon
          @click="$emit('closeQuickView')"
          style="font-size: 30px"
          >mdi-close</v-icon
        ></v-col
      >
      <v-col cols="4" style="padding-top:0;padding:bottom:0;"
        ><span
          >מבט מהיר</span
        ></v-col
      >
      <v-col cols="4" style="padding-top:0;padding:bottom:0;"></v-col>
    </v-row>
        das1dasdasd
        <br>
        {{mydata}}
        <br>
        dsadas
        <br>
        dsadas
        <br>
        dsadas
    </div>
</template>

<script>
export default {
    props:['mydata']
}
</script>
<style scoped>

.main_container {
    position: fixed;
  background-color: red;
  height: 100vh;
  width: 100vw;
  overflow: visible;
  z-index: 100;
  top: 0%;
  left: 0%;
  right: 0%;
  -webkit-animation: fadeIn 0.15s;
  animation: fadeIn 0.15s;
}
</style>