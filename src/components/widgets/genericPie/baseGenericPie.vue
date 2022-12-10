<template>
    <div style="position: relative">
        <genericPieChart 
        ref="dount"
        :data="TemplateData"
        :options="chartOptions"
        :width = "$pieSize"
        :height = "$pieSize"
        @clickIndex="myActiveIndex()"
        @intersection = "emitHandler"
        />
        <div class="btn-container">
            <v-row dir="rtl" style="place-content:right;display: inline-flex;">
                <v-btn class="main-btn"
                :ripple="false"
                 v-for="(btnName,index) in buttons" :key="index"
                  @click="$refs.dount.onClickLegend(index);"
                  :style="{backgroundColor: isDrill ? getCurrentTheme.baseGenericPie.btn_color_drill : getCurrentTheme.baseGenericPie.btn_color ,border : activeIm == index ? getCurrentTheme.legend_border_color : ' solid black 0px'}">
                    <span
                    class="dot"
                    :style="{backgroundColor:TemplateData.datasets[0].backgroundColor[index]}"></span>    
                    <span class="btn-span" :style="'color:' + getCurrentTheme.baseGenericPie.span_color">
                        {{btnName}}
                    </span>
                  </v-btn>    
            </v-row>
        </div>
    </div>
</template>

<script>
    import genericPieChart from './genericPieChart'
    import {baseTemplate} from '../../../helpers/pieChartHelpers'
    import { mapState } from "vuex";
export default {
  watch:{
    chartData(){
      this.TemplateData = baseTemplate(this.chartData,this.configData.pieInnerText,this.configData.pieInnerNum,this.isPrecentage,this.isNumber)
    }
    
  },
  created(){
    if(Object.keys(this.chartData).length !== 0){
      //make template base on helpers function
      this.TemplateData = baseTemplate(this.chartData,this.configData.pieInnerText,this.configData.pieInnerNum,this.isPrecentage,this.isNumber)
    }
  },
  components: {
    genericPieChart
  },
  props: {
    chartData: { type: Array, required: false },
    isDrill:{type:Boolean},
    isPrecentage:{type:Boolean},
    isNumber:{type:Boolean}
  },
  data(){
        return{
          TemplateData:undefined,
          activeIndex:undefined,
          chartTitle:"test",
          isDrillDown:false,
          configData:{ "pieInnerText": "כללי", "pieInnerNum": null, "listIds": []},
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
    ...mapState({
      sessionId: (state) => state.loginStore.currUserData.sessionId,
      userID: (state) => state.loginStore.currUserData.userid,
      currUserData: (state) => state.loginStore.currUserData,
      activeIm(){
        return this.activeIndex
      }
    }),
  
  },
  methods:{
    emitHandler(indexClick){
      console.log("emitHnadler",indexClick)
      this.$emit('handleIntersection',indexClick)
    },
    myActiveIndex(){
      this.activeIndex = this.$refs.dount.getSelected()
    }
  }
}
</script>

<style>
   .btn-container{
    margin-left:4%;
    margin-right:4%;
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
    .main-btn{
        font-family: almoni;
        margin:8px;
        justify-content: right;
        overflow: hidden;
        border-radius: 6px;
        width: 102px !important;
        /* text-align: -webkit-right;
         */
        box-shadow:0px 0px !important;
    }
  .main-btn::before {
    display:none;
  }

  .btn-span{
        text-overflow: ellipsis;
        overflow: hidden; 
        width: 68px; 
        white-space: nowrap;
        font-size: 16px;
        letter-spacing: 0;
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

</style>