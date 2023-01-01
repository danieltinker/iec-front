<!-- eslint-disable -->
<template>
    <div class="barcontainer" dir="rtl">
        <!-- <hr style="display: block; z-index: 1; position: relative; top: 35px; border: 1px solid #FF0100;"
        :style="{top: (169 * (4272 / (Math.max(...activeData.map(obj => obj.value)))).toFixed(1) + 35)+ 'px'}"> -->
        
        <v-row dir="rtl" style="margin-top:10px;margin-bottom: 20px; place-content: center">
            <oneBar v-for="(item, index) in activeData" :isSelectedIndex="props_object.activeIndex === index"
                :isSelected="props_object.activeIndex != -1" :key="index" v-on:click.native="$emit('BoxClick',index)" :params="props_object.params"
                :data="item.color ? item.max_value ? item : getTotal(activeData, item) : item.max_value ? getColor(item, index) : getColor(getTotal(activeData, item), index)" />
        </v-row>
        <div style="text-align: -webkit-center;">
        <!-- <hr style="display: block; z-index: -1; position: relative; bottom:20px; border: 1px solid #FF0100;width:80%"
        :style="{bottom: (169 * (8544 / (Math.max(...activeData.map(obj => obj.value)))).toFixed(1) + 20)+ 'px'}"
        > -->
    </div>

        <div class="btn-container">
            <v-row dir="rtl" style="place-content:right;display: inline-flex;"
                v-if="props_object.params.data_intersection || props_object.params.click_open_drill_enabled">
                <v-btn class="main-btn" :ripple="false" v-for="(btnName, index) in activeData" :key="index"
                    :style="{ backgroundColor: props_object.isDrillDown ? getCurrentTheme.baseGenericPie.btn_color_drill : getCurrentTheme.baseGenericPie.btn_color, border: props_object.activeIndex == index ? getCurrentTheme.legend_border_color : ' solid black 0px' }"
                    @click="$emit('BoxClick',index)">
                    <span class="dot"
                        :style="{ backgroundColor: btnName.color ? btnName.color : getColor(btnName, index).color }"></span>
                    <span class="btn-span" :style="'color:' + getCurrentTheme.baseGenericPie.span_color">
                        {{ btnName.label }}
                    </span>
                </v-btn>
            </v-row>

            <v-row dir="rtl" style="place-content:center;display: inline-flex;"
                v-if="!props_object.params.data_intersection && !props_object.params.click_open_drill_enabled">
                <div v-for="(btnName, index) in activeData" :key="index" class="labels">
                    <span class="dot" style="margin-left:5px"
                        :style="{ backgroundColor: btnName.color ? btnName.color : getColor(btnName, index).color }"></span>
                    <span :style="'color:' + getCurrentTheme.baseGenericPie.span_color" style="margin-left:5px">
                        {{ btnName.label }}
                    </span>
                </div>
            </v-row>
        </div>


    </div>
</template>

<script>
import oneBar from './genericBAR/oneBar.vue';

export default {
    props:["activeData","props_object"],
    watch: {
        drillDataProp() {
            this.jsonData = this.drillDataProp
        }
    },
    data() {
        return {
            defaultColors: ["#0073FF", "#FF8D00", "#8FC602", "#C10015", "#0073FF", "#FF8D00", "#8FC602", "#C10015"]
        }
    },
    components: {
        oneBar,
    },
    methods: {
        getTotal(item, obj) {
            obj.max_value = item.reduce(function (acc, obj) { return acc + obj.value; }, 0);
            return obj
        },
        getColor(obj, index) {
            obj.color = this.defaultColors[index]
            return obj
        }
    },
    computed: {
        my_center(){
        let width = screen.width;
        let xn = (width-331) / 2
        return xn + "px"
      }
    },

}
</script>

<style scoped>

.labels {
    font-size: 16px;
    font-family: almoni;
    display: -webkit-inline-box;
    -webkit-box-align: center;
    margin-left: 10px;
}

.btn-container{
    margin-left:4%;
    margin-right:4%;
    padding-bottom: 20px;
   }
   @media only screen and (max-width: 780px) {
  .btn-container {
    margin-left:v-bind('my_center');
    margin-right:v-bind('my_center');
    padding-bottom: 20px;


}
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
    font-size: 14px;
    letter-spacing: 0;
    
}

.main-btn {
    font-family: almoni;
    margin: 8px;
    justify-content: right;
    overflow: hidden;
    border-radius: 6px;
    width: 102px !important;
    box-shadow: 0px 0px !important;
    box-shadow: 2px 2px 2px rgba(148, 148, 148, 0.427) !important;

    /* text-align: -webkit-right;
         */
}

.main-btn::before {
    display: none;
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
}



/* :deep() .v-input--selection-controls__ripple {
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
} */

/* 
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
    margin-bottom: 18px;
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
} */


</style>