<!-- eslint-disable -->
<template>
    <div class="PIEcontainer" dir="rtl">
        <BaseGenericPie :chartData="activeData" :isDrill="props_object.isDrillDown"
            :isPrecentage="props_object.params.isPrecentage" :isNumber="props_object.params.isNumber"
            @handleIntersection="pieClick" />
    </div>
</template>

<script>
import BaseGenericPie from './genericPie/baseGenericPie.vue'

// axios.defaults.timeout = 1000
export default {
    // name:"basicKPI",
    props: ["activeData", "props_object"],
    components: {
        BaseGenericPie
    },
    // toggel drill down from a label click if click_open_drill_enabled = true in the config
    methods:{
        pieClick(i) {
        this.$emit('BoxClick',i)
        },
    },
    computed: {
    },
}
</script>

<style scoped>
</style>