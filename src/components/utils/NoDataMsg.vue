<template>
    <div>
        <div class="no-data-box" v-if="true"><p class="no-data-info">אין פריטים זמינים להצגה</p></div>
    </div>
</template>

<script>
export default {
    props: {
        templateType: { type: String },
        isDrill:{type:Boolean}
        }
}
</script>

<style scoped>
.no-data-box{
    display: flex;
    color:v-bind('getCurrentTheme.generic_title_color');
    align-items: center;
    vertical-align: center;
    justify-content: space-around;
    padding-top: 10px;
    background-color: v-bind('isDrill ? getCurrentTheme.kpi.drill_background : getCurrentTheme.kpi.main_no_data_background');
    margin: auto;
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
    width: 220px;
    height: auto;
    border-radius: 4px;
    font-size: 18px;
    font-family: almoni-demibold;
}

.no-data-info{
    width: 200px;
    height: 20px;
    font-size: 14px;
}
</style>