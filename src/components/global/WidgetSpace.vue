<template>
    <div >
        <div class="widgets" v-for="(widget,index) in responseData" :key="index">
            <component :is="widget.template_id"
            :CompConfig="widget.params"> </component>
        </div>
    </div>

</template>

<script lang="ts">
import BasicKPI from '../widgets/BasicKPI.vue';
        export default{
            components:{
                BasicKPI
            },
            data(){
                return{
                        responseData:[
                            {
                                view_ID:"103",
                                division:"800",
                                category:"1",
                                template_id:"BasicKPI",
                                data_url:"/myKPI",
                                fav_icon:"kpi-icon",
                                view_order:1,
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
                                    id:"777-0",
                                    chartTitle:"<chart title>",
                                    isExpand:false,
                                    showMainClock:true,
                                    doneFetchingData:false,
                                }
                            },
                            {
                                view_ID:"103",
                                division:"800",
                                category:"1",
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
                                    isExpand:false,
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

</style>