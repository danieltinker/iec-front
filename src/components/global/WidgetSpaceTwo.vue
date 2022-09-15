<template>
    <div>
        <div class="widgets" v-for="(widget,index) in responseData" :key="index">
            <component 
                :is="widget.template_type"
                :params="widget.params"
                :isDrillDown="false"> 
            </component>
            <div class="clock-spacing"></div>
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
        created(){
                //  listen to store HQ,Category
                //  fetch the server response GET /mobile/views/{hq_id}/{category_id}?sessoinid=xxx .
                //  pass data uri into the components for the fetch
        },
        data(){
                return{
                        doneFetching:false,
                        responseData:[
                            ///// ////////////  BASIC KPI //// ///////////////////
                            {   
                                view_ID:"103",
                                division:"800",
                                category:"1",
                                template_type:"BasicKPI",
                                fav_icon:"kpi-icon",
                                view_order:1,
                                
                                params:{
                                    showMainClock:true,
                                    headline_config:{
                                        threeDotsEnabled:true,
                                        bookmarkEnabled:true,
                                        title:"STOP CLIENTS OR SOMTHING",
                                    },

                                    data_category:[],
                                    selected_category:null,
                                    chartTitle:"My first KPI",

                                    //fetch and build per component the jsonDATA and the jsonDataDrillDown
                                    data_url:"/myKPI",
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
                                DrillDownEnabled:true,
                                drill_down_data_url:"/myDrillKpi",
                                drill_down_template_type:"BasicKPI",
                                drillDownHeadline:"drill headline :)",
                            },
                        },
                        ///// ////////////  BASIC KPI  2 //// ///////////////////
                    ///// ////////////  BASIC Pie //// ///////////////////
                    ]
                }
            }
        }
</script>


<style scoped>
     .clock-spacing{
        height: 10px;
        background-color: #E5E5E5;
    }
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

    
   
</style>