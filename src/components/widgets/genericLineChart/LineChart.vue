<template>
    <div>
        {{options}}
      <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
      {{series}}
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
        series:{type:Object},
        options:{type:Object}
    },
    data(){
        return{
            options:this.options,
            
            series: this.series
         }
    }
}
</script>

<style></style>