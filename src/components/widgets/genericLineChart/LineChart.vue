<template>
    <div>
      <apexchart v-if="showData" 
      width="90%" type="line" 
      :options="option"
       :series="serie"
       style="overflow-y: hidden; margin-right: 7px;dir:ltr"></apexchart>
    </div>
</template>

<script>

export default{
    props:{
        isDrillDown:{type:Boolean},
        drillDataProp:{type:Object, default:()=>{}},
        params:{type:Object,required:false},
        view_ID:{type:Number},
        parentsParam:{type:Object},
        series:{type:Array},
        options:{type:Object}
    },
    data(){
        return{
            showData:false,
            option:this.options,
            serie: this.series
         }
    },
    created(){
            const ts = Date.now()
            let ts_arr = []
            this.serie[0].data.forEach(couple =>{
                ts_arr.push(couple[0])
            })
            this.option.xaxis.range =  100000
            this.option.xaxis.tickAmount = 10
            this.option.xaxis.type = 'datetime'
            this.option.xaxis.categories = ts_arr
            this.option.xaxis.labels ={formatter: (value,timestamp) =>{
                    const dateTimeFormat = new Intl.DateTimeFormat('en', {  month: 'numeric', day: 'numeric', hour: 'numeric', minute:'numeric', hour12: false })             
                    var [{ value: month },,{ value: day },,{value: hour},,{value:minute}] = dateTimeFormat .formatToParts(new Date( timestamp  )) 
                    if(hour==24)hour=0
                    return `${hour}:${minute} ${day}/${month}`; 
                    //return new Date(timestamp) // The formatter function overrides format property
                    }
                }
        // this.option.xaxis.categories = ts_arr
        // this.option.xaxis.axisBorder.color = "black"
        this.showData = true
    }
}
</script>

<style></style>