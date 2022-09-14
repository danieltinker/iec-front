<template>
    <div>
        <div class="widgets" v-for="(widget,index) in responseData" :key="index">
            <div class="clock-main">
                <div class="headline-toolbar">
                    <ThreeDotsNineDots :isExpand="widget.params.expand" @switch-expand="widget.params.expand = !widget.params.expand" />
                    <h1 class="headline-text">{{widget.headline}}</h1>
                    <p>icon</p>
                </div>

                <component 
                    :is="widget.template_id"
                    :CompConfig="widget.params"> 
                </component>
            </div>

            <div class="clock-drilldown" v-if="widget.params.expand">
                <component :is="widget.template_id"
                    :CompConfig="widget.params"> </component>   
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import BasicKPI from '../widgets/BasicKPI.vue';
import ThreeDotsNineDots from '../utils/ThreeDotsNineDots.vue';
        export default{
            components:{
            BasicKPI,
            ThreeDotsNineDots,
        },
            data(){
                return{
                        responseData:[
                            {
                                view_ID:"103",
                                division:"800",
                                category:"1",
                                headline:"STOP CLIENTS OR SOMTHING",
                                template_id:"BasicKPI",
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
                                }
                            },
                            {
                                view_ID:"103",
                                division:"800",
                                category:"1",
                                headline:"MY hELLo KPI",
                                template_id:"BasicKPI",
                                data_url:"/myKPI",
                                fav_icon:"kpi-icon",
                                view_order:1,
                                params:{
                                    jsonData:[{
                                        "label":"tamir",
                                        "value":100,
                                        },
                                        {
                                        "label":"almog",
                                        "value":500,
                                        },
                                    ],
                                    id:"777-0",
                                    chartTitle:"<chart title>",
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
    .headline-toolbar{
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        text-align: center;
        padding-top: 10px;
    }
    .headline-text{
        color: #935287;
        font-family: almoni-medium;
        font-size: 22px;
        text-align: center;
        width: 240px;
    }
    .dots{
        border:1px solid #935287
    }
</style>