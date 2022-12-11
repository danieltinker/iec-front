<!-- eslint-disable -->
<template>
    <div class="KPIcontainer">
        <div class="kpi-box" style="padding-right:5px;padding-left:5px" v-for="(item, index) in activeData" :key="index"
            :style="{
                backgroundColor: props_object.isDrillDown ? getCurrentTheme.kpi.drill_background : getCurrentTheme.kpi.main_background,
                border: props_object.activeIndex == index ? getCurrentTheme.legend_border_color : ' solid black 0px'
            }" @click="$emit('BoxClick',index)">
            <span :style="{ color: getCurrentTheme.kpi.main_label }" style=" font-family: almoni-bold"
                class="kpi-label">
                {{ item.label }}
            </span>
            <br>
            <span class="kpi-value" style=" font-family: almoni-medium"
                :style="{ color: getCurrentTheme.kpi.value_color }">
                {{ item.value }}
            </span>
            <br>
            <span :style="{ color: getCurrentTheme.kpi.kpi_sec_value }">
                {{ item.secondary_value }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props:["activeData","props_object"],
    computed: {
    },

}
</script>

<style scoped>
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

.kpi-box .kpi-sec-value {
    color: #606060
}


.kpi-box span {
    display: inline-block;
    font-size: 18px;
    font-family: almoni;
    color: #a8699d;
}









/* :deep() .v-input--selection-controls__ripple {
    height: 0px;
}

:deep() .v-input--selection-controls__input .v-icon {
    color: v-bind('getCurrentTheme.global_radio');
} */

/* :deep() .v-input--selection-controls .v-radio>.v-label {
    color: v-bind('getCurrentTheme.drill_title_color');
    margin-right: 6px;
} */

/* :deep() .v-input--radio-group.v-input--radio-group--row .v-radio {
    margin-right: 0px !important;
} */

/* .flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
} */

/* .kpi-box span:first-child{
    font-family: almoni;
    font-size: 20px;
    line-height: 30px;
} */

/* .loader {
    height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
}

.v-progress-circular {
    padding: 40px;
} */

/* .kpi-box span{
    display: inline-block;
    font-size: 16px;
    font-family: almoni;
    color: #a8699d;
} */





/* 
#chartsHeaders {
    font-family: almoni-medium;
    font-size: 18px;
    color: v-bind('getCurrentTheme.generic_title_color');
    margin-bottom: 18px;
} */

/* .drilldown-title {
    padding-top: 16px;
    color: v-bind('getCurrentTheme.drill_title_color');
    font-size: 24px;
    text-align: center;
    font-family: almoni;
} */







/* .clock-drilldown {
    background-color: #E5E5E5;
    padding-bottom: 20px;
} */
/* 
.carousel-flex {
    display: flex;
    flex-direction: column;
}

.carousel-flex :deep() .v-window__next {
    background-color: transparent !important;
    color: transparent !important;
    top: 40% !important;
    margin-right: 2px;
} */

/* .carousel-flex :deep() .v-window__prev {
    background-color: transparent !important;
    color: transparent !important;
    top: 40% !important;
    margin-left: 2px;
} */

/* .radio-btn {
    display: inline-block !important;
    ;
} */
</style>