<template>
    <div>
        <div class="widgets" v-for="(widget,index) in responseData" :key="index">
            <div class="clock-main">
                <div class="headline-toolbar">
                    <ThreeDotsNineDots :isExpand="widget.params.expand" @switch-expand="widget.params.expand = !widget.params.expand" v-if="widget.doesHaveDrillDown" />
                    <h1 class="headline-title">{{widget.headline}}</h1>
                    <v-icon color="#935287" style="font-size: 30px">{{ getbookmarkIcon }}</v-icon>
                </div>
                
                <component 
                    :is="widget.template_id"
                    :chartTitle = widget.params.chartTitle
                    :chartData = widget.params.jsonData
                    :config="widget.params"
                    :isDrillDown="false"> 
                </component>
            </div>

            <div class="clock-spacing"></div>
            <div class="clock-drilldown" v-if="widget.params.expand && widget.doesHaveDrillDown">
                <h1 class="drilldown-title">{{widget.drillDownHeadline}}</h1>
                <component 
                    :is="widget.drill_down_template_id"
                    :chartTitle = widget.params.drillDownHeadline
                    :chartData = widget.drill_down_params.jsonData
                    :config="widget.params.config" 
                    :isDrillDown="true">
                 </component>   
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import BasicKPI from '../widgets/BasicKPI.vue';
import ThreeDotsNineDots from '../utils/ThreeDotsNineDots.vue';
import BasicPie from '../widgets/BasicPie.vue';
        export default{
            components:{
            BasicKPI,
            ThreeDotsNineDots,
            BasicPie
        },
        computed:{
            getbookmarkIcon() {
                if (true) {
                    return "mdi-bookmark";
                } else {
                    return "mdi-bookmark-outline";
                }
            }
        },
        data(){
                return{
                        responseData:[
                            ///// ////////////  BASIC KPI //// ///////////////////
                            {   doesHaveDrillDown:true,
                                view_ID:"103",
                                division:"800",
                                category:"1",
                                headline:"STOP CLIENTS OR SOMTHING",
                                drillDownHeadline:"drill :)",
                                template_id:"BasicKPI",
                                drill_down_template_id:"BasicKPI",
                                data_url:"/myKPI",
                                fav_icon:"kpi-icon",
                                view_order:1,
                                id:"777-0",
                                params:{
                                    jsonData:[{
                                        "label":"michal",
                                        "value":0,
                                        },
                                        {
                                        "label":"ran",
                                        "value":2,
                                        },
                                        {
                                        "label":"daniel",
                                        "value":1,
                                        }
                                    ],
                                    data_category:[],
                                    selected_category:null,
                                    chartTitle:"My first KPI",
                                    expand:false,
                                    showMainClock:true,
                                    doneFetchingData:false,
                                },
                                
                                drill_down_params:{
                                    jsonData:[{
                                        "label":"dddd",
                                        "value":770,
                                        },
                                        {
                                        "label":"fff",
                                        "value":2223,
                                        },
                                        {
                                        "label":"zzz",
                                        "value":123,
                                        }
                                    ],
                                }
                            },

                            ///// ////////////  BASIC KPI  2 //// ///////////////////
                            {   doesHaveDrillDown:true,
                                view_ID:"103",
                                division:"800",
                                category:"1",
                                headline:"MY hELLo KPI",
                                drillDownHeadline:"drill 2 :)",
                                template_id:"BasicPie",
                                drill_down_template_id:"BasicKPI",
                                data_url:"/myKPI",
                                fav_icon:"kpi-icon",
                                view_order:1,
                                params:{

                                    jsonData:{
                                        "T3":122,
                                        "T6":14,
                                        "T9":16,
                                        }
                                    ,

                                singleDistrictJson:{},
                                config:{
                                    pieInnerText:"<1כללי>",
                                    pieInnerNum:null,
                                    listIds:[],
                                    labelsDict:{
                                    "T3":"3 שעות",
                                    "T6":"6 שעות",
                                    "T9":"9 שעות",
    
                                },
                                backgroundColor: [
                                    "#00C853",
                                    "#F7931E",
                                    "#FFC107",
                                    ],
                                },

                                data_category:[],
                                selected_category:null,
                                chartTitle:"My first PieChart",
                                expand:false,
                                showMainClock:true,
                                doneFetchingData:false,
                                },
                                drill_down_params:{
                                    jsonData:[{
                                        "label":"23232",
                                        "value":770,
                                        },
                                        {
                                        "label":"1231231",
                                        "value":2223,
                                        },
                                        {
                                        "label":"12312321",
                                        "value":123,
                                        }
                                    ],
                                }
                            },
                            ///// ////////////  BASIC Pie //// ///////////////////
                            {   doesHaveDrillDown:false,
                                view_ID:"103",
                                division:"800",
                                category:"1",
                                headline:"STOP CLIENTS",
                                template_id:"BasicPie",
                                drillDownHeadline:null,
                                drill_down_template_id:null,
                                data_url:"/myPie",
                                fav_icon:"pie-icon",
                                view_order:1,
                                id:"777-0",
                                params:{

                                    jsonData:{
                                        "T3":122,
                                        "T6":14,
                                        "T9":16,
                                        }
                                    ,

                                singleDistrictJson:{},
                                config:{
                                    pieInnerText:"<1כללי>",
                                    pieInnerNum:null,
                                    listIds:[],
                                    labelsDict:{
                                    "T3":"3 שעות",
                                    "T6":"6 שעות",
                                    "T9":"9 שעות",
    
                                },
                                backgroundColor: [
                                    "#00C853",
                                    "#F7931E",
                                    "#FFC107",
                                    ],
                                },

                                data_category:[],
                                selected_category:null,
                                chartTitle:"My first PieChart",
                                expand:false,
                                showMainClock:true,
                                doneFetchingData:false,
                                }
                            }
                        ]
                }
            }
        }
</script>


<style scoped>
    .widgets{
        background-color: white;
    }
  
    .headline-toolbar{
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        text-align: center;
        padding-top: 10px;
    }
    
    .headline-title{
        color: #935287;
        font-family: almoni-medium;
        font-size: 22px;
        text-align: center;
        width: 240px;
    }
    .drilldown-title{
        color:#606060;
        text-align: center;
    }


    .dots{
        border:1px solid #935287
    }

    .clock-main {
        /* height: 420px; */
        padding-bottom: 20px;
    }
    .clock-drilldown{
        background-color: #E5E5E5;
        padding-bottom: 20px;
    }
    .clock-spacing{
        height: 10px;
        background-color: #E5E5E5;
    }
</style>