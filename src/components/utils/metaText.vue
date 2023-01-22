<template>
    <div style="text-align: right;" class="meta-container">
        <div v-for="(item,index) in test" :key="index">
            <div v-if="item.title.length !== 0" class="main-title">{{ item.title }}</div>
            <div v-if="item.text.length !== 0" class="main-subtitle">{{ item.text }}</div>
        </div>


    </div>
</template>


<script>
export default {
    props: {
        text: { type: Object, required: false },
    },
    data() { 
        return {
            test: [{ "title": "נות", "text": "אירוע תוצאתי מאירוע מספק 47112 - אין ספיקות בסולר בכניסה ליחידה" }, { "title": "הערות", "text": "ירוע תוצאתי מאירוע מספק 47582 - שיפוץ MAJOR ט" }, { "title": " צפי לחזרת היחידה", "text": "29/04/2022" }, { "title": "ti11", "text": "text11" }]
        }
    },
    computed: {
    }

}
</script>

<style scoped>

.meta-container {
    margin-left: 5%;
    margin-right: 5%;
}
.main-title{
    color:v-bind('getCurrentTheme.kpi.value_color');
    font-size:16px;
    font-family:almoni-bold
}
.main-subtitle{
    color:v-bind('getCurrentTheme.kpi.main_label');;
    font-size:16px;
    font-family:almoni;
    margin-bottom:6px

}
</style>