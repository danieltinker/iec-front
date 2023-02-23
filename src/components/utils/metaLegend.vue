<template>
    <div style="text-align: center;" class="meta-container">
        

        <v-row dir="rtl" style="place-content:center;display: inline-flex;">
                <div v-for="(item, index) in meta_labels" :key="index" class="labels">
                    <span class="dot" style="margin-left:4px"
                        :style="{ backgroundColor: item.color}"></span>
                    <span :style="'color:' + getCurrentTheme.baseGenericPie.span_color" style="margin-left:4px">
                        {{ item.label }}
                    </span>
                </div>
            </v-row>

        <!-- <div v-for="(item,index) in test" :key="index" style="display:inline;">
            <div style="display: inline;" class="main-label">{{ item.label }}<v-icon :color="item.color" style="font-size: 15px;margin-left:4px">mdi-circle</v-icon></div>
            
        </div> -->


    </div>
</template>


<script>
export default {
    props: {
        meta_labels: { type: Object, required: false },
    },
    data() { 
        return {
            test: [{ "label": "בדיקה", "color": "blue" },{ "label": "בדיקה", "color": "green" },{ "label": "בדיקה", "color": "black" },{ "label": "בדיקה", "color": "gray" }]
        }
    },
    computed: {
    }

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

.dot {
    align-self: center;
    height: 11px;
    width: 11px;
    border-radius: 50%;
    display: flex;
    margin: 2%;
    margin-right: 0;
    direction: rtl;
}

.meta-container {
    margin-left: 5%;
    margin-right: 5%;
}
.main-label{
    color:v-bind('getCurrentTheme.kpi.main_label');
    font-size:14px;
    font-family:almoni
}
</style>