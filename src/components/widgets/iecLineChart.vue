<template>
  <div
    :style="'background-color:' + getCurrentTheme.cyber_status.color_1"
    style="position: relative"
  >
    <div style="height:300px; " v-if="doneFetching">
      <div dir="ltr" class="mt-2 mb-4">
        <apexchart
          v-show="show"
          style="overflow-y: hidden; margin-right: 7px;dir:ltr"
          ref="chart"
          type="line"
          height="250px"
          width="90%"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>

    <div class="loader" v-else>
      <div class="loader" v-if="!isErrorMsg">
        <v-progress-circular indeterminate color="purple"></v-progress-circular>
      </div>
      <h1 v-else>{{errorMSG}}</h1>
    </div>
  </div>
</template>




  <script>
import axios from "axios";
import { Bubble } from "vue-chartjs";
import { mapState } from "vuex";

export default {
  name: "line-chart-display",

  // Component Parameters
  props: {
    interval: { type: Number, default: 60000 },
    title: { type: String, default: "גרף" },
    maxValueDisplay: { type: Number, default: null },
    chartWidth: { type: String, default: "48vw" },
    chartHeight: { type: String, default: "190" }
  },
  watch: {
    getCurrentTheme() {
      //console.log(this.$refs.chart.options.yaxis[0].labels.style.colors,"heheehhe");

      console.log(this.$refs.chart, "heheehhe");
      this.chartOptions.yaxis[0].labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
      console.log(this.chartOptions.yaxis[0].labels.style.colors);
      this.chartOptions.xaxis.labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
      this.$refs.chart.updateOptions(
      this.chartOptions);
    }
  },

  data() {
    return {
      doneFetching: false,
      errorMSG: "",
      show: false,
      chartData: [],
      intervalHandle: null,
      names: { mw: "עומס", forecast: "תחזית" },
      line1name: null,
      line1values: {},
      line2name: null,
      line2values: {},
      tabActive: true,
      series: [],
      chartOptions: {
        colors: ["#8CC63F", "#009245"],
        plotOptions: {
          bar: {
            columnWidth: "30%"
          }
        },
        chart: {
          height: "100%",
          width: "90%",
          type: "area",
          toolbar: {
            show: false,
            tools: {
              download: false,
              selection: false,
              reset: false
            }
          },

          stacked: false,
          events: {
            // legendClick:function(event, chartContext, config) {
            //   chartContext.reactiveSetter(0)
            //   console.log("th",this.$refs.chart);
            //   console.log("here1",event.axes.ctx.data.activeIndex);
            //   console.log("here1",chartContext);
            //   console.log("here1",config);

            // },
            beforeZoom: function(ctx) {
              // we need to clear the range as we only need it on the iniital load.
              ctx.w.config.xaxis.range = undefined;
            },
            beforeResetZoom: function(ctx) {
              // we need to clear the range as we only need it on the iniital load.
              ctx.w.config.xaxis.range = 14511464;
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth",
          width: [3, 3]
        },
        xaxis: {
          range: 82800000,
          min: new Date().getTime(),
          type: "datetime",
          labels: {
            offsetY: 0,
            
            style: {
              colors: "#ffffff"
            },
            formatter: function(value, timestamp) {
              const dateTimeFormat = new Intl.DateTimeFormat("en", {
                day: "numeric",
                month: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false
              });
              var [
                { value: month },
                ,
                { value: day },
                ,
                { value: hour },
                ,
                { value: minute }
              ] = dateTimeFormat.formatToParts(new Date(timestamp));
              if (hour == 24) hour = 0;
              return `${hour}:${minute}  ${day}/${month}`;
              //return new Date(timestamp) // The formatter function overrides format property
            }
          }
        },
        yaxis: 
          {
            seriesName: "A",
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true
            },
            labels: {
              align: "center",
              style: {
                colors: "red"
              }
            },

            tooltip: {
              enabled: false
            }
          }
        ,
        tooltip: {
          show: false,
          fontFamily: "almoni",
          shared: true,
          fixed: {
            enabled: true,
            position: "topLeft", // bottomRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60,
            fontFamily: "almoni"
          }
        },
        grid: {
          borderColor: "#979797"
        },
        legend: {
          itemMargin: {
            horizontal: 30,
            vertical: 10
          },
          show: true,
          showForSingleSeries: true,
          onItemClick: {
          toggleDataSeries: true
      },
          
          horizontalAlign: "left",
          offsetX: 40,
          fontFamily: "almoni"
        }
      }
    };
  },

  created() {
    this.tick();
    this.chartOptions.yaxis.labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
    this.chartOptions.xaxis.labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
  },

  methods: {
    tick() {
      this.$myApi(
          "data?dsname=dailyLoad&isDrill=true"
        )
        .then(response => {
          console.log("Rasrsarsa", response["data"][0]);
          var tmpSeries = [],
            secTmpSeries = [];
          // console.log(response)
          for (var val in response["data"][0]) {
            tmpSeries[val] = [];
            tmpSeries[val][0] = Date.parse(
              response["data"][0][val].hour
            );
            tmpSeries[val][1] = response["data"][0][val].forecast;

            secTmpSeries[val] = [];
            secTmpSeries[val][0] = Date.parse(
              response["data"][0][val].hour
            );
            secTmpSeries[val][1] = response["data"][0][val].mw;
          }
          this.line1values = tmpSeries;
          this.line1name = this.names["forecast"];

          this.line2values = secTmpSeries;
          this.line2name = this.names["mw"];
          this.series = [
            {
              name: this.line2name,
              type: "area",
              data: this.line2values
            },
            {
              name: this.line1name,
              type: "line",
              data: this.line1values
            }
          ];
          this.chartOptions = {
            ...this.chartOptions,
            ...{
              //                  fill: {
              //   type: 'gradient',
              //   gradient: {
              //     // shadeIntensity: 1,
              //     // opacityFrom: 0.7,
              //     // opacityTo: 0.9,
              //     stops: [0, 100]
              //   }
              // },
            }
          };
          // console.log(this.series)
        });
      this.show = true;
      this.doneFetching = true;
    }
  }
};
</script>



<style scoped>
.chartsHeaders {
  display: flex;
  align-self: center;
  height: 100%;
  font-family: almoni-bold;
  margin-right: 2%;
  font-size: 22px;
  color: #f67200;
  direction: rtl;
}

.areaTitle {
  margin-left: auto;
  font-size: 130%;
  font-weight: bold;
  font-family: almoni;
  padding: 0 10px 10px 10px;
  margin-right: 2%;
  height: 20px;
}

::v-deep .apexcharts-zoomin-icon,
::v-deep .apexcharts-zoomout-icon,
::v-deep .apexcharts-zoom-icon,
::v-deep .apexcharts-pan-icon {
  margin-bottom: 15px;
}

::v-deep .apexcharts-legend-series:nth-child(1) {
  margin-left: -10px !important;
}
::v-deep .apexcharts-legend-series:nth-child(2) {
  margin-right: 32px !important;
}
::v-deep .apexcharts-legend-text {
  margin-right: 5px !important;
  place-content: end !important;
  color: v-bind('getCurrentTheme.cyber_status.box_color_1') !important;
}
::v-deep .apexcharts-legend {
  /* margin-right:-15px!important ; */
  inset: auto -10px -4px 60px !important;
  place-content: start !important;
  direction: rtl !important;
}

::v-deep .apexcharts-tooltip {
    color: #000000;
  }

::v-deep .apexcharts-canvas{
  margin: auto;
}



::v-deep .apexcharts-legend-text{
  top: 5.5px !important;
  
  padding-left: 130px !important;
  padding-top: 10px;
  padding-bottom: 10px;
}
::v-deep .apexcharts-legend-marker{
  top: 8px !important;
  padding-right: 10px !important;
 
}
::v-deep .apexcharts-legend-series{
    margin: 0px !important;
    margin-top: 10px !important;
    text-align: -webkit-center;
    height: 36px;
    min-width: 64px;
    padding: 0 16px;
    background-color: v-bind('getCurrentTheme.baseGenericPie.btn_color');
    padding-right: 8px;
    font-family: almoni;
    /* margin: auto !important; */
    margin-bottom: 10px !important;
    justify-content: right;
    overflow: hidden;
    width: 102px !important;
    /* text-align: -webkit-right; */
    box-shadow: 0px 0px !important;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.87);
    align-items: center;
    border-radius: 6px !important;
    display: inline-flex;
    flex: 0 0 auto;
    font-weight: 500;
    letter-spacing: 0.0892857143em;
    justify-content: center;
    outline: 0;
    position: relative;
    text-decoration: none;
    text-indent: 0.0892857143em;
    text-transform: uppercase;
    transition-duration: 0.28s;
    transition-property: box-shadow, transform, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    cursor: pointer;
}
</style>

