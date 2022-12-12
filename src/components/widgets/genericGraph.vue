<!-- eslint-disable -->
<template>
    <div>
        <LineChart :series="activeData" :options="props_object.params.options" />
    </div>
</template>

<script>
import LineChart from "../widgets/genericLineChart/LineChart.vue"
export default {
    props:["activeData","props_object"],
    components:{LineChart}
}
</script>

<style scoped>
</style>