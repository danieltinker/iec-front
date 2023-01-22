<template>
    <!-- <div  style="position: relative"></div> -->
    <div>
        <div v-if="doneFetching">
            <div>
                <div dir="ltr">
                    <apexchart style="overflow-y: hidden; margin-right: 7px;dir:ltr" ref="chart" type="line"
                        height="250px" width="100%" :options="chartOptions" :series="series"></apexchart>
                </div>

            </div>
            <div class="btn-container"></div>
            <graphButtons :arr_buttons="getButtons" :props_object="props_object" @buttonClick="toggleLine" />
        </div>
    </div>
</template>




<script>

import graphButtons from './graphButtons.vue'
export default {
    computed: {
        getButtons() {
            let obj = []
            this.series.map(element => element.name).forEach((el, index) => obj.push({ "label": el, "color": this.chartOptions.colors[index] }));
            return obj

        },
    },
    components: { graphButtons },
    name: "line-chart-display",

    // Component Parameters
    props: ["activeData", "props_object"],
    watch: {
        activeData(){
            console.log("dsadas");
        },
        getCurrentTheme() {
            for (let i in this.chartOptions.yaxis) {
                if(!this.isStaticStyleColor){
                    this.chartOptions.yaxis[i].labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
                }
            }
            this.chartOptions.xaxis.labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
            this.$refs.chart.updateOptions(
                this.chartOptions);
        }
    },
    data() {
        return {
            isStaticStyleColor: false,
            doneFetching: false,
            series: [],
            chartOptions: undefined
        };
    },

    created() {
        this.chartOptions = Object.assign({}, require('./garphConfig.json'))
        this.chartOptions.xaxis.labels.formatter = function (value, timestamp) {
            const dateTimeFormat = new Intl.DateTimeFormat('en', { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })
            var [{ value: month }, , { value: day }, , { value: hour }, , { value: minute }] = dateTimeFormat.formatToParts(new Date(timestamp))
            if (hour == 24) hour = 0
            return `${hour}:${minute}  ${day}/${month}`;
            //return new Date(timestamp) // The formatter function overrides format property
        }


        //update config if get
        this.props_object.params.graphConfig ? this.updateKey() : false
        console.log(this.activeData);


        for (let i in this.activeData) {
            this.series.push({
                name: this.activeData[i]['name'],
                type: 'line',
                data: this.activeData[i]['data'].map(x => [x[0] * 1000, x[1]])
            })
        }
        for (let i in this.chartOptions.yaxis) {
            this.chartOptions.yaxis[i].labels.style.colors ? false : this.chartOptions.yaxis[i].labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1
            this.chartOptions.yaxis[i].labels.style.fontFamily = "almoni"
            this.chartOptions.yaxis[i].labels.style.fontSize = "12px"
        }
        this.chartOptions.xaxis.labels.style.colors = this.getCurrentTheme.cyber_status.box_color_1;
        this.doneFetching = true
    },

    methods: {
        toggleLine(index) {
            this.$refs.chart.toggleSeries(index);
        },
        updateKey() {
            for (let [key, value] of Object.entries(this.props_object.params.graphConfig)) {
                this.chartOptions = {...this.chartOptions,...{[key]:value}}
                // if (Object.prototype.hasOwnProperty.call(obj, key)) {
                //     key == "yaxis" ? this.isStaticStyleColor = true : false
                //     obj[key] = obj2[key]
                // }
            }
            console.log("dsdsds",this.chartOptions);
        }
    }
};
</script>



<style scoped>
.btn-container {
    margin-left: 4%;
    margin-right: 4%;
    margin-top: -10px;
    text-align: -webkit-right;
}

.chartsHeaders {
    display: flex;
    align-self: center;
    height: 100%;
    font-family: almoni-bold;
    margin-right: 2%;
    font-size: 22px;
    color: #f67200;
    direction: rtl;
}

.areaTitle {
    margin-left: auto;
    font-size: 130%;
    font-weight: bold;
    font-family: almoni;
    padding: 0 10px 10px 10px;
    margin-right: 2%;
    height: 20px;
}


:deep() .apexcharts-tooltip{
    direction: rtl;
    background-color: white !important;
    background-color: v-bind('getCurrentTheme.app_background') !important;
    color: v-bind('getCurrentTheme.drill_title_color') !important;
    font-family: almoni;
}

:deep() .apexcharts-tooltip-marker{
    margin-right: 0px;
    margin-left: 10px;
    direction: ltr;
}
:deep() .apexcharts-tooltip-title{
    direction: rtl;
    background-color: v-bind('getCurrentTheme.app_background') !important;
    color: v-bind('getCurrentTheme.drill_title_color') !important;
    font-family: almoni;
}
:deep() .apexcharts-xaxis-texts-g{
    direction: rtl;
} 

/* :deep() .apexcharts-zoomin-icon,
:deep() .apexcharts-zoomout-icon,
:deep() .apexcharts-zoom-icon,
:deep() .apexcharts-pan-icon {
    margin-bottom: 15px;
}

:deep() .apexcharts-legend-series:nth-child(1) {
    margin-left: -10px !important;
}

:deep() .apexcharts-legend-series:nth-child(2) {
    margin-right: 32px !important;
}

:deep() .apexcharts-legend-text {
    margin-right: 5px !important;
    place-content: end !important;
    color: v-bind('getCurrentTheme.cyber_status.box_color_1') !important;
} */
</style>

