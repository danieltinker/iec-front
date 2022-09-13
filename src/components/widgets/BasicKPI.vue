<template>
    <div style="text-align: center;">
        <span id="chartsHeaders" :style="'background:' + 'yellow'" >
            {{ CompConfig.chartTitle }}
        </span>
        <div class="container" dir="rtl">
            <div v-for="(item,index) in CompConfig.jsonData" :key="index" class="kpi-box" :style="'background:' + 'yellow'" @click="buttonFoo">
                <span class="kpi-label">
                     {{ item.label }}
                </span>
                <br>
                <span class="kpi-sub-labels">
                     {{ item.value }}
                </span>
            </div>
        </div>
    
    </div>
    </template>
    
    <script>
    export default {
        props:{
            CompConfig:{type:Object,required:false},
            jsonData: { type: Array, required: false},
            chartTitle: { type: String, required: false },
            clickAble:{ type: Boolean, required: false, default: false },
        },
        methods:{
            buttonFoo(){
                if(this.clickAble){
                    console.log("function")
                }
            }
        }
    }
    </script>
    
    <style scoped>
    
    .container{
        display: grid;
        grid-template-columns: auto auto;
        row-gap: 10px;
        column-gap: 10px;
        /* text-align: center; */
        /* align-items: center; */
        justify-content: center;
    }
    .kpi-box{
        padding-top: 10px;
        text-align: center;
        align-items: center;
        width: 165px;
        height: 80px;
        border-radius: 4px;
    
    }
    .kpi-box span:first-child{
        font-family: almoni;
      font-size: 20px;
      line-height: 30px;
    }
    
    .kpi-box span{
        display: inline-block;
        font-size: 20px;
        font-family: almoni-demibold;
        color: #a8699d;
    }
    #chartsHeaders {
      font-family: almoni;
      font-size: 18px;
      color: #606060;
      /* margin-bottom: 18px; */
    }
    </style>