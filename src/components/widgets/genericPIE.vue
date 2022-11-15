<!-- eslint-disable -->
<template>
    <div>
        <div class="clock-main" style="text-align: center;" v-if="doneFetching">
            <div class="flex-center">
                <v-radio-group dir="rtl" v-model="params.selected_category" row id="districtRadioGroup" v-if=" params.data_category.length >= 2">
                    <v-radio v-for="(category) in params.data_category" :key="category" :label="category" :value="category" color="#935287"></v-radio>
                </v-radio-group>
            </div>
            <div class="pie-carousel">
                <span>
                    <v-icon dir="rtl" @click="BookMarkClick(view_ID,parentsParam,params.template_type,true)" color="#935287" style="font-size: 30px"
                    v-if="isDrillDown && params.headline_config && params.headline_config.bookmark_enabled">{{
                            CheckBookmark(view_ID)
                            ? "mdi-bookmark"
                            : "mdi-bookmark-outline"
                    }}</v-icon>
                </span>


                 <span id="chartsHeaders" v-if="!isDrillDown">
                     {{ params.chart_titles[params.selected_category][carouselActiveIndex] }} 
                 </span>
                 <span id="chartsHeaders" v-if="isDrillDown && !params.data_intersection">
                     {{ static_drill_titles_prop["*"][params.selected_category][carouselActiveIndex] }} 
                 </span>
                 <span id="chartsHeaders" v-if="isDrillDown && params.data_intersection">
                     {{ static_drill_titles_prop[params.selected_category][carouselActiveIndex] }} 
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

                    <v-carousel-item v-for="(bararr,index) in jsonData[params.selected_category]" :key="index">
                        <div class="PIEcontainer" dir="rtl">
                              <BaseGenericPie  :chartData="bararr" :isDrill="isDrillDown" :isPrecentage="params.isPrecentage" :isNumber="params.isNumber" @handleIntersection="pieClick"/>
                        </div>
                    </v-carousel-item>
                </v-carousel>


            </div>

            <div class="clock-drilldown"
             v-if="params.expand && !isDrillDown && params.drill_down_params"
             :style="{backgroundColor:getCurrentTheme.genericClock.drill_background }">
                <h1 class="drilldown-title" v-if="params.drill_down_params.headline_config">{{params.drill_down_params.headline_config.title}}</h1>
                <component 
                :is="params.drill_down_params.template_type"
                :params = params.drill_down_params
                :isDrillDown="true"
                :view_ID="view_ID"
                :drillDataProp="drilldownData"
                :parentsParam="params"
                :static_drill_titles_prop="params.static_drill_titles_param_copy">
                </component>   
            </div>
    </div>  

    <div class="loader" v-else>
        <div class="loader" v-if="!isErrorMsg">
            <v-progress-circular
            indeterminate
            color="purple"
            ></v-progress-circular>
        </div>
        <h1 v-else>  {{errorMSG}} </h1>
    </div>  
</div>
</template>

<script>
import ThreeDotsNineDots from '../utils/ThreeDotsNineDots.vue'
import BaseGenericPie from './genericPie/baseGenericPie.vue'

// axios.defaults.timeout = 1000
export default {
    // name:"basicKPI",
    props:{
        isDrillDown:{type:Boolean},
        drillDataProp:{type:Object, default:()=>{}},
        params:{type:Object,required:false},
        view_ID:{type:Number},
        parentsParam:{type:Object},
        static_drill_titles_prop:{type:Object}
    },
    watch:{
        drillDataProp(){
            this.jsonData = this.drillDataProp
        }
    },
    data(){
            return{
                activeTitle:0,
                activeIndex:-1,
                succ_req: true,
                clicked_index:undefined,
                errorMSG:"",
                carouselActiveIndex:0,
                carouselIndex:0,
                drilldownData:[],
                jsonData:[],
                doneFetching:false,
                static_drill_data:{},
            }
    },
    components:{
    ThreeDotsNineDots,
    genericKPI: () => import("../widgets/genericKPI.vue"),
    genericLIST: () => import('../widgets/genericLIST.vue'),
    genericPIE: () => import("../widgets/genericPIE.vue"),
    BaseGenericPie
},
    methods:{
        // toggel drill down from a label click if click_open_drill_enabled = true in the config
        pieClick(i){
            this.activeTitle = i
            if(this.params.data_intersection){
                this.drilldownData = this.static_drill_data[this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].label]    
                console.log(this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].label,"pie main clock label on click DI")
                console.log(this.params.static_drill_titles_param ,"params.static_drill pie")
                this.params.static_drill_titles_param_copy = this.params.static_drill_titles_param[this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].label] 
                console.log(this.params.static_drill_titles_param ,"params.static_drill_after entry pie ")
            }
            if(this.params.click_open_drill_enabled){
                if(!this.params.expand ||  i != this.clicked_index){
                     // eslint-disable-next-line
                    this.params.expand = true
                    this.activeIndex = i
                }
                else{
                     // eslint-disable-next-line
                    this.params.expand = false
                    this.activeIndex = -1
                }
            }
            this.clicked_index = i
        }
    },
    computed:{
        // hide the Carousel prev next btns if only one chart is avaliable.
        showArrows(){
            if (this.jsonData[this.params.selected_category].length>1) return true;
            else return false 
        },
        isErrorMsg(){
            return this.errorMSG.length !== 0;
        }
    },

    async created(){
        if(!this.isDrillDown){
            await this.$myApi(this.params.data_url)
            .then(response => {
                this.jsonData = response.data
                this.errorMSG = ""
                // do sth ...
            })
            .catch(error => {
                console.log(error);
                console.log(error,"Main Clock Data GET request FAIL, PLEASE Check Backend")
                this.errorMSG =  "אין מידע"
                this.succ_req = false
            });
            if(this.succ_req){
                    this.params.static_drill_titles_param_copy = this.params.static_drill_titles_param
                    await this.$myApi(this.params.drill_down_params.data_url)
                    .then(response => {
                        this.drilldownData = Object.assign(response.data)
                        if(this.params.data_intersection){
                            this.static_drill_data = Object.assign(response.data)
                        }
                        this.errorMSG = ""
                        if(this.params.data_category == undefined || this.params.selected_category == undefined){
                            console.log("radio btns config failed fix data_category, selected category")
                            this.errorMSG = "אין מידע"
                        }
                        // do sth ...
                    })
                    .catch(error => {
                        console.log(error,"drill DATA FETCH ERROR");
                        this.errorMSG = "אין מידע"
                    });
                }
        }
        else{
            this.jsonData = this.drillDataProp
        }

        //  flag used to render the charts syncronously only after data is ready
        if(this.errorMSG.length === 0){
            this.doneFetching = true
        }
    }
}
</script>

<style scoped>
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.barcontainer{
    display: grid;
    grid-template-columns: auto auto;
    row-gap: 10px;
    column-gap: 10px;
    justify-content: center;
    padding-bottom: 20px;
}
.bar-box{
    padding-top: 4px;
    text-align: center;
    align-items: center;
    width: 165px;
    height: 80px;
    border-radius: 4px;
}
/* .kpi-box span:first-child{
    font-family: almoni;
    font-size: 20px;
    line-height: 30px;
} */

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
.bar-box span{
    display: inline-block;
    font-size: 16px;
    font-family: almoni-demibold;
    color: #a8699d;
}
.bar-box .bar-sec-value{
    color:#606060
}
#chartsHeaders {
    font-family: almoni;
    font-size: 16px;
    color: v-bind('getCurrentTheme.generic_title_color');
    /* margin-bottom: 18px; */
}

.clock-drilldown{
    background-color: #E5E5E5;
    padding-bottom: 20px;
}

.drilldown-title{
    color:v-bind('getCurrentTheme.drill_title_color');
    font-size: 24px;
    text-align: center;
    font-family: almoni;
}

.bar-box span{
    display: inline-block;
    font-size: 18px;
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
</style>