<!-- eslint-disable -->
<template>
    <div>
        <div v-if="doneFetching">
            <div class="clock-main" style="text-align: center;margin-top:12px" v-if="params.show_clock">
                <div class="flex-center">
                    <v-radio-group dir="rtl" v-model="params.selected_category" row id="districtRadioGroup"
                        v-if="params.data_category.length >= 2">
                        <v-radio v-for="(category) in params.data_category" :key="category" :label="category"
                            :value="category" :color="getCurrentTheme.global_selected_radio"></v-radio>
                    </v-radio-group>
                </div>
                <div class="kpi-carousel">

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
                        <v-icon dir="rtl"
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

                        <v-carousel-item v-for="(KPIarr, index) in jsonData[params.selected_category]" :key="index">
                            <div class="KPIcontainer" dir="rtl">
                                <!-- start -->
                                <div class="clock-main" style="margin-right:10px" v-if="params.show_clock">
                                    <v-data-table ref="tttt" id="mytable" style="width:100%" :headers="headers"
                                        :items="KPIarr" mobile-breakpoint="0" :show-expand="false" :items-per-page="100"
                                        calculate-widths hide-default-footer
                                        :group-by="params.group_by ? 'category' : null" sort-by=""
                                        :footer-props="{ showFooterBorder: false }"
                                        :header-props="{ showHeaderBorder: false }" :show-rows-border="false"
                                        class="elevation-1" disable-filtering disable-pagination dir="rtl">
                                        <template v-slot:group.header="{ items }">
                                            <td :colspan="headers.length" class="list-total" style="height:30px">
                                                <strong>{{ items[0].category.charAt(1) == '-' ?
                                                        items[0].category.split('-')[1] : items[0].category
                                                }}</strong>
                                                <!-- <hr>
                                          <strong>{{ items[0].category }}</strong> -->
                                            </td>

                                        </template>


                                        <template v-for="(slot, i) in headers" v-slot:[`item.${slot.value}`]="{ item }">
                                            <strong @click="testttt(item[slot.value])"
                                                v-if="typeof item[slot.value] == 'string' && item[slot.value].split('*-*')[0] == 'dot'"
                                                :key="i" class="dot"
                                                :style="'background-color:' + item[slot.value].split('*-*')[1]">
                                            </strong>
                                            <strong @click="testttt(item[slot.value], $event)"
                                                v-else-if="typeof item[slot.value] == 'string'" :key="i + slot">
                                                {{ item[slot.value] }}</strong>
                                            <strong v-else :key="slot + i">{{ item[slot.value] }}</strong>
                                        </template>
                                        <template v-slot:body.append v-if="totalGet.length > 0">
                                            <tr>
                                                <td v-for="(item, i) in headers" :key="i" class="list-total"
                                                    style="height:30px;">
                                                    <span v-if="i == 0 && !totalGet.includes(item.value)">סה"כ</span>
                                                    <div v-else>
                                                        <span v-if="totalGet.includes(item.value)"
                                                            @click="testttt(sumField(item.value).toFixed(1), $event)"> {{
                                                                    sumField(item.value).toFixed(1)
                                                            }} </span>
                                                        <span v-else> </span>
                                                    </div>
                                                </td>

                                            </tr>

                                        </template>

                                        <template slot="no-data">
                                            {{ params.no_data ? params.no_data : "אין פריטים להצגה" }}
                                        </template>

                                    </v-data-table>




                                </div>

                                <!-- end -->
                            </div>


                            <div v-if="params.bottom_text" class="updateDate">
                                <p>{{ params.bottom_text.substring(0, 5) == '$meta' ?
                                        meta_data[params.bottom_text.substring(6)] : params.bottom_text
                                }}</p>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </div>
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
        <div class="loader" v-else>
            <div class="loader" v-if="!isErrorMsg">
                <v-progress-circular indeterminate :style="{ color: getCurrentTheme.global_theme_color }">
                </v-progress-circular>
            </div>
            <h1 v-else style="font-family: almoni;font-size:20px"> {{ errorMSG }} </h1>
        </div>


        <CardPopup ref="cardPop" :myItem="cardData" />

    </div>
</template>

<script>
import ThreeDotsNineDots from '../utils/ThreeDotsNineDots.vue'
import CardPopup from './genericList/cardPopup.vue';
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
            cardData: '',
            colortest: "green",
            meta_data: null,
            headers: undefined,
            totalGet: undefined,
            myTimeout:undefined,
            main_to_drill_carousel_index:undefined,
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
            static_drill_data: {}
        }
    },
    components: {
        ThreeDotsNineDots,
        CardPopup,
        genericKPI: () => import('../widgets/genericKPI.vue'),
        genericLIST: () => import('../widgets/genericLIST.vue'),
        genericPIE: () => import('../widgets/genericPIE.vue')
    },
    methods: {
        async fetchData() {
            this.doneFetching = false

            if (this.params.carouselActiveIndex) {
                this.carouselActiveIndex = this.params.carouselActiveIndex
            }
            this.headers = this.params.headers
            this.totalGet = this.params.totalGet
            if (!this.isDrillDown) {
                await this.$myApi(this.params.data_url)
                    .then(response => {
                        if (Object.prototype.hasOwnProperty.call(response.data, 'meta')) {
                            this.meta_data = response.data["meta"]
                            delete response.data["meta"];
                        }
                        this.jsonData = response.data
                        //starttttttttt
                        //         this.jsonData = {"*" : [[
                        //     {
                        //         name: "dsadasdasdasdasdasdasdas",
                        //         calories: 1,
                        //         fat: 6,
                        //         carbs: 24,
                        //         category: "test1",
                        //     },
                        //     {
                        //         name: "8dddddddddddddddddddddddddddd",
                        //         calories: 408,
                        //         fat: 3.2,
                        //         carbs: 87,
                        //         category: "test4",
                        //     },
                        // ]] }
                        // if( this.jsonData["*"][0][0].length == 0){
                        //     throw 'no data';
                        // }
                        this.errorMSG = ""
                    })
                    .catch(error => {
                        console.log(error);
                        console.log(error, "Main Clock Data GET request FAIL, PLEASE Check Backend")
                        this.errorMSG = "אין מידע"
                        this.succ_req = false
                    });
                if (this.succ_req && this.params.drill_down_params) {
                    this.params.static_drill_titles_param_copy = this.params.static_drill_titles_param
                    await this.$myApi(this.params.drill_down_params.data_url)
                        .then(response => {
                            if (Object.prototype.hasOwnProperty.call(response.data, 'meta')) {
                                this.meta_data = response.data["meta"]
                                delete response.data["meta"];
                            }

                            this.drilldownData = Object.assign(response.data)
                            if (this.params.data_intersection) {
                                this.static_drill_data = Object.assign(response.data)
                                if(this.params.data_intersection && this.params.expand){{
                                    this.drilldownData = this.static_drill_data[this.jsonData[this.params.selected_category][this.carouselActiveIndex][this.activeTitle].label]
                                    this.params.static_drill_titles_param_copy = this.params.static_drill_titles_param[this.jsonData[this.params.selected_category][this.carouselActiveIndex][this.activeTitle].label]
                                }}
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
                }
            }
            else {
                this.jsonData = this.drillDataProp
            }

            //  flag used to render the charts syncronously only after data is ready
            if (this.errorMSG.length === 0) {
                this.doneFetching = true
            }
            this.tick(this.params.sample_rate)
        },
        tick(time){
            setTimeout(this.fetchData, time || this.$store.state.default_smpale_rate);
        },
        testttt(item, e) {
            if (e.path[1].offsetWidth < e.path[1].scrollWidth) {
                this.$refs.cardPop.dialog = true
                this.cardData = item
            }
        },
        sumField(key) {
            // sum data in give key (property)
            return this.jsonData[this.params.selected_category][0].reduce((a, b) => a + (b[key] || 0), 0);
        },
        // toggel drill down from a label click if click_open_drill_enabled = true in the config
        kpiBoxClick(i) {
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
}
</script>

<style scoped>
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

.updateDate {
    font-family: almoni-medium;
    font-size: 16px;
    text-align: center;
    color: v-bind('getCurrentTheme.list_data.font_color')
}

#mytable :deep() .v-data-table-header {
    height: 24px !important;
}

:deep() .v-data-table>.v-data-table__wrapper>table>tbody>tr>td,
.v-data-table>.v-data-table__wrapper>table>tbody>tr>th,
.v-data-table>.v-data-table__wrapper>table>thead>tr>td,
.v-data-table>.v-data-table__wrapper>table>thead>tr>th,
.v-data-table>.v-data-table__wrapper>table>tfoot>tr>td,
.v-data-table {


    border-radius: 0 0 0 0 !important;
    box-shadow: 0px 0px !important
}

#mytable :deep() .v-data-table-header tr th {
    height: 24px !important;
    padding-left: 0px;
    padding-right: 8px;
}

.list-total {
    font-family: almoni-bold !important;
    font-size: 16px !important;
    background-color: v-bind('getCurrentTheme.list_data.total_color');
    padding: 0px !important;

}

:deep() .v-data-table>.v-data-table__wrapper>table {
    table-layout: fixed;
    width: 100% !important;
    border-spacing: 0;
}

:deep() .v-data-table>.v-data-table__wrapper>table>tbody>tr>td,
.v-data-table>.v-data-table__wrapper>table>tbody>tr>th,
.v-data-table>.v-data-table__wrapper>table>thead>tr>td,
.v-data-table>.v-data-table__wrapper>table>thead>tr>th,
.v-data-table>.v-data-table__wrapper>table>tfoot>tr>td,
.v-data-table>.v-data-table__wrapper>table>tfoot>tr>th {
    /* padding: 0 0px;
    padding-right: 5px; */
    /* word-wrap: break-word; */
    background-color: "#F7F7F9";
    text-overflow: ellipsis;
    height: 40px;
    overflow: hidden;
    white-space: nowrap;
    transition: height 0.2s cubic-bezier(0.4, 0, 0.6, 1);
}

:deep() .v-data-table>.v-data-table__wrapper>table>tbody>tr>td,
.v-data-table>.v-data-table__wrapper>table>tbody>tr>th,
.v-data-table>.v-data-table__wrapper>table>thead>tr>td,
.v-data-table>.v-data-table__wrapper>table>thead>tr>th,
.v-data-table>.v-data-table__wrapper>table>tfoot>tr>td,
.v-data-table>.v-data-table__wrapper>table>tfoot>tr {
    font-size: 14px;
    font-family: almoni-light;
    color: v-bind('getCurrentTheme.list_data.font_color');
    padding-left: 0px;
    padding-right: 8px;

}



:deep() .theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr:not(:last-child)>td:not(.v-data-table__mobile-row),
.theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr:not(:last-child)>th:not(.v-data-table__mobile-row) {
    border-bottom: 4px solid v-bind('getCurrentTheme.list_data.border_color');
}

/* #mytable tbody td {
    font-size: 20px !important;
} */

.v-data-table:deep() th {
    font-size: 15px !important;
    color: white !important
}

/* .mytable tbody tr:hover > .sorting_1 {
  background-color: #ffa;
} */
#mytable {
    /* pointer-events: none; */
    background-color: v-bind('getCurrentTheme.list_data.background_color');
}


:deep() .v-data-table-header {
    background-color: v-bind('getCurrentTheme.global_theme_color');
    font-family: almoni;
    font-size: 222px !important;
    height: 4px !important;
}

#mytable :deep() tr:hover {
    background: inherit !important;
}

#mytable :deep() th:hover {
    background: inherit !important;
}

:deep() .v-icon {
    display: none;
}

:deep() .ma-0 {
    display: none;
}


.dot {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    display: flex;
    margin: 2%;
    direction: rtl;
}

.flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.KPIcontainer {
    display: grid;
    grid-template-columns: auto auto;
    row-gap: 10px;
    column-gap: 10px;
    justify-content: center;
    padding-bottom: 20px;
}

.kpi-box {
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

.kpi-box span {
    display: inline-block;
    font-size: 16px;
    font-family: almoni-demibold;
    color: #a8699d;
}

.kpi-box .kpi-sec-value {
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

.kpi-box span {
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