<!-- eslint-disable -->
<template>
    <!-- values -->
    <div class="PIEcontainer" dir="rtl" v-if="!noData(activeData)">
        <BaseGenericPie :chartData="activeData" :isDrill="props_object.isDrillDown"
            :isPrecentage="props_object.params.isPrecentage" :isNumber="props_object.params.isNumber"
            @handleIntersection="pieClick" />
    </div>
    <div v-else>
        <NoDataMsg :isDrill="props_object.isDrillDown" :message="props_object.params.no_data"/>
    </div>
</template>

<script>
import NoDataMsg from '../utils/NoDataMsg.vue';
import BaseGenericPie from './genericPie/baseGenericPie.vue'

// axios.defaults.timeout = 1000
export default {
    // name:"basicKPI",
    props: ["activeData", "props_object"],
    components: {
    BaseGenericPie,
    NoDataMsg
},
    created(){
        // this.activeData[0]['value'] = 1

    },
    // toggel drill down from a label click if click_open_drill_enabled = true in the config
    methods:{
        pieClick(i) {
        this.$emit('BoxClick',i)
        },
        noData(arr){return arr.every(function(obj) {
    return obj.value === 0;
});}
    },
    computed: {
    },
}
</script>

<style scoped>
</style>