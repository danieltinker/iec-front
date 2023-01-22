<!-- eslint-disable -->
<template>
    <div dir="ltr">
        <!-- <LineChart style="text-align: -webkit-center;" :series="activeData" :options="props_object.params.options" /> -->
        <LineChartV2 :activeData="activeData" :props_object="props_object"/>
    </div>
</template>

<script>
import LineChart from "../widgets/genericLineChart/LineChart.vue"
import LineChartV2 from "./genericLineChart/LineChartV2.vue";
export default {
    props:["activeData","props_object"],
    components:{ LineChart, LineChartV2 }
}
</script>

<style scoped>
</style>