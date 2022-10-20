<template>
  <div class="metricBorder">
    <!-- <span class="chartsHeaders">{{ title }}</span> -->
    <div dir="rtl">
      <ApexCharts
        v-show="show"
        style="overflow-y: hidden; margin-right: 7px"
        ref="chart"
        type="line"
        height="250px"
        width="100%"
        :options="chartOptions"
        :series="series"
      ></ApexCharts>
    </div>
  </div>
  <!-- <div></div> -->
</template>


<script>
import axios from "axios";
import { mapState } from "vuex";
import ApexCharts from 'apexcharts'

export default {
  name: "line-chart-display",
  components:{
    ApexCharts
  },
  // Component Parameters
  props: {
    interval: { type: Number, default: 60000 },
    m_name1: { type: String, required: true },
    obj1: { type: String, required: true },
    m_name2: { type: String },
    obj2: { type: String },
    title: { type: String, default: "גרף" },
    maxValueDisplay: { type: Number, default: null },
    chartWidth: { type: String, default: "100%" },
    chartHeight: { type: String, default: "190" },
  },

  data() {
    return {
      show: false,
      chartData: [],
      intervalHandle: null,
      line1name: null,
      line1values: {},
      line2name: null,
      line2values: {},
      tabActive: true,
      series: [],
      chartOptions: {
        colors: ["#009245", "#8CC63F"],
        plotOptions: {
          bar: {
            columnWidth: "30%",
          },
        },
        chart: {
          height: "100%",
          width: "100%",
          type: "line",
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: false,
              reset: false,
            },
          },
          stacked: false,
          events: {
            beforeZoom: function (ctx) {
              // we need to clear the range as we only need it on the iniital load.
              ctx.w.config.xaxis.range = undefined;
            },
            beforeResetZoom: function (ctx) {
              // we need to clear the range as we only need it on the iniital load.
              ctx.w.config.xaxis.range = 14511464;
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: [3, 3],
        },
        xaxis: {
          range: 14511464,
          type: "datetime",
          labels: {
            formatter: function (value, timestamp) {
              const dateTimeFormat = new Intl.DateTimeFormat("en", {
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              });
              var [{ value: hour }, , { value: minute }] =
                dateTimeFormat.formatToParts(new Date(timestamp));
              if (hour == 24) hour = 0;
              return `${hour}:${minute}`;
              //return new Date(timestamp) // The formatter function overrides format property
            },
          },
        },
        yaxis: [],
        tooltip: {
          show: false,
          fontFamily: "almoni",
          shared: true,
          fixed: {
            enabled: true,
            position: "topLeft", // bottomRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60,
            fontFamily: "almoni",
          },
        },
        legend: {
          itemMargin: {
            horizontal: 30,
            vertical: 10,
          },
          show: true,
          showForSingleSeries: true,
          horizontalAlign: "left",
          offsetX: 40,
          fontFamily: "almoni",
        },
      },
    };
  },

  created() {
    this.tick();
  },

  computed: {
    // ...mapState({
    //   // sessionId: (state) => state.loginStore.currUserData.sessionId,
    // }),
  },

  methods: {
    tick() {
      axios
        .post(
          this.$store.state.serverUrl +
            "/shavit/metric/queryHistory/" +
            this.obj1 +
            "/" +
            this.m_name1,
          null,
          { params: { sid: this.sessionId } }
        )
        .then((response) => {
          var tmpSeries = [];
          for (var val in response["data"]["data"][0]["values"]) {
            tmpSeries[val] = [];
            tmpSeries[val][0] =
              response["data"]["data"][0]["values"][val].tstamp * 1000;
            tmpSeries[val][1] =
              response["data"]["data"][0]["values"][val].value;
          }
          this.line1values = tmpSeries;
          this.line1name = response["data"]["data"][0]["label"];
          if (this.m_name2) {
            axios
              .post(
                this.$store.state.serverUrl +
                  "/shavit/metric/queryHistory/" +
                  this.obj2 +
                  "/" +
                  this.m_name2,
                null,
                { params: { sid: this.sessionId } }
              )
              .then((response) => {
                var tmpSeries = [];
                for (var val in response["data"]["data"][0]["values"]) {
                  tmpSeries[val] = [];
                  tmpSeries[val][0] =
                    response["data"]["data"][0]["values"][val].tstamp * 1000;
                  tmpSeries[val][1] =
                    response["data"]["data"][0]["values"][val].value;
                }
                this.line2values = tmpSeries;
                this.line2name = response["data"]["data"][0]["label"];
                this.series = [
                  {
                    name: this.line1name,
                    type: "line",
                    data: this.line1values,
                  },
                  {
                    name: this.line2name,
                    type: "line",
                    data: this.line2values,
                  },
                ];
                this.chartOptions = {
                  ...this.chartOptions,
                  ...{
                    yaxis: [
                      {
                        seriesName: "A",
                        axisTicks: {
                          show: true,
                        },
                        axisBorder: {
                          show: true,
                          color: "#f67200",
                        },
                        labels: {
                          align: "center",
                          style: {
                            colors: "#f67200",
                          },
                        },

                        tooltip: {
                          enabled: true,
                        },
                      },
                      // ,
                      // {
                      //   seriesName: 'B',
                      //   opposite: true,
                      //   axisTicks: {
                      //     show: true,
                      //   },
                      //   axisBorder: {
                      //     show: true,
                      //     color: 'gray'
                      //   },
                      //   labels: {
                      //     align: 'center',
                      //     style: {
                      //       colors: 'gray',
                      //     }
                      //   }
                      // }
                    ],
                  },
                };
              });
          } else {
            this.series = [
              {
                name: this.line1name,
                type: "line",
                data: this.line1values,
              },
            ];

            this.chartOptions = {
              ...this.chartOptions,
              ...{
                yaxis: [
                  {
                    seriesName: "A",
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: "#f67200",
                    },
                    labels: {
                      align: "center",
                      style: {
                        colors: "#000000", //right change color
                      },
                    },

                    tooltip: {
                      enabled: false,
                    },
                  },
                ],
              },
            };
          }
        });
      this.show = true;
    },
  },
};
</script>



<style scoped>
/* .metricBorder {
  overflow: hidden;
  background-color: white;
  display: grid;
  border-radius: 20px;
  width: 105%;
  height: inherit;
  padding: 15px;
  margin: 10px;
} */

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

::v-deep .apexcharts-legend-text{
  /* background: #EBEBEB !important;  */
  margin: 10px;
  min-width: 110px !important;
  height: 40px !important;
  justify-content: right;
  border-radius: 6px;
}
</style>