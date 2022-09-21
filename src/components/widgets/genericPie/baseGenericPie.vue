<template>
    <div style="position: relative">
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
                  :style="{backgroundColor: isDrillDown? '#FFFFFF' :'#EBEBEB'}">
                    <span
                    class="dot"
                    :style="{backgroundColor:TemplateData.datasets[0].backgroundColor[index]}"></span>    
                    <span >
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
      this.TemplateData = baseTemplate(this.chartData,this.configData.pieInnerText,this.configData.pieInnerNum)
    }
    
  },
  created(){
    if(Object.keys(this.chartData).length !== 0){
      //make template base on helpers function
      this.TemplateData = baseTemplate(this.chartData,this.configData.pieInnerText,this.configData.pieInnerNum)
    }
  },
  components: {
    genericPieChart
  },
  props: {
    chartData: { type: Array, required: false },
  },
  data(){
        return{
          chartTitle:"test",
          isDrillDown:false,
          configData:{ "pieInnerText": "<1כללי>", "pieInnerNum": null, "listIds": []},
          ////////////////////
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
    }),
  
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