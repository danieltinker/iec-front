<!-- eslint-disable -->
<template>
    <div>
        <h1>dsadasdas</h1>
        {{charDATA_test}}
                    <BaseGenericPie :chartData="charDATA_test" :isDrill="isDrillDown"
                            
                            @handleIntersection="pieClick" />

    </div>
</template>

<script>
import ThreeDotsNineDots from '../utils/ThreeDotsNineDots.vue'
import BaseGenericPie from './genericPie/baseGenericPie.vue'
import genericLayout from "../global/genericLayout.vue"

// axios.defaults.timeout = 1000
export default {
    // name:"basicKPI",
    components:{
        BaseGenericPie,
        genericLayout
    },
    props: {
        isDrillDown: { type: Boolean },
        drillDataProp: { type: Object, default: () => { } },
        params: { type: Object, required: false },
        // view_ID: { type: Number },
        // parentsParam: { type: Object },
        // static_drill_titles_prop: { type: Object },
        // drilldown_meta:{type:Object},
        // drill_carousel_index:{type:Number},
        charDATA_test:{type: Array }
    },
    methods:{
        pieClick(){
            console.log("Dasdsa")
        }
    }
    
}
</script>

<style scoped>


:deep() .v-input--selection-controls__ripple {
    height: 0px;
}
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