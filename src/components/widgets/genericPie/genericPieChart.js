import { Doughnut } from "vue-chartjs";
import {getSelectedRadius,handleChartRadius,handleChartInnerText,pluginInnerContentHelper} from '../../../helpers/pieChartHelpers'

export default {
    extends: Doughnut,
    props: ["data", "options"],
    data(){
        return{
            defaultInnerText: this.data.datasets[0].pieInnerText,
            defaultInnerNum: this.data.datasets[0].pieInnerNum,
        }
    },
    watch: {
        data() {
            console.log("hehehehffff");
            this.renderChart(this.data, this.newOptions)
        }
    },
    mounted(){
        this.newOptions = {
            maintainAspectRatio: false,   //disable to change the height and width
            responsive: true,
            tooltips: {enabled: false},   //hide tooltips
            elements: {arc: {borderWidth: 0}},
            layout: {padding: 22},
            cutoutPercentage: 92,    // width of circle line
            animation: {duration: 300},
            legend:{display: false},

            onClick: (event,element) => {
                if(element.length!==0){
                    this.onClickLegend(element[0]._index)
                }
            }
        }
        pluginInnerContentHelper(this,'#000000')
        this.renderChart(this.data, this.newOptions)
    },
    methods:{
        onClickLegend(indexClick){
            var data = this._data._chart.tooltip._data
            var items = Object.values(Object.values(data.datasets)[0]._meta)[0]
            var indexLabelSelected = getSelectedRadius(items.data)  // return index of selcted if none selcted return -1
            handleChartRadius(items.data, indexClick, indexLabelSelected) // increase and decrease size of radius on click
            handleChartInnerText(data, indexClick, indexLabelSelected,this.defaultInnerText,this.defaultInnerNum) // plugin to render inner text data
            this._data._chart.render();
        }
    },
}