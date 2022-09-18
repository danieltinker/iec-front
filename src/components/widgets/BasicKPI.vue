    <template>
        <div v-if="doneFetching">
            <div class="clock-main" style="text-align: center;">
                <v-radio-group  v-model="params.selected_category" row id="districtRadioGroup" v-if="!isDrillDown && params.data_category.length >= 2">
                        <v-radio v-for="(category) in params.data_category" :key="category" :label="category" :value="category" color="#935287"></v-radio>
                </v-radio-group>
                <span id="chartsHeaders" >
                    {{ params.chartTitle }}
                </span>
                
                <div class="KPIcontainer" dir="rtl">
                    <div 
                    v-for="(item,index) in isDrillDown? drilldownData[0][params.drill_down_params.selected_category] : jsonData[0][params.selected_category]" 
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

                
                <div class="clock-drilldown" v-if="params.expand && !isDrillDown && params.drill_down_params">
                    <h1 class="drilldown-title">{{params.drill_down_params.headline_config.title}}</h1>

                    <v-radio-group v-model="params.drill_down_params.selected_category" row id="districtRadioGroup" v-if="params.data_category.length >= 2">
                        <v-radio v-for="(categorydrill) in params.drill_down_params.data_category" :key="categorydrill" :label="categorydrill" :value="categorydrill" color="#935287"></v-radio>
                     </v-radio-group>

                    <component 
                    :is="params.drill_down_params.template_type"
                    :params = params
                    :isDrillDown="true">
                    </component>   
            </div>
        </div>  
    </div>
    </template>
    
    <script>
    import ThreeDotsNineDots from '../utils/ThreeDotsNineDots.vue'
    import axios from 'axios';

    export default {
        // name:"basicKPI",
        components:{
            ThreeDotsNineDots,
            BasicKPI: () => import('../widgets/BasicKPI.vue'), 
            carouselKPI: () => import('../widgets/carouselKPI.vue') 
        },
        async created(){
            console.log(this.params)
            // Main
            await axios
        .get(`http://20.102.120.232:5080/shavit/mobile/data/${this.params.data_url}`,
        {params: { sid: "xxx" }}
        )
        .then(response => {
            console.log("good res",response)
            this.jsonData = response.data
    })
        .catch((error) => {
          console.log(error);
        });

        //  DrillDown

        await axios
        .get(`http://20.102.120.232:5080/shavit/mobile/data/${this.params.drill_down_params.data_url}`,
        {params: { sid: "xxx" }}
        )
        .then(response => {
            console.log("good res",response)
            this.drilldownData = response.data
    })
        .catch((error) => {
          console.log(error);
        });
        this.doneFetching = true

        },
        data(){
                return{
                    drilldownData:[],
                    jsonData:[],
                    doneFetching:false
           
                }
            },
        props:{
            isDrillDown:{type:Boolean},
            params:{type:Object,required:false}
        },
        methods:{
            buttonFoo(){
                if(this.params.click_open_drill_enabled){
                    this.params.expand =! this.params.expand
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
        padding-bottom: 20px;
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
    
  
    .drilldown-title{
        color:#606060;
        text-align: center;
    }



    </style>