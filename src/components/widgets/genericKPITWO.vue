<!-- eslint-disable -->
<template>
    <div class="KPI2container" dir="rtl">
        <div class="no-data-box" v-if="activeData.length==0"><p>אין פריטים זמינים להצגה</p></div>
        <div v-else class="kpi-box" v-for="(item, index) in activeData" :key="index" :style="{
            backgroundColor: props_object.isDrillDown ? getCurrentTheme.kpi.drill_background : getCurrentTheme.kpi.main_background,
            border: props_object.activeIndex == index ? getCurrentTheme.legend_border_color : ' solid black 0px'
        }" @click="$emit('BoxClick',index)">

            <div class="grid-container" :style="{ 'grid-template-columns': getWidth(item) }" style="margin-right:5px">
                <div class="grid-item">
                    <span :align="props_object.params.style ? props_object.params.style.secondary_align : 'start'" style="display:block;word-wrap: break-word;font-family: almoni-bold"
                        :style="{ color: getCurrentTheme.kpi.main_label }">{{ item.label }}
                    </span>
                </div>
                <div class="grid-item" style="margin-right:2px">
                    <strong v-if="object_condition_color(item.value)" class="dot" :style="'background-color:' + item.value['color']"></strong>
                    <span v-else :align="props_object.params.style ? props_object.params.style.secondary_align : 'start'"
                        style="display:block;word-wrap: break-word;font-family: almoni-medium"
                        :style="{ color: getCurrentTheme.kpi.value_color }"> {{ item.value }}
                    </span>
                </div>
                <div class="grid-item" style="margin-right:4px">
                    <span :align="props_object.params.style ? props_object.params.style.secondary_align : 'start'" style="display:block;font-family: almoni-medium;word-wrap: break-word;"
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
    created(){
    },
    watch:{
    },
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
        },
        object_condition_color(item){
            return item ? typeof item == 'object' && Object.prototype.hasOwnProperty.call(item, 'color') : false
        },
    }

}
</script>

<style scoped>
.no-data-box{
    display: flex;
    align-items: center;
    vertical-align: center;
    justify-content: space-around;
    padding-top: 10px;
    background-color: v-bind('getCurrentTheme.kpi.drill_background');
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: center;
    width: 304px;
    height: auto;
    border-radius: 4px;
    font-size: 18px;
    font-family: almoni-demibold;
}
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
    padding-top: 0px;
    padding-bottom: 0px;
}

.kpi-value {
    width: 60px;
}

.kpi-value-sec {
    width: 60px
}
.kpi-box span {
    display: flex;
    font-size: 16px;
    font-family: almoni-demibold;
    color: #a8699d;
}

.kpi-box .kpi-sec-value {
    color: #606060
}
.grid-container {
    width: 306px;
    display: grid;
    /* grid-template-columns: 30% 30% 30%; */
    padding-right: 4px;
    padding-left: 4px;

}

</style>