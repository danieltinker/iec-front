    <template>
        <div>


            <div class="clock-main" style="text-align: center;">
                <div class="headline-toolbar" v-if="!isDrillDown">
                        <ThreeDotsNineDots :isExpand="params.expand" @switch-expand="expand = !expand" />
                        <h1 class="headline-title">{{params.headline_config.title}}</h1>
                        <v-icon color="#935287" style="font-size: 30px">{{ getbookmarkIcon }}</v-icon>
                </div>
        
                <span id="chartsHeaders" >
                    {{ params.chartTitle }}
                </span>

                <div class="KPIcontainer" dir="rtl">
                    <div 
                    v-for="(item,index) in params.jsonData" 
                    :key="index" class="kpi-box" 
                    :style="{backgroundColor: isDrillDown? '#FFFFFF' :'#EBEBEB'}"
                    @click="buttonFoo">
                        <span class="kpi-label">
                            {{ item.label }}
                        </span>
                        <br>
                        <span class="kpi-sub-labels">
                            {{ item.value }}
                        </span>
                    </div>
                </div>
                
                <div class="clock-drilldown" v-if="expand && !isDrillDown">
                    <h1 class="drilldown-title">{{params.drillDownHeadline}}</h1>
                    <component 
                    :is="params.drill_down_template_type"
                    :params = params
                    :isDrillDown="true">
                    </component>   
            </div>
            
        </div>  
    </div>
    </template>
    
    <script>
    import ThreeDotsNineDots from '../utils/ThreeDotsNineDots.vue'

    export default {
        // name:"basicKPI",
        components:{
            ThreeDotsNineDots,
            BasicKPI: () => import('../widgets/BasicKPI.vue') // handle self import
        },
        data(){
                return{
                    expand:false    
                }
            },
        props:{
            isDrillDown:{type:Boolean},
            params:{type:Object,required:false}
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
        methods:{
            buttonFoo(){
                if(this.params.clickableKPIEnabled){
                    this.expand =! this.expand
                }
            }
        }
    }
    </script>
    
    <style scoped>
    .KPIcontainer{
        display: grid;
        grid-template-columns: auto auto;
        row-gap: 10px;
        column-gap: 10px;
        justify-content: center;
    }
    .kpi-box{
        padding-top: 10px;
        text-align: center;
        align-items: center;
        width: 165px;
        height: 80px;
        border-radius: 4px;
    }
    .kpi-box span:first-child{
        font-family: almoni;
      font-size: 20px;
      line-height: 30px;
    }
    
    .kpi-box span{
        display: inline-block;
        font-size: 20px;
        font-family: almoni-demibold;
        color: #a8699d;
    }
    #chartsHeaders {
      font-family: almoni;
      font-size: 18px;
      color: #606060;
      /* margin-bottom: 18px; */
    }

    .clock-drilldown{
        background-color: #E5E5E5;
        padding-bottom: 20px;
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



    </style>