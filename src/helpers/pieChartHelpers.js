/**
* Creates a baseTemplate.
* @param {Object} [myJson] - [*] json data
* @param {Object} [innerText] - ineer text show in pie
* @param {Object} [innerNum] - inner num Total
*/
export function baseTemplate(myJson,innerText,innerNum,precentage,isNumber){
    innerNum
    //default colors static Array
    const defaultColors = ["#a8699d","#38ae10","#a8699d","#38ae10","#a8699d","#38ae10"]

    const myColors=[],data=[],labels =[]
    myJson.forEach((item,index)=>{
    myColors.push(item.color || defaultColors[index])
    data.push(item.value)
    labels.push(item.label)})
    const chartDataTemplate = {
        labels: labels,
        datasets: [
            {
            isNumber:isNumber,
            isPrecentage:precentage,
            pieInnerText:innerText,
            pieInnerNum:data.reduce((a,b)=> a+b) ,
            backgroundColor: myColors,
            data: data,
            },
        ],
    }
    return chartDataTemplate

}

export const getSelectedRadius = (chartElements) =>{
    // const innerRadiusArr =[]
    const outerRadiusArr= []
    chartElements.forEach((element) => { 
        // innerRadiusArr.push(element._model.innerRadius)
        outerRadiusArr.push(element._model.outerRadius)
    });
    return Math.max(...outerRadiusArr) ===Math.min(...outerRadiusArr) ? -1 : outerRadiusArr.indexOf(Math.max(...outerRadiusArr))
}
export const handleChartRadius = (chartElements,indexClick,indexOpen)=>{

    if(indexOpen === -1){
        chartElements[indexClick]._model.outerRadius += 5;
        // chartElements[indexClick]._model.innerRadius -= 5;
    } else{
        if(indexOpen===indexClick){
            chartElements[indexClick]._model.outerRadius -= 5;
            // chartElements[indexClick]._model.innerRadius += 5;
        }else{
            chartElements[indexClick]._model.outerRadius += 5;
            // chartElements[indexClick]._model.innerRadius -= 5;
            chartElements[indexOpen]._model.outerRadius -= 5;
            // chartElements[indexOpen]._model.innerRadius += 5;
        }
    }
}

export const handleChartInnerText = (data,indexClick,indexOpen,defaultInnerText,defaultInnerNum)=>{
    if(indexOpen===-1){ // click legend while chart is closed
        data.datasets[0].pieInnerText = data.labels[indexClick]
        data.datasets[0].pieInnerNum = data.datasets[0].data[indexClick]
        
    }
    else{
        if(indexOpen===indexClick){ // click the selected legend
            data.datasets[0].pieInnerText = defaultInnerText
            data.datasets[0].pieInnerNum = defaultInnerNum
        }
        else{ // click a legend while other legend open
            data.datasets[0].pieInnerText = data.labels[indexClick]
            data.datasets[0].pieInnerNum = data.datasets[0].data[indexClick]
        }
    }
}

export const pluginInnerContentHelper = (thisChart,myTheme) => {
    thisChart.addPlugin({
        id:"my-plugin",
        afterDraw: function (chart) {
            const numToLocaleString = (value) =>{
      if (typeof value === "number") {
        return value.toLocaleString("en-US");
      } else {
        return value
      }
    }
            const precentage = (num)=> {return (num / (data.datasets[0].data.reduce((a, b) => a + b,0) / 100)).toFixed(0) + "%";}
            var data = chart.tooltip._data
            var items = Object.values(Object.values(data.datasets)[0]._meta)[0].data
            var MyOuterRadius = []

            
            var ctx = chart.chart.ctx;
            ctx.restore();
            ctx.font = "28px" + " almoni-medium";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center"

            Object.keys(items).forEach((i)=>{MyOuterRadius.push(items[i]._model.outerRadius)})
            //Math.max(...MyOuterRadius) === Math.min(...MyOuterRadius) ? ctx.fillStyle = myTheme :  ctx.fillStyle = chart.data.datasets[0].backgroundColor[MyOuterRadius.indexOf(Math.max(...MyOuterRadius))]
            ctx.fillStyle = myTheme
            var text = chart.tooltip._data.datasets[0].pieInnerText
            var text2 = chart.tooltip._data.datasets[0].pieInnerNum
            if(data.datasets[0].isNumber){
                var text2 = ""
            }
            let number = data.datasets[0].isPrecentage? 45 : 25
            let heightNum = data.datasets[0].isPrecentage? 0 : 25
            var text24 = precentage(chart.tooltip._data.datasets[0].pieInnerNum)
            ctx.fillText(text, chart.width / 2, chart.height / 2 - number,200);
            ctx.fillStyle = myTheme
            ctx.font = "26px" + " almoni-medium"
            ctx.fillText(numToLocaleString(text2), chart.width / 2, chart.height / 2 + heightNum,200);
            if(data.datasets[0].isPrecentage){ctx.fillText(text24, chart.width / 2, chart.height / 2 + number,200);}
            ctx.save();
          }
    })
}