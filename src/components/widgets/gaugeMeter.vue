<template>
  <div dir="ltr">
    <div v-if="myOptions">
      <!-- style="pointer-events: none;" -->
      <vue-gauge :refid="'reff'+props_object.view_ID" :options="myOptions" />
      <!--button @click="value++">Add</button-->
      <h1 style="position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);" :style="{ color: getCurrentTheme.cyber_status.box_color_1 }">{{numToLocaleString(myOptions.needleLabel)}}</h1>
    </div>
    <NoDataMsg :isDrill="props_object.isDrill" v-else/>
  </div>
</template>

<script>
import VueGauge from "vue-gauge";
import NoDataMsg from "../utils/NoDataMsg.vue";
export default {
  props: ["activeData", "props_object"],
  components: { VueGauge, NoDataMsg },
  created() {
    // this.activeData = [{
    //   needleValue:1111240,
    //   arcColors: ["red","green"],
    //   rangeLabel: [0,200],
    //   arcLabels:[40, 180]
    // }]
    

  },
  computed: {
    myOptions() {
      if (this.activeData[0].needleValue) {
        return {
          chartWidth: window.innerWidth / 1.2,
          needleColor: 'black',
          rangeLabelFontSize: 18,
          needleLabel:this.activeData[0].needleValue,
          needleValue: this.precentage(this.activeData[0].needleValue, this.activeData[0].rangeLabel[1]),
          arcDelimiters: this.activeData[0].arcLabels.map(this.precentage),
          arcColors: this.activeData[0].arcColors,
          arcLabels : this.activeData[0].arcLabels,
          rangeLabel: this.activeData[0].rangeLabel.map(x =>{return this.numToLocaleString(x)}),
          arcOverEffect:false
        }
      }
      else {
        return false
      }
    }

  },
  methods: {
    precentage(value, max_value) {
      console.log("value", max_value);
      return Number((value / (this.activeData[0].rangeLabel[1] / 100)).toFixed(1));
    },
  },
  data() {
    return {
      // myOptions: {
      //   chartWidth: window.innerWidth / 1.2,
      //   needleValue: undefined,
      //   arcOverEffect:true,
      //   needleColor: "black",
      //   arcDelimiters: undefined,
      //   arcColors: undefined,
      //   arcLabels: [1011111, 1180],
      //   rangeLabel: undefined,


      //   rangeLabelFontSize: 18,
      //   arcLabelFontSize:10
      // },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
test {
  color: blue
}



:deep() path {
  d: 88 !important
}

:deep() svg path:nth-last-child(4) {

  d: path('M 850 300 C 850 300 350 300 350 300 L 348.1 205.39 L 120 400.39 L 348.1 606.19 L 350 500 C 850 500 850 500 850 500 z') !important;
}

/* :deep() text{
  font-size:15px;
  transform: translateY(-10px);
  transform: translateX(-10px);
} */

:deep() text {
  /* font-size: 14px; */
  /* transform: translateY(-10px);
  transform: translateX(-10px); */
  font-weight: bold;
  fill: v-bind('getCurrentTheme.cyber_status.box_color_1');
  color: blue
}

:deep() text:nth-last-child(1) {
  font-size: 20px;
  transform: translateY(28px);
}

:deep() text:nth-last-child(2) {
  display: v-bind('props_object.params.hideNumbers ? "none" : "block" ');
}

:deep() text:nth-last-child(3) {
  display: v-bind('props_object.params.hideNumbers ? "none" : "block" ');
}

:deep() svg path:nth-last-child(5) {
  fill: v-bind('getCurrentTheme.cyber_status.box_color_1');
  stroke: v-bind('getCurrentTheme.cyber_status.box_color_1');
}

/* :deep() svg path:nth-last-child(5) {
    fill:black; 
    d:path('M51.49898804818025,-37.41620496624274L-2.5715604787795696,-3.539449350390395L-3.539449350390395,2.5715604787795696L2.5715604787795696,3.539449350390395L51.49898804818025,-37.41620496624274')       
            } */
</style>
  