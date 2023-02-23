<!-- eslint-disable -->
<template>
    <div>
        <AdminPanel v-if="$store.state.loginStore.userInfo.user_id == 'ueie4'" ref="test" :view_ID="view_ID" :params="params"/>
        <v-btn v-if="$store.state.loginStore.userInfo.user_id == 'ueie4'" color="primary" @click="$refs.test.dialogVisible = true">OPEN Dialog</v-btn>
        <div v-if="doneFetching">

            <div class="clock-main" style="text-align: center;" v-if="params.show_clock">  
                
                <h1 style="text-align: center;margin-top:4px" :style="'color:' + getCurrentTheme.headline.title_color"
                        class="headline-title grid-item" v-if="staticData && params.headline_config">
                        {{ params.headline_config.title }}
                    </h1>
                    

                <div class="radios">
                    <v-radio-group dir="rtl" v-model="params.selected_category" row id="districtRadioGroup"
                        v-if="params.data_category.length >= 2">
                        <v-radio v-for="(category) in params.data_category" :key="category" :label="category"
                            :value="category" :color="getCurrentTheme.global_selected_radio"></v-radio>
                    </v-radio-group>
                </div>
                <div class="clock-carousel">
                    <v-row style="place-content: center;margin:0">
                    <ChartTitles :isDrillDown="isDrillDown" :params="params" :carouselActiveIndex="carouselActiveIndex" :static_drill_titles_prop="static_drill_titles_prop"></ChartTitles>
                    <span>
                        <v-icon dir="rtl"
                        @click="BookMarkClick(view_ID, parentsParam, params.template_type, true, carouselActiveIndex)"
                            style="font-size: 30px"
                            :style="{color:getCurrentTheme.global_theme_color}"
                            v-if="isDrillDown && params.headline_config && params.headline_config.bookmark_enabled && view_ID!=134">
                            {{CheckBookmark(view_ID)? "mdi-bookmark": "mdi-bookmark-outline"}}</v-icon>
                        </span>
                    </v-row>
                    <MetaText v-if="params.upper_text" :text="params.upper_text" style="padding-bottom:0px"/>
                    
                <div v-if="jsonData[params.selected_category].length!=0">
                    <v-carousel hide-delimiters :show-arrows="showArrows" class="carousel-flex" ref="pieCarousel"
                        :value="carouselIndex" v-model="carouselActiveIndex" height=auto>
                        <template v-slot:next="{ on, attr }">
                            <img v-on="on" v-bind="attr" src="../../assets/playRight.svg" />
                        </template>
                        <template v-slot:prev="{ on, attr }">
                            <img v-on="on" v-bind="attr" src="../../assets/playLeft.svg" />
                        </template>
                        <v-carousel-item v-for="(DataArray, index) in jsonData[params.selected_category]" :key="index + params.selected_category" style="margin-bottom:10px">
                            <div class="generic-clock" dir="rtl">

                                <component @BoxClick="BoxClick"
                                 :props_object={isDrillDown:isDrillDown,activeIndex:activeIndex,params:params,jsonData:jsonData,meta_data:meta_data,view_ID:view_ID} 
                                 :is="stepComponent" 
                                 :activeData="DataArray">
                                </component>

                            </div>
                        </v-carousel-item>
                    </v-carousel>
                    <MetaText v-if="params.buttom_text" :text="params.buttom_text" style="padding-bottom:10px"/>
                    <MetaLegend v-if="params.upper_legends" :meta_labels="params.upper_legends" style="padding-bottom:10px"/>
                </div>
                <div v-else><NoDataMsg :isDrill="isDrillDown" :templateType="params.template_type"/></div>
                </div>
            </div>


            <div class="clock-drilldown" v-if="params.expand && !isDrillDown && params.drill_down_params"
                :style="{ backgroundColor: getCurrentTheme.genericClock.drill_background }">
                <h1 class="drilldown-title" v-if="params.drill_down_params.headline_config">
                    {{ params.drill_down_params.headline_config.title }}</h1>
                <component :is="'GenericLayout'" :params="params.drill_down_params"
                    :isDrillDown="true" :view_ID="view_ID" :drillDataProp="drilldownData" :parentsParam="params"
                    :static_drill_titles_prop="params.static_drill_titles_param_copy"
                    :drillCarouselIndexProp="drillCarouselIndex" :popup_drill_do_intersection_prop="popup_drill_do_intersection">
                </component>
            </div>
        </div>


        <div class="data-status-pod" v-else>
            <div class="loader" v-if="!isErrorMsg">
                <v-progress-circular  :size="40"
        :width="4" indeterminate :style="{ color: getCurrentTheme.global_theme_color }">
                </v-progress-circular>
            </div>
            <div v-else>
                <v-row style="place-content: center;margin:0;margin-bottom:10px">
            <ChartTitles :isDrillDown="isDrillDown" :params="params" :carouselActiveIndex="carouselActiveIndex" :static_drill_titles_prop="static_drill_titles_prop"></ChartTitles>
        </v-row>
            
            <h1 style="font-family: almoni;font-size:20px"> {{ errorMSG }} </h1>
        </div>
        </div>
    </div>
</template>

<script>

import ThreeDotsNineDots from '../utils/ThreeDotsNineDots.vue'
import ChartTitles from '../utils/ChartTitles.vue'
import NoDataMsg from '../utils/NoDataMsg.vue'
import MetaText from '../utils/metaText.vue'
import MetaLegend from '../utils/metaLegend.vue'
import AdminPanel from '../utils/adminPanel.vue'
export default {
    props: {
        isDrillDown: { type: Boolean },
        drillDataProp: { type: Object, default: () => { } },
        params: { type: Object, required: false },
        view_ID: { type: Number },
        parentsParam: { type: Object },
        static_drill_titles_prop: { type: Object },
        drillCarouselIndexProp: { type: Number },
        template_type:{ type: String },
        staticData:{ type: Object, required: false },
        popup_drill_do_intersection_prop:{type: Object, required: false}
    },
    watch: {
        drillDataProp() {
            this.jsonData = this.drillDataProp
        },
        'params.selected_category'(newVal){
          console.log("Dsadas",newVal);
          this.carouselActiveIndex = 0
    }
    },
    data() {
        return {
            scrollDownOptions:{
                top: 120,
                behavior: 'smooth'
            },
            tickCycleTime: undefined,
            activeLabelIndex: 0,
            activeIndex: -1,
            hasMainDataRecieved: false,
            selectedIndex: undefined,
            errorMSG: "",
            carouselActiveIndex: 0,
            carouselIndex: 0,
            drilldownData: [],
            jsonData: [],
            doneFetching: false,
            drillCarouselIndex: 0,
            intersectionDrillData: {},
            meta_drill_data:{},
            meta_data:{},

            popup_intersection : {},
            popup_drill_do_intersection : {},
        }
    },
    components: {
    ThreeDotsNineDots,
    ChartTitles,
    GenericLayout: () => import("../global/GenericLayout.vue"),
    NoDataMsg,
    MetaText,
    MetaLegend,
    AdminPanel
},
    methods: {
        async fetchClock() {
            // console.log("Loading Clocks...") // SHOW LOADER
            this.doneFetching = false 
            this.LoadDrillCarouselIndex()
            this.LoadQuickViewCarouselIndex()
            if(this.isDrillDown){ this.LoadDrillData() }
            else{
                await this.fetchMainData()
                if(this.hasMainDataRecieved && this.params.drill_down_params){ await this.fetchDrillData() }
            }
            if(!this.hasErrorMsg()){
                // console.log("Showing Clocks") // SHOW CLOCK
                this.doneFetching = true
            } 
            //this.tick(this.params.sample_rate)
        },
        LoadDrillData(){
            if(this.drillDataProp != undefined){
                this.jsonData = this.drillDataProp
            }
        },
        LoadDrillCarouselIndex(){
            if(this.isDrillDown){ 
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

                        this.updateMetaData(this.jsonData)
                        
                        // if (Object.prototype.hasOwnProperty.call(response.data, 'meta')) {
                        //     this.meta_data = response.data["meta"]
                        //     delete response.data["meta"];
                        // }
                    })
                    .catch(error => {
                        console.log(error, "Main Clock Data GET request FAIL, PLEASE Check BackEnd & Db")
                        this.errorMSG = "אין מידע"
                        this.hasMainDataRecieved = false
                        if(error.response.status == 405){
                                window.location.href = this.$store.state.serverAdrr + "/adfs_mobile";
                            }
                    });
        },
        async fetchDrillData(){
            this.params.static_drill_titles_param_copy = this.params.static_drill_titles_param
                    await this.$myApi(this.params.drill_down_params.data_url)
                        .then(response => {
                            this.drilldownData = Object.assign(response.data)
                            this.updateMetaData(this.drilldownData,true)
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
                            if(error.response.status == 405){
                                window.location.href = this.$store.state.serverAdrr + "/adfs_mobile";
                            }
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
        // tick(time){
        //     if(time){
        //         this.tickCycleTime = setTimeout(this.fetchClock, time );
        //         console.log("pasa",this.params);
        //     }
        //     else{
        //         this.tickCycleTime = setTimeout(this.fetchClock, this.$store.state.default_sample_rate );
        //         console.log("setttime",this.tickCycleTime);
        //     }
        // },
        BoxClick(i) {
            if(this.params.isPopupData){
                // this.activeIndex = i
                console.log(this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].label);
                this.$store.state.popupData.popup_url = this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].popup_url
                this.$store.state.popupData.popup_title = this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].popup_title
                this.$store.state.popupData.popup_sub_title = this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].popup_sub_title
                this.$store.state.popupData.showPopupData = true
                this.$store.state.popupData.params_popup_data = this.params.popup_data
                console.log("params_popup_data",this.params.popup_data);
                
                this.$store.state.popupData.popup_data = this.isDrillDown ? this.popup_drill_do_intersection_prop : this.popup_intersection
                console.log("hahahagaagfga");
                this.$store.state.popupData.selected_label = this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].label
                console.log("hahahagaagfga");
            } else {
                console.log("ininininin");
            console.log("recieved generic label click, index:",i)
            this.loadIntersectionData(i)
            this.expandDrillHandler(i)
            }
            
        },
        loadIntersectionData(i){
            if (this.params.data_intersection) {
                console.log("Load Data Intersection")
                this.activeLabelIndex = i
                this.drilldownData = this.intersectionDrillData[this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].label]
                this.params.static_drill_titles_param_copy = this.params.static_drill_titles_param[this.jsonData[this.params.selected_category][this.carouselActiveIndex][i].label]
            }
        },
        expandDrillHandler(i){
            if (this.params.click_open_drill_enabled) {
                if (!this.params.expand || i != this.selectedIndex) {
                    if(!this.params.expand){
                        this.scrollWin(this.scrollDownOptions)
                        console.log("Expanding...")
                    }
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
        },
        updateMetaData(data,isDrillMeta=false,isStaticDa=false){
            console.log("isDrillMeta",isDrillMeta);
            if (Object.prototype.hasOwnProperty.call(data, 'popup_intersection')) {
                           if(isDrillMeta){
                            this.popup_drill_do_intersection = Object.assign({},data["popup_intersection"])
                            delete data["popup_intersection"];
                           } else {
                            this.popup_intersection = Object.assign({},data["popup_intersection"])
                            delete data["popup_intersection"];
                           }
                        }
            if (Object.prototype.hasOwnProperty.call(data, 'meta') && isDrillMeta) {
                console.log("drilllllllllllllllllllllllllllllllllllllll");
                            console.log(isDrillMeta,"drill_meta");
                            console.log(isStaticDa);
                            console.log("drill_meta",data["meta"]);
                            
                            for (let [key, value] of Object.entries(data["meta"])) {
                                    console.log(data["meta"],"metaaaaaaaaaaa");
                                    // eslint-disable-next-line
                                    this.params.drill_down_params[key] = value
                                    //delete data["meta"];
                            } }


            if (Object.prototype.hasOwnProperty.call(data, 'meta') && !isDrillMeta) {
                console.log("main_Data",isDrillMeta);
                console.log("main_Data",data["meta"]);



                            for (let [key, value] of Object.entries(data["meta"])) {
                                    console.log(data["meta"]);
                                    // eslint-disable-next-line
                                    this.params[key] = value
                                    //delete data["meta"];
                            }
                        }
                        

        },
        scrollWin(options) {
            window.scrollBy(options);
            }
    },
    created() {
        if(this.staticData){
            this.updateMetaData(this.staticData,false,true)
            this.jsonData = this.staticData
            // console.log("dsdsds",this.isPopupData.length);
            this.doneFetching = true

        } else {
            this.$on("myIndex", (i) => {
            this.drillCarouselIndex = i
            })
            this.fetchClock()

            if (this.params.sample_rate) {
                this.tickCycleTime = setInterval(() => {
                    this.fetchClock()
                }, this.params.sample_rate)
            }
            else {
                this.tickCycleTime = setInterval(() => {
                    this.fetchClock()
                }, this.$store.state.default_sample_rate)
            }

        }
        
        
        
    },
    beforeDestroy() {
        this.$parent.$emit("myIndex", this.carouselActiveIndex)
        if(this.tickCycleTime){
        clearTimeout(this.tickCycleTime)
        }
    },
    computed: {
        stepComponent() {
                return () => import(`../widgets/${this.active_template_type}`);
            },
        active_template_type() {
            return this.isDrillDown ? this.params.template_type : this.template_type
        },
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
:deep() .v-input--selection-controls__ripple {
    height: 0px;
}

:deep() .v-input--selection-controls__input .v-icon {
    color: v-bind('getCurrentTheme.global_radio');
}
.clock-main{
    min-height: v-bind('params.comp_min_height ? params.comp_min_height : ""');
}
:deep() .v-input--selection-controls .v-radio>.v-label {
    color: v-bind('getCurrentTheme.drill_title_color');
    margin-right: 4px;
    margin-left: 8px;
}

:deep() .v-input--radio-group.v-input--radio-group--row .v-radio {
    margin-right: 0px !important;
}




.headline-title {
  color: #0F2558;
  font-family: almoni-medium;
  font-size: 22px;
}
.radios {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.KPIcontainer {
    display: grid;
    grid-template-columns: auto auto;
    row-gap: 6px;
    column-gap: 8px;
    justify-content: center;
    padding-bottom: 8px;
}

.kpi-box {
    padding-top: 0px;
    text-align: center;
    align-items: center;
    width: 159px;
    height: 80px;
    border-radius: 4px;
}

.loader {
    height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
}

.data-status-pod {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-self: center;
    padding-bottom: 20px;
}

/* .v-progress-circular {
    padding: 40px;
} */

.clock-drilldown {
    background-color: #E5E5E5;
    padding-bottom: 0px !important;
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
    margin-right: 2px;
}

.carousel-flex :deep() .v-window__prev {
    background-color: transparent !important;
    color: transparent !important;
    top: 40% !important;
    margin-left: 2px;
}

.carousel-flex :deep() .v-window__next img{
    padding-left: 11px;
}

.carousel-flex :deep() .v-window__prev img{
    padding-right: 11px;
}

.radio-btn {
    display: inline-block !important;
    ;
}
</style>