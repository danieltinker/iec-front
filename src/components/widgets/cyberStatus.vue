<template>
    <div
      :style="'background-color:' + getCurrentTheme.cyber_status.color_1"
      
    >
      <div v-if="isData">
        <div style="position: relative">
        <div>
          <customCyberStatus
            :dataCyber="this.cyberStatusData[0]"
            :subTitle="false"
          />
        </div>
  
        <p id="lastUpdate" style="text-align: center">
          {{ lastUpdateTime }} נכון לתאריך
        </p>
          </div>
        
        <div
          dir="rtl"
          v-if="params.expand"
          class="test"
          :style="'background-color:' + getCurrentTheme.cyber_status.color_2"
        >
          <div class="arrows">
            <v-carousel
              :continuous="false"
              hide-delimiters
              :show-arrows="true"
              class="carousel-flex"
              ref="pieCarousel"
              v-model="carouselActiveIndex"
            >
              <template v-if="showArrows" v-slot:next="{ on, attr }">
                <img v-on="on" v-bind="attr" src="../../assets/playRight.svg" />
              </template>
              <template v-if="showArrows" v-slot:prev="{ on, attr }">
                <img v-on="on" v-bind="attr" src="../../assets/playLeft.svg" />
              </template>
              <v-carousel-item
                :cycle="false"
                v-for="(cyberStatusData, index) in cyberStatusData
                  .slice(1)
                  .reverse()"
                :key="index"
              >
                <customCyberStatus
                  :dataCyber="cyberStatusData"
                  :subTitle="true"
                />
              </v-carousel-item>
            </v-carousel>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import customCyberStatus from "./cyberStatus/customCyberStatus.vue";
  import axios from "axios";
  
  export default {
    props: {
      params:{type:Object,required:false},
      view_ID:{type:Number},
    },
    watch: {
        'params.expand'() {
        if (this.isData) {
          this.carouselActiveIndex = 1;
        }
      },
    },
    async mounted() {
      await axios
    .post("http://localhost:5000/shavit/tikshuv/metric/query/cyber/cyber_alert_status?sid=518e6116-d1a2-49ee-bcca-90ad295cded6",{params: {
            sid: this.$store.state.currUser.sessionId
        }
        })
    .then((response) => {
        if (response.data.success) {
          // get the data
          this.cyberStatusData = response.data.data[0]["metrics_data"];
          this.lastUpdateTime = response.data.data[0]["last_update_timestamp"];
          this.isData = true;
        }
    })
    .catch((err) => console.log(err));
    },
    components: {
      customCyberStatus,
    },
    data() {
      return {
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
  h1 {
    color: #935287;
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
  .arrows >>> .v-window__next {
    background-color: transparent !important;
    color: transparent !important;
    top: 58% !important;
  }
  .arrows >>> .v-window__prev {
    background-color: transparent !important;
    color: transparent !important;
    top: 58% !important;
  }
  .arrows >>> .v-icon__svg {
    display: none !important;
  }
  
  /* .pie-carousel >>> .carousel-flex .v-carousel__controls__item.v-btn {
    color: lightgrey !important;
  }
  
  .pie-carousel >>> .carousel-flex .v-carousel__controls__item.v-btn.v-btn--active {
    color: #f67200 !important;
  } */
  
  .arrows
    >>> .carousel-flex
    .v-carousel__controls__item.v-btn.v-btn--active:before {
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
  
  .bookmaerkBtn >>> .v-ripple__container {
    opacity: 0 !important;
  }
  </style>
  