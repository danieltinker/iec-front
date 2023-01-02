<template>
    <div>
        <div class="no-data-box" v-if="true"><p class="no-data-info">אין פריטים זמינים להצגה</p></div>
    </div>
</template>

<script>
export default {
    props: {
        templateType: { type: String }
        }
}
</script>

<style>
.no-data-box{
    display: flex;
    align-items: center;
    vertical-align: center;
    justify-content: space-around;
    padding-top: 10px;
    background-color: v-bind('getCurrentTheme.kpi.drill_background');
    margin: auto;
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
    width: 220px;
    height: auto;
    border-radius: 2px;
    font-size: 18px;
    font-family: almoni-demibold;
}

.no-data-info{
    width: 200px;
    height: 20px;
    font-size: 14px;
}
</style>