<!-- eslint-disable -->
<template>
  <div dir="rtl">

    <div v-for="(btnName, index) in activeData" :key="index">

      <div v-if="btnName.selected" class="statusBoxV2" :style="{ 'background-color': btnName.color }">
        <img v-if="btnName.icon" :src="require(`@/assets/comp_items/${btnName.icon}.svg`)"
          style="max-width:100%;max-height:100%;float: right;margin-left:8px" />
        <h1 style="font-family: almoni-medium; font-size: 28px;color:white;text-align: right;">{{ btnName.label }}</h1>
      </div>
      <span v-if="btnName.selected" style="font-family: almoni;"
        :style="'color:' + getCurrentTheme.baseGenericPie.span_color">{{ btnName.cause }} </span>
    </div>

    <div class="btn-container">

      <v-row v-if="props_object.params.show_label" dir="rtl" style="place-content:center;display: inline-flex;padding-right: 4%;">
        <div v-for="(btnName, index) in activeData" :key="index" class="labels">
          <span class="dot" style="margin-left:5px"
            :style="{ backgroundColor: btnName.color ? btnName.color : getColor(btnName, index).color }"></span>
          <span :style="'color:' + getCurrentTheme.baseGenericPie.span_color" style="margin-left:5px">
            {{ btnName.label }}
          </span>
        </div>
      </v-row>

    </div>

  </div>
</template>

<script>
export default {
  props:["activeData","props_object"],
  watch: {
    drillDataProp() {
      this.jsonData = this.drillDataProp;
    }
  },
  data() {
    return {
      myTimeout: undefined,
      show_label: true,
      box_color: "#000000",
      selected_label: "תקלה",
      my_lables_arr: [],
      defaultColors: ["#0073FF", "#FF8D00", "#8FC602", "#C10015", "#0073FF", "#FF8D00", "#8FC602", "#C10015"]
    };
  },
  components: {
  },
  methods: {
    getColor(obj, index) {
      obj.color = this.defaultColors[index]
      return obj
    },
  },
  computed: {
  },

};
</script>

<style scoped>
:deep() .v-input--selection-controls__input .v-icon {
  color: v-bind('getCurrentTheme.global_radio');
}

:deep() .v-input--selection-controls .v-radio>.v-label {
  color: v-bind('getCurrentTheme.drill_title_color');
  margin-right: 6px;
}

:deep() .v-input--radio-group.v-input--radio-group--row .v-radio {
  margin-right: 0px !important;
}

.btn-container {
  margin-top: 50px;
  margin-left: 4%;
  margin-right: 4%;

}

.labels {
  font-size: 16px;
  font-family: almoni;
  display: -webkit-inline-box;
  -webkit-box-align: center;
  margin-left: 10px
}

.dot {
  align-self: center;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: flex;
  margin: 2%;
  margin-right: 0;
  direction: rtl;
  /* margin-left: 5px; */
}

.statusBoxV2 {
  text-align: center;
  line-height: 50px;
  margin: auto;
  width: 50%;
  margin-top: 44px;
  margin-bottom: 28px;
  width: 180px;
  height: 50px;
  border-radius: 200px;
}

.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.KPIcontainer {
  /* display: grid;
  grid-template-columns: auto auto;
  row-gap: 6px;
  column-gap: 8px;
  justify-content: center;
  padding-bottom: 8px; */
}

.kpi-box {
  padding-top: 0px;
  text-align: center;
  align-items: center;
  width: 159px;
  height: 80px;
  border-radius: 4px;
}

/* .kpi-box span:first-child{
    font-family: almoni;
    font-size: 20px;
    line-height: 30px;
} */

.loader {
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}

.v-progress-circular {
  padding: 40px;
}

/* .kpi-box span{
    display: inline-block;
    font-size: 16px;
    font-family: almoni;
    color: #a8699d;
} */
.kpi-box .kpi-sec-value {
  color: #606060;
}

#chartsHeaders {
  font-family: almoni-medium;
  font-size: 18px;
  color: v-bind("getCurrentTheme.generic_title_color");
  /* margin-bottom: 18px; */
}

.clock-drilldown {
  background-color: #e5e5e5;
  padding-bottom: 20px;
}

.drilldown-title {
  padding-top: 16px;
  color: v-bind("getCurrentTheme.drill_title_color");
  font-size: 24px;
  text-align: center;
  font-family: almoni;
}

.kpi-box span {
  display: inline-block;
  font-size: 18px;
  font-family: almoni;
  color: #a8699d;
}

.clock-drilldown {
  background-color: #e5e5e5;
  padding-bottom: 20px;
}

.carousel-flex {
  display: flex;
  flex-direction: column;
}

.carousel-flex :deep() .v-window__next {
  background-color: transparent !important;
  color: transparent !important;
  top: 40% !important;
  margin-right: 2px;
}

.carousel-flex :deep() .v-window__prev {
  background-color: transparent !important;
  color: transparent !important;
  top: 40% !important;
  margin-left: 2px;
}

.radio-btn {
  display: inline-block !important;
}
</style>