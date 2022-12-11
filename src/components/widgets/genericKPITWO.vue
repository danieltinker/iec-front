<!-- eslint-disable -->
<template>
    <div class="KPI2container" dir="rtl">
        <div class="kpi-box" v-for="(item, index) in activeData" :key="index" :style="{
            backgroundColor: props_object.isDrillDown ? getCurrentTheme.kpi.drill_background : getCurrentTheme.kpi.main_background,
            border: props_object.activeIndex == index ? getCurrentTheme.legend_border_color : ' solid black 0px'
        }" @click="$emit('BoxClick',index)">

            <div class="grid-container" :style="{ 'grid-template-columns': getWidth(item) }">
                <div class="grid-item">
                    <span style="display:block;word-wrap: break-word;text-align: -webkit-right;font-family: almoni-bold"
                        :style="{ color: getCurrentTheme.kpi.main_label }">{{ item.label }}
                    </span>
                </div>
                <div class="grid-item">
                    <strong v-if="typeof item.value == 'string' && item.value.split('*-*')[0] == 'dot'" class="dot"
                        :style="'background-color:' + item.value.split('*-*')[1]"></strong>
                    <span v-else
                        style="display:block;word-wrap: break-word;text-align: -webkit-right;font-family: almoni-medium"
                        :style="{ color: getCurrentTheme.kpi.value_color }"> {{ item.value }}
                    </span>
                </div>
                <div class="grid-item">
                    <span style="display:block;word-wrap: break-word;text-align: -webkit-right;"
                        :style="{ color: getCurrentTheme.kpi.kpi_sec_value }">
                        {{ item.secondary_value }} </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:["activeData","props_object"],
    computed: {
    },
    methods:{
        getWidth(item) {
            let MyWidth = 0
            let obj_arr = Object.keys(item)
            if (obj_arr.includes("secondary_value")) {
                MyWidth++
            }
            if (obj_arr.includes("label")) {
                MyWidth++
            }
            if (obj_arr.includes("value")) {
                MyWidth++
            }
            let test = 100 / MyWidth + "%"
            return test + " " + test + " " + test
        }
    }

}
</script>

<style scoped>
/* :deep() .v-input--selection-controls__ripple {
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
} */

.flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.KPI2container {
    display: inline-block;
    justify-content: center;
    padding-bottom: 20px;
}

.kpi-box {
    display: flex;
    justify-content: space-around;
    padding-top: 4px;
    margin-top: 5px;
    text-align: center;
    /* align-items: center; */
    width: 304px;
    height: auto;
    border-radius: 4px;
    font-size: 18px;
    font-family: almoni-demibold;
}

.kpi-label {
    /* padding-right: 8px;
    width: 200px; */

    padding-top: 0px;
    padding-bottom: 0px;
}

.kpi-value {
    width: 60px;
}

.kpi-value-sec {
    width: 60px
}
/* 
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
} */

.kpi-box span {
    display: flex;
    font-size: 16px;
    font-family: almoni-demibold;
    color: #a8699d;
}

.kpi-box .kpi-sec-value {
    color: #606060
}

/* #chartsHeaders {
    font-family: almoni-medium;
    font-size: 18px;
    color: v-bind('getCurrentTheme.generic_title_color');
    margin-bottom: 18px;
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
    margin: 0px !important;

}

.carousel-flex :deep() .v-window__prev {
    background-color: transparent !important;
    color: transparent !important;
    top: 40% !important;
    margin: 0px !important;

}

.radio-btn {
    display: inline-block !important;
    ;
} */

.grid-container {
    width: 306px;
    display: grid;
    /* grid-template-columns: 30% 30% 30%; */
    padding-right: 4px;
    padding-left: 4px;

}

</style>