<template>
    <div>
        <div class="clock-main" style="text-align: center;" v-if="doneFetching">
            <v-radio-group  v-model="params.selected_category" row id="districtRadioGroup" v-if="!isDrillDown && params.data_category.length >= 2">
                    <v-radio v-for="(category) in params.data_category" :key="category" :label="category" :value="category" color="#935287"></v-radio>
            </v-radio-group>

            
            <span id="chartsHeaders"  v-if="isBasic">
                {{isDrillDown? params.drill_down_params.chart_titles[0]:params.chart_titles[0] }}
            </span>
            <div class="KPIcontainer" dir="rtl" v-if="isBasic">
                <div 
                v-for="(item,index) in jsonData[0][params.selected_category]" 
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

            <div class="kpi-carousel" v-if="isCarousel">
                <span id="chartsHeaders" >
                     {{ params.chart_titles[carouselActiveIndex] }}
                </span>
 
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
                <v-radio-group v-model="params.drill_down_params.selected_category" row id="districtRadioGroup" v-if="params.data_category.length >= 2">
                    <v-radio v-for="(categorydrill) in params.drill_down_params.data_category" :key="categorydrill" :label="categorydrill" :value="categorydrill" color="#935287"></v-radio>
                 </v-radio-group>

                <component 
                :is="params.drill_down_params.template_type"
                :params = params
                :isDrillDown="true"
                :drillDataProp="drilldownData">
                </component>   
        </div>
    </div>  

    <div class="loader" v-else>
        <v-progress-circular
        indeterminate
        color="purple"
        ></v-progress-circular>
    </div>
</div>
</template>

<script>
import ThreeDotsNineDots from '../utils/ThreeDotsNineDots.vue'
import axios from 'axios';

export default {
    // name:"basicKPI",
    props:{
        isDrillDown:{type:Boolean},
        params:{type:Object,required:false},
        drillDataProp:{type:Array, default:()=>[]}
    },
    components:{
        ThreeDotsNineDots,
        BasicKPI: () => import('../widgets/BasicKPI.vue'), 
        carouselKPI: () => import('../widgets/carouselKPI.vue'),
        genericKPI: () => import('../widgets/genericKPI.vue')
    },
    data(){
            return{
                carouselActiveIndex:0,
                carouselIndex:0,
                showArrows:true,
                drilldownData:[],
                jsonData:[],
                doneFetching:false,
                isBasic:true,
                isCarousel:false,
            }
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
        if(Array.isArray(this.jsonData[0][this.params.selected_category][0])){
            this.isCarousel = true
            this.isBasic = false
        }
        else{
            this.isCarousel = false
            this.isBasic=true
        }
        this.doneFetching = true

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

.loader{
    height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
}
.v-progress-circular{
    padding:40px;
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

.clock-drilldown{
    background-color: #E5E5E5;
    padding-bottom: 20px;
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