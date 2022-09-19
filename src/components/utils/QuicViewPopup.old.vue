<template>
    <div
      dir="ltr"
      class="container"
      :style="'background-color:' + getTheme.mainColor"
    >
      <v-row
        class=""
        style="text-align: center; margin-top: 5px; margin-bottom: 5px"
      >
        <v-col cols="4" style="text-align: left;padding-top:0;padding:bottom:0;"
          ><v-icon
            class=""
            dir=""
            @click="closeFavoritePopup"
            :color="getTheme.labelsColors.mainLabelColor"
            style="font-size: 30px"
            >mdi-close</v-icon
          ></v-col
        >
        <v-col cols="4" style="padding-top:0;padding:bottom:0;"
          ><span
            :style="
              'font-family:almoni-medium; font-size:24px;color:' +
              getTheme.labelsColors.mainLabelColor
            "
            >מבט מהיר</span
          ></v-col
        >
        <v-col cols="4" style="padding-top:0;padding:bottom:0;"></v-col>
      </v-row>
      <div class="componentContent">
        <!-- {{ Object.values(selectedQuickView)[0].props }} -->
        <component
          :is="Object.values(selectedQuickView)[0].component_name"
          :prop="Object.values(selectedQuickView)[0].props"
        ></component>
      </div>
      <removeBookmarkPopupFromQuickViewPopup />
    </div>
  </template>
  
  <script>
  import StopClients from "../routers/ceo/stopClients.vue";
  import Forecast from "../routers/ceo/forecast.vue";

  export default {
    data() {
      return {};
    },
    components: {
      StopClients,
      Forecast,
      FuelProduction,
      Faults,
      KpiNetworkServices,
      LogisticResourcesByDistrict,
      removeBookmarkPopupFromQuickViewPopup,
      ItItoc,
      cyberStatus,
      kpiCeoNewVue,
      KpiHamalNew,
      remoteUsers,
      HumanResources,
      humanResourcesNew,
      topThirthysix,
      testGenericComponent
    },
    computed: {
      selectedQuickView() {
        console.log(this.$store.state.selectedQuickView)
        return this.$store.state.selectedQuickView;
      },
      // getProps(){
      //     // var compProps = {},
  
      // },
      
    },
    methods: {
      closeFavoritePopup() {
        this.$store.state.openQuickViewPopup = false;
        this.$store.state.itoc = "";
        this.$root.$emit("ItItoc", false, 0);
      },
    },
    created() {},
  };
  </script>
  
  <style scoped>
  .container {
    visibility: visible;
    display: inline-block;
    width: 100%;
    height: auto;
    position: absolute;
    top: 0px;
    z-index: 100;
    /* overflow-x: clip; */
    /* background-color: #F4F4F4; */
    -webkit-animation: fadeIn 0.15s;
    animation: fadeIn 0.15s;
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  .componentContent {
    /* overflow: auto; */
    display: grid;
  }
  
  .close-darkTheme {
    color: white;
  }
  .close-lightTheme {
    color: black;
  }
  </style>