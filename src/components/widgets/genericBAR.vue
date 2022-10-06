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
                    {{ params.chart_titles[activeTitle] }}
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
                            <v-row dir="rtl"
                                style="margin-top:10px;margin-bottom: 20px; place-content: center"

                            >
                            <oneBar  v-for="(item,index) in BARarr" :isSelectedIndex="activeIndex===index" :isSelected="activeIndex!= -1" :key="index" v-on:click.native="kpiBoxClick(index)" :params="params" :data="item.color ? item.max_value ? item : getTotal(BARarr,item) : item.max_value ? getColor(item,index) : getColor(getTotal(BARarr,item),index)" />
                        </v-row>

                        <div class="btn-container" style="margin-left:4%;margin-right:4%;">
            <v-row dir="rtl" style="place-content:right;">
                <v-btn class="main-btn"
                :ripple="false"
                 v-for="(btnName,index) in BARarr" :key="index"
                 :style="{backgroundColor: isDrillDown ? getCurrentTheme.baseGenericPie.btn_color_drill : getCurrentTheme.baseGenericPie.btn_color ,border : activeIndex == index ? 'solid black 1px' : ' solid black 0px'}"
                 @click="kpiBoxClick(index)">
                    <span
                    class="dot"
                    :style="{backgroundColor :  btnName.color ? btnName.color: getColor(btnName,index).color}"></span>    
                    <span class="test" :style="'color:' + getCurrentTheme.baseGenericPie.span_color">
                        {{btnName.label}}
                    </span>
                  </v-btn>    
            </v-row>

            <v-row dir="rtl" style="place-content:center;">
                <div
                 v-for="(btnName,index) in BARarr" :key="index" style="font-family: almoni;display: -webkit-inline-box;-webkit-box-align: center;margin-left:10px">
                    <span
                    class="dot"
                    :style="{backgroundColor :  btnName.color ? btnName.color: getColor(btnName,index).color}"></span>    
                    <span :style="'color:' + getCurrentTheme.baseGenericPie.span_color">
                        {{btnName.label}}
                    </span>
                  </div>    
            </v-row>
        </div>


                        </div>
                    </v-carousel-item>
                </v-carousel>
            </div>

            <div class="clock-drilldown" v-if="params.expand && !isDrillDown && params.drill_down_params">
                <h1 class="drilldown-title" v-if="params.drill_down_params.headline_config">{{params.drill_down_params.headline_config.title}}</h1>
                <component 
                :is="params.drill_down_params.template_type"
                :params = params.drill_down_params
                :isDrillDown="true"
                :drillDataProp="drilldownData">
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
import oneBar from './genericBAR/oneBar.vue';

// axios.defaults.timeout = 1000
export default {
    // name:"basicKPI",
    props:{
        isDrillDown:{type:Boolean},
        drillDataProp:{type:Object, default:()=>{}},
        params:{type:Object,required:false}
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
                defaultColors:["#0073FF","#FF8D00","#8FC602","#C10015","#0073FF","#FF8D00","#8FC602","#C10015"]
            }
    },
    components:{
        ThreeDotsNineDots,
        oneBar,
        genericKPI: () => import('../widgets/genericKPI.vue'),
        genericPIE: () => import('../widgets/genericPIE.vue')
    },
    methods:{
        // toggel drill down from a label click if click_open_drill_enabled = true in the config
        kpiBoxClick(i){
            console.log("ieieiei");
            this.activeTitle = i
            if(this.params.data_intersection){
                this.drilldownData = {}
                this.drilldownData = this.static_drill_data[this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].label]    
            }
            if(this.params.click_open_drill_enabled){
                if(!this.params.expand ||  i != this.clicked_index){
                    this.params.expand = true
                    this.activeIndex = i
                }
                else{
                    this.params.expand = false
                    this.activeIndex = -1
                }
            }
            this.clicked_index = i
        },
        getTotal(item,obj){
            obj.max_value = item.reduce(function (acc, obj) { return acc + obj.value; }, 0);
            return obj
        },
        getColor(obj,index){
            console.log(obj,"d");
            obj.color = this.defaultColors[index]
            return obj
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
        },
    },

    async created(){
        if(!this.isDrillDown){
            await this.$myApi(this.params.data_url)
                .then(response => {
                    this.jsonData = response.data
                    //#########
                    this.jsonData = {
  "*": [
    [
      {
        "label": "חתיכות",
        "value": 4,
        "max_value" : 44,
      },
      {
        "label": "אלמוג זה טקסט ארוך",
        "value": 4,
        "max_value" : 22,
      },
      {
        "label": "אלמוג א",
        "value": 4,
        "max_value" : 11,
      },{
        "label": "רן הגבר",
        "value": 4,
        "max_value" : 11,
      },{
        "label": "רן חשמלים",
        "value": 4,
        "max_value" : 11,
      },
    ]
  ]
}
//#############
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
                    await this.$myApi(this.params.drill_down_params.data_url)
                    .then(response => {
                        console.log(response.data)
                        this.drilldownData = response.data
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
    ::v-deep .v-btn:not(.v-btn--round).v-size--default {
    height: 36px;
    min-width: 64px;
    padding: 0px;
    justify-content: right;
    padding-right: 8px;
    /* margin-right: 10px; */
}

    .test{
        text-overflow: ellipsis;
  overflow: hidden; 
  width: 68px; 
  white-space: nowrap;
    }
    .main-btn{
        font-family: almoni;
  margin:8px;
  justify-content: right;
        overflow: hidden;
        border-radius: 6px;
        width: 102px !important;
        text-align: -webkit-right;
        
        box-shadow:0px 0px !important;
    }
    .main-btn::before {
    display:none;
  }
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

.dot {
    align-self: center;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: flex;
  margin: 2%;
  margin-right: 0;
  direction: rtl;
  margin-left: 5px;
}
</style>