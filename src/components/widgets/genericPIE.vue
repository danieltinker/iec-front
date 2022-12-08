<!-- eslint-disable -->
<template>
    <div>
        <div v-if="doneFetching">
            <div class="clock-main" style="text-align: center;" v-if="params.show_clock">
                <div class="flex-center">
                    <v-radio-group dir="rtl" v-model="params.selected_category" row id="districtRadioGroup"
                        v-if="params.data_category.length >= 2">
                        <v-radio v-for="(category) in params.data_category" :key="category" :label="category"
                            :value="category" color="#0F2558"></v-radio>
                    </v-radio-group>
                </div>
                <div class="pie-carousel">
                    <!-- <h1 v-if= " !isDrillDownProp">{{meta_data}}</h1>
                    <h1 v-if= " isDrillDownProp">{{drilldown_meta}}</h1> -->

                    <!-- <Chart-Title params, carousel active index, is drill,static drill titles prop></Chart-Title> -->
                    <span id="chartsHeaders" v-if="!isDrillDownProp">
                        {{ params.chart_titles[params.selected_category][carouselActiveIndex] }}
                    </span>
                    <span id="chartsHeaders" v-if="isDrillDownProp && !params.data_intersection">
                        {{ static_drill_titles_prop["*"][params.selected_category][carouselActiveIndex] }}
                    </span>
                    <span id="chartsHeaders" v-if="isDrillDownProp && params.data_intersection">
                        {{ static_drill_titles_prop[params.selected_category][carouselActiveIndex] }}
                    </span>
                    <span>
                        <v-icon dir="rtl"
                        @click="BookMarkClick(view_ID, parentsParam, params.template_type, true, carouselActiveIndex)"
                        color="#0F2558" style="font-size: 30px"
                        v-if="isDrillDownProp && params.headline_config && params.headline_config.bookmark_enabled">{{
                            CheckBookmark(view_ID)
                            ? "mdi-bookmark"
                            : "mdi-bookmark-outline"
                        }}</v-icon>
                    </span>
                    
                    
                    <v-carousel hide-delimiters :show-arrows="showArrows" class="carousel-flex" ref="pieCarousel"
                   v-model="carouselActiveIndex" height=auto>
                    <template v-slot:next="{ on, attr }">
                        <img v-on="on" v-bind="attr" src="../../assets/playRight.svg" />
                    </template>
                    <template v-slot:prev="{ on, attr }">
                        <img v-on="on" v-bind="attr" src="../../assets/playLeft.svg" />
                    </template>

                    
                    <v-carousel-item v-for="(bararr, index) in jsonData[params.selected_category]" :key="index">
                        <div class="PIEcontainer" dir="rtl">
                            <BaseGenericPie :chartData="bararr" :isDrill="isDrillDownProp"
                                    :isPrecentage="params.isPrecentage" :isNumber="params.isNumber"
                                    @handleIntersection="pieClick" />
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </div>
            </div>

            <div class="clock-drilldown" v-if="params.expand && !isDrillDownProp && params.drill_down_params"
                :style="{ backgroundColor: getCurrentTheme.genericClock.drill_background }">
                <h1 class="drilldown-title" v-if="params.drill_down_params.headline_config">
                    {{ params.drill_down_params.headline_config.title }}</h1>
                <component :is="params.drill_down_params.template_type" :params=params.drill_down_params
                    :isDrillDownProp="true" :view_ID="view_ID" :drillDataProp="drilldownData" :parentsParam="params"
                    :static_drill_titles_prop="params.static_drill_titles_param_copy"
                    :drilldown_meta= "meta_data"
                    :drillCarouselIndexProp = "drillCarouselIndex">
                </component>
            </div>
        </div>
        <div class="loader" v-else>
            <div class="loader" v-if="!isErrorMsg">
                <v-progress-circular indeterminate :style="{ color: getCurrentTheme.global_theme_color }">
                </v-progress-circular>
            </div>
            <h1 v-else style="font-family: almoni;font-size:20px"> {{ errorMSG }} </h1>
        </div>
    </div>
</template>

<script>
import ThreeDotsNineDots from '../utils/ThreeDotsNineDots.vue'
import BaseGenericPie from './genericPie/baseGenericPie.vue'

// axios.defaults.timeout = 1000
export default {
    // name:"basicKPI",
    props: {
        isDrillDownProp: { type: Boolean },
        drillDataProp: { type: Object, default: () => { } },
        params: { type: Object, required: false },
        view_ID: { type: Number },
        parentsParam: { type: Object },
        static_drill_titles_prop: { type: Object },
        drilldown_meta:{type:Object},
        drillCarouselIndexProp:{type:Number}
    },

    data() {
        return {
            doneFetching: false,
            hasMainDataRecieved:false,

            drillCarouselIndex:0,
            tickCycleTime:undefined,

            activeLabelIndex: 0,
            activeIndex: -1,
            selectedIndex: undefined,

            errorMSG: "",
            carouselActiveIndex: 0,
            drilldownData: [],
            jsonData: [],
            intersectionDrillData: {},
            meta_data:{}
        }
    },
    components: {
        ThreeDotsNineDots,
        genericKPI: () => import("../widgets/genericKPI.vue"),
        genericLIST: () => import('../widgets/genericLIST.vue'),
        genericPIE: () => import("../widgets/genericPIE.vue"),
        BaseGenericPie
    },
    methods: {
        async fetchClock() {
            this.doneFetching = false // show LOADER
            this.LoadDrillCarouselIndex()
            this.LoadQuickViewCarouselIndex()
            if(!this.isDrillDownProp){
                await this.fetchMainData()
                if(this.hasMainDataRecieved){
                    await this.fetchDrillData()
                }
            }
            else if(this.drillDataProp != undefined){
                this.jsonData = this.drillDataProp
            }
            if(!this.hasErrorMsg()){
                this.doneFetching = true // show CLOCK
            }
            this.tick(this.params.sample_rate)
        },

        LoadDrillCarouselIndex(){
            if(this.isDrillDownProp){ 
                this.carouselActiveIndex = this.drillCarouselIndexProp
            }
        },
        LoadQuickViewCarouselIndex(){
            if (this.params.carouselActiveIndex) { 
                this.carouselActiveIndex = this.params.carouselActiveIndex
            }
        },
        async fetchMainData(){
            await this.$myApi(this.params.data_url)
                    .then(response => {
                        this.jsonData = response.data
                        this.errorMSG = ""
                        this.hasMainDataRecieved = true

                        if (Object.prototype.hasOwnProperty.call(response.data, 'meta')) {
                            this.meta_data = response.data["meta"]
                            delete response.data["meta"];
                        }
                    })
                    .catch(error => {
                        console.log(error, "Main Clock Data GET request FAIL, PLEASE Check BackEnd & Db")
                        this.errorMSG = "אין מידע"
                        this.hasMainDataRecieved = false
                    });
        },
        async fetchDrillData(){
            this.params.static_drill_titles_param_copy = this.params.static_drill_titles_param
                    await this.$myApi(this.params.drill_down_params.data_url)
                        .then(response => {
                            this.drilldownData = Object.assign(response.data)

                            if (this.params.data_intersection) {
                                this.intersectionDrillData = Object.assign(response.data)
                                this.reloadDrillDataOnTick()
                            }

                            this.errorMSG = ""
                            if (this.params.data_category == undefined || this.params.selected_category == undefined) {
                                console.log("radio btns config failed fix data_category, selected category")
                                this.errorMSG = "אין מידע"
                            }
                        })
                        .catch(error => {
                            console.log(error, "drill DATA FETCH ERROR");
                            this.errorMSG = "אין מידע"
                        });
        },
        reloadDrillDataOnTick(){
            if(this.params.data_intersection && this.params.expand){ 
                this.drilldownData = this.intersectionDrillData[this.jsonData[this.params.selected_category][this.carouselActiveIndex][this.activeLabelIndex].label]
                this.params.static_drill_titles_param_copy = this.params.static_drill_titles_param[this.jsonData[this.params.selected_category][this.carouselActiveIndex][this.activeLabelIndex].label]
            }
        },
        hasErrorMsg(){
            if (this.errorMSG.length === 0) {
                return false
            }
            return true
        },
        tick(time){
            this.tickCycleTime = setTimeout(this.fetchData, time || this.$store.state.default_smpale_rate);
        },

        // toggel drill down from a label click if click_open_drill_enabled = true in the config
        pieClick(i) {
            if (this.params.data_intersection && this.params.click_open_drill_enabled) { // load intersection data 
                this.activeLabelIndex = i
                this.drilldownData = this.intersectionDrillData[this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].label]
                this.params.static_drill_titles_param_copy = this.params.static_drill_titles_param[this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].label]
            }
            if (this.params.click_open_drill_enabled) { // expand drill handler
                if (!this.params.expand || i != this.selectedIndex) {
                    // eslint-disable-next-line
                    this.params.expand = true
                    this.activeIndex = i
                }
                else {
                    // eslint-disable-next-line
                    this.params.expand = false
                    this.activeIndex = -1
                }
                this.selectedIndex = i
            }
        }
    },

    created(){
 
        this.$on("myIndex", (i)=>{
                this.drillCarouselIndex = i
        })
        this.fetchClock()
    },
    
    beforeDestroy() {
        this.$parent.$emit("myIndex",this.carouselActiveIndex)
        clearTimeout(this.tickCycleTime)
    },

    watch: {
        drillDataProp() {
            this.jsonData = this.drillDataProp
        }
    },

    computed: {
        // hide the Carousel prev next btns if only one chart is avaliable.
        showArrows() {
            if (this.jsonData[this.params.selected_category].length > 1) return true;
            else return false
        },
        isErrorMsg() {
            return this.errorMSG.length !== 0;
        }
    },
}
</script>

<style scoped>
:deep() .v-input--selection-controls__input .v-icon {
    color: v-bind('getCurrentTheme.global_radio');
}

:deep() .v-btn:not(.v-btn--round).v-size--default {
    padding: 0 10px;
}

:deep() .btn-span {
    text-align: -webkit-right;
    margin-right: 4px;
}

:deep() .v-input--selection-controls .v-radio>.v-label {
    color: v-bind('getCurrentTheme.drill_title_color');
    margin-right: 6px;
}

:deep() .v-input--radio-group.v-input--radio-group--row .v-radio {
    margin-right: 0px !important;
}

.flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.barcontainer {
    display: grid;
    grid-template-columns: auto auto;
    row-gap: 10px;
    column-gap: 10px;
    justify-content: center;
    padding-bottom: 20px;
}

.bar-box {
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

.loader {
    height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
}

.v-progress-circular {
    padding: 40px;
}

.bar-box span {
    display: inline-block;
    font-size: 16px;
    font-family: almoni-demibold;
    color: #a8699d;
}

.bar-box .bar-sec-value {
    color: #606060
}

#chartsHeaders {
    font-family: almoni-medium;
    font-size: 18px;
    color: v-bind('getCurrentTheme.generic_title_color');
    /* margin-bottom: 18px; */
}

.clock-drilldown {
    background-color: #E5E5E5;
    padding-bottom: 20px;
}

.drilldown-title {
    padding-top: 16px;
    color: v-bind('getCurrentTheme.drill_title_color');
    font-size: 24px;
    text-align: center;
    font-family: almoni;
}

.bar-box span {
    display: inline-block;
    font-size: 18px;
    font-family: almoni-demibold;
    color: #a8699d;
}

.clock-drilldown {
    background-color: #E5E5E5;
    padding-bottom: 20px;
}

.carousel-flex {
    display: flex;
    flex-direction: column;
}

.carousel-flex :deep() .v-window__next {
    background-color: transparent !important;
    color: transparent !important;
    top: 40% !important;
}

.carousel-flex :deep() .v-window__prev {
    background-color: transparent !important;
    color: transparent !important;
    top: 40% !important;
}

.radio-btn {
    display: inline-block !important;
    ;
}
</style>