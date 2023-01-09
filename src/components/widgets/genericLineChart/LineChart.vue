<template>
  <div>
    <!-- <h1>{{ serie }}</h1> -->
    <apexchart v-if="showData" height="300" width="99%" type="line" :options="option" :series="serie" ref="genericChart"
      style="overflow-y: hidden; margin-right: 7px;dir:ltr"></apexchart>
  </div>
</template>

<script>

export default {
  props: {
    series: { type: Array },
    options: { type: Object }
  },
  data() {
    return {
      showData: false,
      option: this.options,
      serie: this.series
    }
  }, watch: {
    getCurrentTheme() {
      //console.log(this.$refs.chart.options.yaxis[0].labels.style.colors,"heheehhe");

      console.log(this.$refs.chart, "heheehhe");
      if (this.option.yaxis[0]) {
        this.option.yaxis[0].labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
      }
      if (this.option.yaxis[1]) {
        this.option.yaxis[1].labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
      }
      if (this.option.yaxis[2]) {
        this.option.yaxis[2].labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
      }

      console.log(this.option.yaxis[0].labels.style.colors);
      this.option.xaxis.labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
      this.$refs.genericChart.updateOptions(
        this.option);
    }
  },
  created() {
    if (this.option.yaxis[0]) {
        this.option.yaxis[0].labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
      }
    if (this.option.yaxis[1]) {
        this.option.yaxis[1].labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
      }
    if (this.option.yaxis[2]) {
        this.option.yaxis[2].labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
    }
    if (this.option.xaxis) {
      this.option.xaxis.labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
    }
    const ts = Date.now()
    let ts_arr = []
    this.serie[0].data.forEach(couple => {
      // console.log(new Date(couple[0] * 1000))  

      ts_arr.push(couple[0])
    })
    // this.option.chart.zoom.enabled = false
    // this.option.chart.toolbar.show = false
    // this.option.xaxis[0].axisBorder.show = true
    // this.option.yaxis[0].axisBorder.show = true
    this.option.xaxis.range = 1000000
    this.option.xaxis.tickAmount = 5
    this.option.xaxis.type = 'numeric'
    this.option.xaxis.categories = ts_arr
    // this.option.dataLabels.enabled=  false
    // this.option.xaxis.axisTicks.show= true
    // this.option.xaxis.labels.axisTicks= {
    //         show: false,
    //         borderType: 'solid',
    //         color: '#78909C',
    //         height: 6,
    //         offsetX: 0,
    //         offsetY: 0
    //     }
    // this.option.xaxis.range = 82800000
    this.option.xaxis.min = new Date().getTime(),
      this.option.xaxis.type = "datetime",

      this.option.xaxis.labels = {
        formatter: (value, timestamp) => {
          const dateTimeFormat = new Intl.DateTimeFormat('en', { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })
          var [{ value: month }, , { value: day }, , { value: hour }, , { value: minute }] = dateTimeFormat.formatToParts(new Date(timestamp))
          if (hour == 24) hour = 0
          return `${hour}:${minute} ${day}/${month}`;
          //return new Date(timestamp) // The formatter function overrides format property
        },
        "style": {
          "colors": "#808080"
        }
      }
    // this.option.xaxis.categories = ts_arr
    // this.option.xaxis.axisBorder.color = "black"
    this.showData = true
  }
}
</script>

<style scoped>
:deep() .apexcharts-legend-series {
  direction: rtl;
}

:deep() .apexcharts-legend-text {
  margin-right: 5px !important;
  place-content: end !important;
  color: v-bind('getCurrentTheme.cyber_status.box_color_1') !important;
}
</style>