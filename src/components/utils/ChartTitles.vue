<template>
    <div>

        <span id="chartsHeaders" v-if="!isDrillDown">
                            {{ params.chart_titles[params.selected_category][carouselActiveIndex] }}
                        </span>
                        <span id="chartsHeaders" v-if="isDrillDown && !params.data_intersection">
                            {{ static_drill_titles_prop["*"][params.selected_category][carouselActiveIndex] }}
                        </span>
                        <span id="chartsHeaders" v-if="isDrillDown && params.data_intersection">
                            {{ static_drill_titles_prop[params.selected_category][carouselActiveIndex] }}
                        </span>
    </div>
</template>

<script>
export default {
    props: {
        isDrillDown: { type: Boolean },
        params: { type: Object, required: false },
        static_drill_titles_prop: { type: Object },
        drillCarouselIndexProp: { type: Number },
        carouselActiveIndex:{ type: Number },
    }
}
</script>

<style>
#chartsHeaders {
    font-family: almoni-medium;
    font-size: 18px;
    color: v-bind('getCurrentTheme.generic_title_color');
    /* margin-bottom: 18px; */
}

</style>