<!-- eslint-disable -->
<template>
    <div dir="ltr" v-if="activeData.length !== 0">
        <!-- <LineChart style="text-align: -webkit-center;" :series="activeData" :options="props_object.params.options" /> -->
        <LineChartV2 :activeData="activeData" :props_object="props_object"/>
    </div>
    <div v-else>
        <NoDataMsg :isDrill="props_object.isDrillDown" :message="props_object.params.no_data"/>
    </div>
</template>

<script>
import NoDataMsg from "../utils/NoDataMsg.vue";
import LineChart from "../widgets/genericLineChart/LineChart.vue"
import LineChartV2 from "./genericLineChart/LineChartV2.vue";
export default {
    props:["activeData","props_object"],
    components:{ LineChart, LineChartV2, NoDataMsg }
}
</script>

<style scoped>
</style>