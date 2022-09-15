<template>
    <div style="position: relative">
        <v-row
      style="
        margin: 0px;
        direction: rtl;
        align-items: center;
        place-content: center;
      "
    >
      <v-btn
        class="bookmaerkBtn"
        color="#935287"
        text
        icon
        :ripple="false"
        @click="bookmarkBtn"
        v-if="id.endsWith('-0') == false"
      >
        <v-icon style="font-size: 30px">{{ getbookmarkIcon }}</v-icon>
      </v-btn>
      <span
        id="chartsHeaders"
        :style="'color:' + '#232323'"
        >{{ chartTitle }}</span
      >
    </v-row>
        <genericPieChart 
        ref="dount"
        :data="TemplateData"
        :options="chartOptions"
        :width = "$pieSize"
        :height = "$pieSize"
        />
        <div class="btn-container">
            <v-row dir="rtl" style="place-content:center">
                <v-btn class="btn"
                :ripple="false"
                 v-for="(btnName,index) in buttons" :key="index"
                  @click="$refs.dount.onClickLegend(index)"
                  :style="{backgroundColor: isDrillDown?'#232323' : '#666666'}">
                    <span
                    class="dot"
                    :style="{backgroundColor:TemplateData.datasets[0].backgroundColor[index]}"></span>    
                    <span :style="'color:' + '#232323'">
                        {{btnName}}
                    </span>
                  </v-btn>    
            </v-row>
        </div>
    </div>
</template>

<script>
    import genericPieChart from './genericPieChart.js'
    import {baseTemplate} from '../../helpers/pieChartHelpers'
export default {
    props: {
    chartTitle: { type: String, required: false, default: "" },
    chartData: { type: Object, required: false },
    id: { type: String, required: false, default: "777" },
    isDrillDown: {type:Boolean,default:false},
    config:{type: Object, required: false}
  },
  watch:{
    chartData(){
      this.TemplateData = baseTemplate(this.chartData,this.config.config.labelsDict,this.config.config.backgroundColor,this.config.config.pieInnerText,this.config.config.pieInnerNum)
    }
    
  },
  created(){
    console.log("heydudfe",this.config.pieInnerText)
    console.log("heydudfe",this.config.config)

    if(Object.keys(this.chartData).length !== 0){
      //make template base on helpers function
      this.TemplateData = baseTemplate(this.chartData,this.config.config.labelsDict,this.config.config.backgroundColor,this.config.config.pieInnerText,this.config.config.pieInnerNum)
    }
  },
  components: {
    genericPieChart
  },
 
  methods:{
    bookmarkBtn() {
      this.$root.$emit("bookmarkBtn", this.id, "pie");
    },
  },
  data(){
        return{
            buttons:[],
            myNewData:[],
            chartOptions:{}
        }
  },
  mounted(){
        // importing the pie chart labels to use as buttons
        this.buttons = this.$refs.dount.$data._chart.data.labels 
  },
  computed:{
    getbookmarkIcon() {
      if (true) {
        return "mdi-bookmark";
      } else {
        return "mdi-bookmark-outline";
      }
    },
  }
}
</script>

<style>
   .btn-container{
    padding-bottom: 20px;
   }
    .btn{
        margin:10px;
        justify-content: right;
        overflow: hidden;
        border-radius: 0.5rem;
        width: 110px !important;
        height: 40px !important;
        /* box-shadow:1px 1px !important; */
        box-shadow: 2px 2px 2px rgba(148, 148, 148, 0.427) !important;
    }

  .btn::before {
    display:none;
  }
    .dot{
        width: 10px;
        height: 10px;
        border-radius: 100%;
        margin-left: 2px;
    }

</style>