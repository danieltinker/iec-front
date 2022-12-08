<!-- eslint-disable -->
<template>
    <div>
        <div v-if="doneFetching">
            <div class="clock-main" style="text-align: center;" v-if="params.show_clock">
                <div class="flex-center">
                    <v-radio-group dir="rtl" v-model="params.selected_category" row id="districtRadioGroup"
                        v-if="params.data_category.length >= 2">
                        <v-radio v-for="(category) in params.data_category" :key="category" :label="category"
                            :value="category" :color="getCurrentTheme.global_selected_radio"></v-radio>
                    </v-radio-group>
                </div>
                <div class="bar-carousel">


                    <span id="chartsHeaders" v-if="!isDrillDown">
                        {{ params.chart_titles[params.selected_category][carouselActiveIndex] }}
                    </span>
                    <span id="chartsHeaders" v-if="isDrillDown && !params.data_intersection">
                        {{ static_drill_titles_prop["*"][params.selected_category][carouselActiveIndex] }}
                    </span>
                    <span id="chartsHeaders" v-if="isDrillDown && params.data_intersection">
                        {{ static_drill_titles_prop[params.selected_category][carouselActiveIndex] }}
                    </span>

                    <span>
                        <v-icon
                            @click="BookMarkClick(view_ID, parentsParam, params.template_type, true, carouselActiveIndex)"
                            color="#0F2558" style="font-size: 30px"
                            v-if="isDrillDown && params.headline_config && params.headline_config.bookmark_enabled">{{
                                    CheckBookmark(view_ID)
                                        ? "mdi-bookmark"
                                        : "mdi-bookmark-outline"
                            }}</v-icon>
                    </span>

                    <v-carousel hide-delimiters :show-arrows="showArrows" class="carousel-flex" ref="pieCarousel"
                        :value="carouselIndex" v-model="carouselActiveIndex" height=auto>
                        <template v-slot:next="{ on, attr }">
                            <img v-on="on" v-bind="attr" src="../../assets/playRight.svg" />
                        </template>
                        <template v-slot:prev="{ on, attr }">
                            <img v-on="on" v-bind="attr" src="../../assets/playLeft.svg" />
                        </template>

                        <v-carousel-item v-for="(BARarr, index) in jsonData[params.selected_category]" :key="index">
                            <div class="barcontainer" dir="rtl">
                                <v-row dir="rtl" style="margin-top:10px;margin-bottom: 20px; place-content: center">
                                    <oneBar v-for="(item, index) in BARarr" :isSelectedIndex="activeIndex === index"
                                        :isSelected="activeIndex != -1" :key="index"
                                        v-on:click.native="barBoxClick(index)" :params="params"
                                        :data="item.color ? item.max_value ? item : getTotal(BARarr, item) : item.max_value ? getColor(item, index) : getColor(getTotal(BARarr, item), index)" />
                                </v-row>

                                <div class="btn-container">
                                    <v-row dir="rtl" style="place-content:right;display: inline-flex;"
                                        v-if="params.data_intersection || params.click_open_drill_enabled">
                                        <v-btn class="main-btn" :ripple="false" v-for="(btnName, index) in BARarr"
                                            :key="index"
                                            :style="{ backgroundColor: isDrillDown ? getCurrentTheme.baseGenericPie.btn_color_drill : getCurrentTheme.baseGenericPie.btn_color, border: activeIndex == index ? getCurrentTheme.legend_border_color : ' solid black 0px' }"
                                            @click="barBoxClick(index)">
                                            <span class="dot"
                                                :style="{ backgroundColor: btnName.color ? btnName.color : getColor(btnName, index).color }"></span>
                                            <span class="btn-span"
                                                :style="'color:' + getCurrentTheme.baseGenericPie.span_color">
                                                {{ btnName.label }}
                                            </span>
                                        </v-btn>
                                    </v-row>

                                    <v-row dir="rtl" style="place-content:center;display: inline-flex;"
                                        v-if="!params.data_intersection && !params.click_open_drill_enabled">
                                        <div v-for="(btnName, index) in BARarr" :key="index" class="labels">
                                            <span class="dot" style="margin-left:5px"
                                                :style="{ backgroundColor: btnName.color ? btnName.color : getColor(btnName, index).color }"></span>
                                            <span :style="'color:' + getCurrentTheme.baseGenericPie.span_color"
                                                style="margin-left:5px">
                                                {{ btnName.label }}
                                            </span>
                                        </div>
                                    </v-row>
                                </div>


                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </div>

                <div class="clock-drilldown" v-if="params.expand && !isDrillDown && params.drill_down_params"
                    :style="{ backgroundColor: getCurrentTheme.genericClock.drill_background }">
                    <h1 class="drilldown-title" v-if="params.drill_down_params.headline_config">
                        {{ params.drill_down_params.headline_config.title }}</h1>
                    <component :is="params.drill_down_params.template_type" :params=params.drill_down_params
                        :isDrillDown="true" :view_ID="view_ID" :drillDataProp="drilldownData" :parentsParam="params"
                        :static_drill_titles_prop="params.static_drill_titles_param_copy"
                        :drill_carousel_index = "main_to_drill_carousel_index">
                    </component>
                </div>
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
import oneBar from './genericBAR/oneBar.vue';

export default {
    props: {
        isDrillDown: { type: Boolean },
        drillDataProp: { type: Object, default: () => { } },
        params: { type: Object, required: false },
        view_ID: { type: Number },
        parentsParam: { type: Object },
        static_drill_titles_prop: { type: Object },
        drill_carousel_index:{type:Number}
    },
    watch: {
        drillDataProp() {
            this.jsonData = this.drillDataProp
        }
    },
    data() {
        return {
            myTimeout:undefined,
            activeTitle: 0,
            activeIndex: -1,
            succ_req: true,
            clicked_index: undefined,
            errorMSG: "",
            carouselActiveIndex: 0,
            carouselIndex: 0,
            drilldownData: [],
            jsonData: [],
            doneFetching: false,
            static_drill_data: {},
            main_to_drill_carousel_index:undefined,
            defaultColors: ["#0073FF", "#FF8D00", "#8FC602", "#C10015", "#0073FF", "#FF8D00", "#8FC602", "#C10015"]
        }
    },
    components: {
        ThreeDotsNineDots,
        oneBar,
        genericKPI: () => import('../widgets/genericKPI.vue'),
        genericLIST: () => import('../widgets/genericLIST.vue'),
        genericPIE: () => import('../widgets/genericPIE.vue'),
        genericGraph: () => import('../widgets/genericGraph.vue')
    },
    methods: {
        async fetchData() {
            this.doneFetching = false
            if (this.params.carouselActiveIndex) {
                console.log("have A CAROUSEL INDEX FROM QUICK VIEW PARAMS!!!")
                this.carouselActiveIndex = this.params.carouselActiveIndex
            }

            if (!this.isDrillDown) {
                this.params.static_drill_titles_param_copy = this.params.static_drill_titles_param
                await this.$myApi(this.params.data_url)
                    .then(response => {
                        this.jsonData = response.data
                        this.errorMSG = ""
                    })
                    .catch(error => {
                        console.log(error, "Main Clock Data GET request FAIL, PLEASE Check Backend")
                        this.errorMSG = "אין מידע"
                        this.succ_req = false
                    });
                if (this.succ_req && this.params.drill_down_params) {
                    this.params.static_drill_titles_param_copy = this.params.static_drill_titles_param
                    await this.$myApi(this.params.drill_down_params.data_url)
                        .then(response => {
                            this.drilldownData = Object.assign(response.data)
                            if (this.params.data_intersection) {
                                this.static_drill_data = Object.assign(response.data)
                                if(this.params.data_intersection && this.params.expand){{
                                    this.drilldownData = this.static_drill_data[this.jsonData[this.params.selected_category][this.carouselActiveIndex][this.activeTitle].label]
                                    this.params.static_drill_titles_param_copy = this.params.static_drill_titles_param[this.jsonData[this.params.selected_category][this.carouselActiveIndex][this.activeTitle].label]
                                }}
                            }
                            this.errorMSG = ""
                            // IF STATEMENT handling miss configurations 
                            if (this.params.data_category == undefined || this.params.selected_category == undefined) {
                                console.log("radio btns config failed fix data_category, selected category")
                                this.errorMSG = "אין מידע"
                            }
                        })
                        .catch(error => {
                            console.log(error, "drill DATA FETCH ERROR");
                            this.errorMSG = "אין מידע"
                        });
                }
            }
            else {
                this.jsonData = this.drillDataProp
            }

            // doneFetching flag render the charts syncronously after data is ready
            if (this.errorMSG.length === 0) {
                this.doneFetching = true
            }
            this.tick(this.params.sample_rate)
        },
        tick(time){
            setTimeout(this.fetchData, time || 120000);
        },
        // toggel drill down from a label click if click_open_drill_enabled = true in the config
        barBoxClick(i) {
            this.activeTitle = i
            if (this.params.data_intersection && this.params.click_open_drill_enabled) {
                this.drilldownData = this.static_drill_data[this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].label]
                this.params.static_drill_titles_param_copy = this.params.static_drill_titles_param[this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].label]
            }
            if (this.params.click_open_drill_enabled) {
                if (!this.params.expand || i != this.clicked_index) {
                    // eslint-disable-next-line
                    this.params.expand = true
                    this.activeIndex = i
                }
                else {
                    // eslint-disable-next-line
                    this.params.expand = false
                    this.activeIndex = -1
                }
            }
            this.clicked_index = i
        },
        getTotal(item, obj) {
            obj.max_value = item.reduce(function (acc, obj) { return acc + obj.value; }, 0);
            return obj
        },
        getColor(obj, index) {
            obj.color = this.defaultColors[index]
            return obj
        }
    },
    created(){
        this.$on("myIndex", (i)=>{
                this.main_to_drill_carousel_index = i
        })
        this.fetchData()
    },
    beforeDestroy() {
        this.$parent.$emit("myIndex",this.carouselActiveIndex)
        clearTimeout(this.myTimeout)
    },
    computed: {
        // hide the Carousel prev next btns if only one chart is avaliable.
        showArrows() {
            if (this.jsonData[this.params.selected_category].length > 1) return true;
            else return false
        },
        isErrorMsg() {
            return this.errorMSG.length !== 0;
        },
    },

}
</script>

<style scoped>

:deep() .v-input--selection-controls__ripple {
    height: 0px;
}
:deep() .v-input--selection-controls__ripple {
    height: 0px;
}
:deep() .v-input--selection-controls__input .v-icon {
    color: v-bind('getCurrentTheme.global_radio');
}

:deep() .v-input--selection-controls .v-radio>.v-label {
    color: v-bind('getCurrentTheme.drill_title_color');
    margin-right: 6px;
}

:deep() .v-input--radio-group.v-input--radio-group--row .v-radio {
    margin-right: 0px !important;
}

.labels {
    font-size: 16px;
    font-family: almoni;
    display: -webkit-inline-box;
    -webkit-box-align: center;
    margin-left: 10px
}

.btn-container {
    margin-left: 4%;
    margin-right: 4%;

}

:deep() .v-btn:not(.v-btn--round).v-size--default {
    padding-right: 8px;
}

.btn-span {
    text-align: -webkit-right;
    margin-right: 4px;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 68px;
    white-space: nowrap;
    font-size: 16px;
    letter-spacing: 0;
}

.main-btn {
    font-family: almoni;
    margin: 8px;
    justify-content: right;
    overflow: hidden;
    border-radius: 6px;
    width: 102px !important;
    /* text-align: -webkit-right;
         */
    box-shadow: 0px 0px !important;
}

.main-btn::before {
    display: none;
}

.flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
}


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

.dot {
    align-self: center;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: flex;
    margin: 2%;
    margin-right: 0;
    direction: rtl;
    /* margin-left: 5px; */
}
</style>