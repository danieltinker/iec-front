<template>
    <div>
        <div class="clock-main" style="text-align: center;" v-if="doneFetching">
            <div class="flex-center">
            <v-radio-group  v-model="params.selected_category" row id="districtRadioGroup" v-if=" params.data_category.length >= 2">
                <v-radio v-for="(category) in params.data_category" :key="category" :label="category" :value="category" color="#935287"></v-radio>
            </v-radio-group>
        </div>

            <div class="kpi-carousel">
                <span id="chartsHeaders" >
                    {{ params.chart_titles[carouselActiveIndex] }}
                </span>

                <v-carousel
                  hide-delimiters
                  :show-arrows="showArrows"
                  class="carousel-flex"
                  ref="pieCarousel"
                  :value="carouselIndex"
                  v-model="carouselActiveIndex"
                  height=auto
                >
                    <template  v-slot:next="{ on, attr }">
                        <img v-on="on" v-bind="attr" src="../../assets/playRight.svg"/>
                    </template>
                    <template  v-slot:prev="{ on, attr }">
                        <img v-on="on" v-bind="attr" src="../../assets/playLeft.svg"/>
                    </template>

                    <v-carousel-item v-for="(BARarr,index) in jsonData[params.selected_category]" :key="index">
                        <div class="KPIcontainer" dir="rtl">
                            {{BARarr}}
                            <v-row dir="rtl"
                                style="margin-right: 2%; margin-bottom: 20px; place-content: center"
                            >
                            <OneBar v-for="(item,index) in BARarr" :key="index" :data="item"/>
                            </v-row>
                                <!-- <div 
                                class="kpi-box" 
                                v-for="(item,index) in KPIarr" :key="index"
                                :style="{backgroundColor: isDrillDown? '#FFFFFF' :'#EBEBEB'}"
                                @click="kpiBoxClick"
                                >
                                    <span class="kpi-label">
                                        {{ item.label }}
                                    </span>
                                    <br>
                                    <span class="kpi-sub-labels">
                                        {{ item.value }}
                                    </span>
                                </div> -->
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </div>

            <div class="clock-drilldown" v-if="params.expand && !isDrillDown && params.drill_down_params">
                <h1 class="drilldown-title">{{params.drill_down_params.headline_config.title}}</h1>
                <component 
                :is="params.drill_down_params.template_type"
                :params = params.drill_down_params
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
import OneBar from './genericBar/oneBar.vue';

export default {
    // name:"basicKPI",
    props:{
        isDrillDown:{type:Boolean},
        drillDataProp:{type:Object, default:()=>{}},
        /** */
        /** */
        /** */
        /** */
        /* {
            "show_main_clock": BOOLEAN,
	        "headline_config": {
                "three_dots_enabled": BOOLEAN,
                "bookmark_enabled": BOOLEAN,
                "title": STRING
	        },
            "click_open_drill_enabled": BOOLEAN,
            "data_category": STRING_ARR,
            "selected_category": STRING,
            "chart_titles": STRING_ARR,
            "data_url": /STRING,
            "expand": BOOLEAN,
            "drill_down_params": {
                "headline_config": {
                    "three_dots_enabled": BOOLEAN,
                    "bookmark_enabled": BOOLEAN,
                    "title": STRING
                },
                "data_category": STRING_ARR,
                "selected_category": STRING,
                "chart_titles": STRING_ARR,
                "data_url": /STRING,
                "template_type": STRING
            }
             } */
        params:{type:Object,required:false}
    },
    components:{
    ThreeDotsNineDots,
    genericKPI: () => import("../widgets/genericKPI.vue"),
    OneBar
},
    methods:{
        // click open the drill down from a label click if enabled = true in the config
        kpiBoxClick(){
            if(this.params.click_open_drill_enabled) this.params.expand =! this.params.expand;
        }
    },
    computed:{
        // hide the Carousel prev next btns if only one chart is avaliable.
        showArrows(){
            if (this.jsonData[this.params.selected_category].length>1) return true;
            else return false 
        }
    },
    data(){
            return{
                /* */
                carouselActiveIndex:0,
                /* */
                carouselIndex:0,
                /* */
                drilldownData:[],
                /* {cat1:[[basic kpi dictionary 1],[basic kpi dictionary 2],...], cat2:[...], ... }*/
                jsonData:[],
                /* */
                doneFetching:false,
                /* */
            }
    },
    async created(){
        /*  if not drill down get data for main and drill  */
        if(!this.isDrillDown){
            await axios.get(`http://20.102.120.232:5080/shavit/mobile/data/${this.params.data_url}`,{params: { sid: "xxx" }})
                        .then(response => {
                                this.jsonData = response.data
                            })
                        .catch((error) => {
                                console.log(error,"main DATA FETCH ERROR");
                            });
            
            await axios.get(`http://20.102.120.232:5080/shavit/mobile/data/${this.params.drill_down_params.data_url}`,{params: { sid: "xxx" }})
                        .then(response => {
                            this.drilldownData = response.data
                        })
                        .catch((error) => {
                        console.log(error,"drill DATA FETCH ERROR");
                        });
        }
        /*  if drill down get data from the prop  */
        else{
            this.jsonData = this.drillDataProp
        }
        //  flag used to render the charts syncronously only after data is ready
        this.doneFetching = true
    }
}
</script>

<style scoped>
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>