<template>
  <div :style="'background-color:' + getCurrentTheme.cyber_status.color_1">
    <div v-if="isData">
      <div v-if="cyberStatusData.length !== 0">
      <div style="position: relative">
        <div>
          <customCyberStatus :dataCyber="this.cyberStatusData[0]" :subTitle="false" />
        </div>

        <p id="lastUpdate" style="text-align: center">
          {{ lastUpdateTime }} נכון לתאריך
        </p>
      </div>

      <div dir="rtl" v-if="params.expand" class="test"
        :style="'background-color:' + getCurrentTheme.cyber_status.color_2">
        <div class="arrows">
          <v-carousel :continuous="false" hide-delimiters :show-arrows="true" class="carousel-flex" ref="pieCarousel"
            v-model="carouselActiveIndex">
            <template v-if="showArrows" v-slot:next="{ on, attr }">
              <img v-on="on" v-bind="attr" src="../../../assets/playRight.svg" />
            </template>
            <template v-if="showArrows" v-slot:prev="{ on, attr }">
              <img v-on="on" v-bind="attr" src="../../../assets/playLeft.svg" />
            </template>
            <v-carousel-item :cycle="false" v-for="(cyberStatusData, index) in cyberStatusData
            .slice(1)
            .reverse()" :key="index">
              <customCyberStatus :dataCyber="cyberStatusData" :subTitle="true" />
            </v-carousel-item>
          </v-carousel>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="" style="margin-top:18px;margin-bottom:18px;height:110px">
                <NoDataMsg :isDrill="false" :templateType="'cyberStatus'"/>
            </div>
    </div>
    </div>

    <div class="loader" v-else>
      <div class="loader" v-if="!isErrorMsg">
        <v-progress-circular :size="20"
        :width="1" indeterminate :style="{ color: getCurrentTheme.global_theme_color }"></v-progress-circular>
      </div>
      <h1 style="color:black" v-else> {{ errorMSG }} </h1>
    </div>

  </div>
</template>
  
  
<script>
import NoDataMsg from "@/components/utils/NoDataMsg.vue";
import customCyberStatus from "../cyberStatus/customCyberStatus.vue";
export default {
  props: {
    params: { type: Object, required: false },
    view_ID: { type: Number },
  },
  methods: {
    async fetchData() {
      this.doneFetching = false
      await this.$myApi("tikshuv/metric/query/cyber/cyber_alert_status")
        .then((response) => {
          if (response.data.success) {
            this.cyberStatusData = response.data.data[0]["metrics_data"];
            this.lastUpdateTime = response.data.data[0]["last_update_timestamp"];
            this.isData = true;
          }
        })
        .catch((err) => {
          this.errorMSG = "אין מידע"
          console.log(err)
        });
      this.tick(this.params.sample_rate)
    },
    tick(time) {
      setTimeout(this.fetchData, time || 120000);
    },
  },
  watch: {
    'params.expand'() {
      if (this.isData) {
        this.carouselActiveIndex = 1;
      }
    },
  },
  mounted() {
    this.fetchData()
  },
  beforeDestroy() {
    clearTimeout(this.myTimeout)
  },
  computed: {
    isErrorMsg() {
      return this.errorMSG.length !== 0;
    }
  },
  components: {
    customCyberStatus,
    NoDataMsg
},
  data() {
    return {
      myTimeout:undefined,
      errorMSG: "",
      carouselActiveIndex: "",
      pieChartsData: ["1", "2"],
      totalChartTitle: "סייבר",
      id: "105-0",
      expand: false,
      cyberStatusData: [],
      showArrows: true,
      lastUpdateTime: "",
      snackbar: false,
      text: "",
      isData: false,
    };
  },
};
</script>
  
<style scoped>

.flex1 {
    flex: 1;
}


.cyber-status-highlight-container2 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-items: center;
    height: 6.615vh;
    /* margin: 0 3.7vw 0 -3.7vw; */
    
}

.cyber-status-highlight2 {
  text-align: center;
  line-height: 50px;
  margin: auto;
  margin-top: 8px;
  width: 180px;
  height: 48px;
  font-family: almoni;
  background-color: #1dc102;
    
}

.noItems {
    color: #ffffff;
    font-size: 2.5vh;
}
h1 {
  color: #0F2558;
  font-family: almoni-medium;
  font-size: 24px;
  text-align: center;
  margin-bottom: 0px;
}

#lastUpdate {
  padding-bottom: 2px;
  font-family: almoni;
  padding: 0px;
  margin: 0px;
}

.test {
  height: 550px;
}

.arrows :deep() .v-window__next {
  background-color: transparent !important;
  color: transparent !important;
  top: 58% !important;
}

.arrows :deep() .v-window__prev {
  background-color: transparent !important;
  color: transparent !important;
  top: 58% !important;
}

.arrows :deep() .v-icon__svg {
  display: none !important;
}

/* .pie-carousel :deep()  .carousel-flex .v-carousel__controls__item.v-btn {
    color: lightgrey !important;
  }
  
  .pie-carousel :deep()  .carousel-flex .v-carousel__controls__item.v-btn.v-btn--active {
    color: #f67200 !important;
  } */

.arrows :deep() .carousel-flex .v-carousel__controls__item.v-btn.v-btn--active:before {
  opacity: 0;
}

.center {
  margin: auto;
  width: 50%;
  padding: 10px;
}

.headlineDiv1 ul {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  text-align: center;
  padding-top: 10px;
}

.headlineDiv1 ul li {
  list-style: none;
  /* flex: 25 50 25%; */
}

.bookmaerkBtn:before {
  opacity: 0 !important;
}

.bookmaerkBtn :deep() .v-ripple__container {
  opacity: 0 !important;
}
</style>
  