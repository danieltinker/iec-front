<template>
    <div dir="ltr" style="text-align: -webkit-right;margin-right:10%">
        <div v-for="(item, index) in activeData" :key="index">
            <div style="margin-top:20px">
            <span :style="{ color: getCurrentTheme.kpi.main_label }" style=" font-family: almoni-bold"
                class="kpi-label">
                {{ item.label }}
            </span>
            <br>
            <span class="kpi-value" style=" font-family: almoni"
                :style="{ color: getCurrentTheme.kpi.value_color }">
                {{ item.value }}
            </span>
            <br>
        </div>
    </div>
    </div>
</template>

<script>
export default {

    props:["activeData","props_object"],
    
}
</script>