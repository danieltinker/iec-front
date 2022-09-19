<template>
    <div v-if="doneFetching">
        <div class="clock-main" style="text-align: center;">
            <v-radio-group class="radio-btn"  v-model="params.selected_category" row id="districtRadioGroup" v-if="!isDrillDown && params.data_category.length >= 2">
                    <v-radio v-for="(category) in params.data_category" :key="category" :label="category" :value="category" color="#935287"></v-radio>
            </v-radio-group>

            <span id="chartsHeaders" >
                {{ params.chartTitle }}
            </span>
            
            <div class="kpi-carousel">
                <v-carousel
                  hide-delimiters
                  :show-arrows="true"
                  class="carousel-flex"
                  ref="pieCarousel"
                  :value="carouselIndex"
                  v-model="carouselActiveIndex"
                  height=auto
                >
                <template v-if="showArrows" v-slot:next="{ on, attr }">
                   <img v-on="on" v-bind="attr" src="../../assets/playRight.svg" />
                </template>
                <template v-if="showArrows" v-slot:prev="{ on, attr }">
                   <img v-on="on" v-bind="attr" src="../../assets/playLeft.svg" />
                </template>

                   <v-carousel-item v-for="(KPIarr,index) in jsonData[0][params.selected_category]" :key="index">
                    <div class="KPIcontainer" dir="rtl">
                    <div 
                       v-for="(item,index) in isDrillDown? KPIarr :KPIarr" 
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
                   </v-carousel-item>
                </v-carousel>

            </div>

            
            <div class="clock-drilldown" v-if="params.expand && !isDrillDown && params.drill_down_params">
                <h1 class="drilldown-title">{{params.drill_down_params.headline_config.title}}</h1>

                <v-radio-group class="radio-btn"  v-model="params.drill_down_params.selected_category" row id="districtRadioGroup" v-if="params.data_category.length >= 2">
                    <v-radio class="radio-btn" v-for="(categorydrill) in params.drill_down_params.data_category" :key="categorydrill" :label="categorydrill" :value="categorydrill" color="#935287"></v-radio>
                 </v-radio-group>

                <component 
                :is="params.drill_down_params.template_type"
                :params = params
                :isDrillDown="true"
                :drillDataProp="drilldownData">
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
        carouselKPI: () => import('../widgets/carouselKPI.vue') // handle self import
    },
    props:{
        isDrillDown:{type:Boolean},
        params:{type:Object,required:false},
        drillDataProp:{type:Array, default:()=>[]}
    },
    async created(){
        
        if(!this.isDrillDown){
            await axios.get(`http://20.102.120.232:5080/shavit/mobile/data/${this.params.data_url}`,{params: { sid: "xxx" }})
                        .then(response => {
                            this.jsonData = response.data
                        })
                        .catch((error) => {
                        console.log(error);
                        });
            await axios.get(`http://20.102.120.232:5080/shavit/mobile/data/${this.params.drill_down_params.data_url}`,{params: { sid: "xxx" }})
                        .then(response => {
                            this.drilldownData = response.data
                        })
                        .catch((error) => {
                        console.log(error);
                        });
        }
        else{
            this.jsonData = this.drillDataProp
        }
        this.doneFetching = true

        },
    data(){
            return{
                carouselActiveIndex:0,
                carouselIndex:0,
                showArrows:true,
                drilldownData:[],
                jsonData:[],
                doneFetching:false
       
            }
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
.carousel-flex {
  display: flex;
  flex-direction: column;
}

.carousel-flex >>> .v-window__next {
  background-color: transparent !important;
  color: transparent !important;
  top: 40% !important;
}
.carousel-flex >>> .v-window__prev {
  background-color: transparent !important;
  color: transparent !important;
  top:40% !important;
}
.radio-btn{
    display: inline-block !important;;

}
/* .pie-carousel >>> .carousel-flex .v-carousel__controls__item.v-btn {
  color: lightgrey !important;
}

.pie-carousel >>> .carousel-flex .v-carousel__controls__item.v-btn.v-btn--active {
  color: #f67200 !important;
} */
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  }

</style>