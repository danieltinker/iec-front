<!-- :style="{backgroundColor: isDrillDown? getCurrentTheme.app_background :getCurrentTheme.app_background}" -->
<template>
    <div dir="ltr"
    class="main_container"
    :style="{backgroundColor: getCurrentTheme.app_background}"
    
    >
     <v-row
      class=""
      style="text-align: center; margin-top: 5px; margin-bottom: 5px"
    >
      <v-col cols="4" style="text-align: left;padding-top:0;padding:bottom:0;"
        ><v-icon
          @click="$emit('closeQuickView')"
          :style="
              'font-size: 30px ' +
              '; color: ' +
              getCurrentTheme.app_color
            "
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

       <div >
        <WidgetSpace :quickViewPopup="quickData"/>
         <!-- {{[quickData]}} -->
         
       </div>
    </div>
</template>
<script>
// import { computed } from 'vue';
import WidgetSpace from './WidgetSpace.vue';
export default {
    props:['mydata'],
    components: {
      WidgetSpace
    },
    computed: {
      // eslint-disable-next-line
      quickData: function(){
        //modify data to work in WidgetSpaceTwo correct

        // eslint-disable-next-line 
        this.mydata.STATE['VIEW_ID'] = this.mydata.VIEW_ID
        // eslint-disable-next-line 
        this.mydata.STATE["TEMPLATE_TYPE"] = this.mydata.STATE.PARAMETERS.TEMPLATE_TYPE
      
        return [this.mydata.STATE]
      }
    }
}
</script>
<style scoped>
.quick-view{
  overflow-y: auto;
}
.main_container {
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: 100;
  top: 0%;
  left: 0%;
  right: 0%;
  -webkit-animation: fadeIn 0.15s;
  animation: fadeIn 0.15s;
}
</style>