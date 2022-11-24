<template>
    <div :style="'background-color:' + getCurrentTheme.cyber_status.color_1" style="position: relative">
  
        <div style="height:400px; " v-if="doneFetching">
                
        <v-row id="test" class="mt-2" :style="{color:getCurrentTheme.cyber_status.box_color_1}" style="place-content: center; "> 
            <div class="eachBar" v-for="(bar, key) in prodData" :key="key">
                <div id="100red" style="height:1px">
                    <span v-if="key==0" :style="{color:getCurrentTheme.cyber_status.color_1}" style="display: block; z-index: 1; position: relative; top: 206px; ">XXX</span>
                    <span v-if="key==1" style="display: block; z-index: 1; position: relative; top: 224px; right: 40px; ">100</span>
                    <hr style="display: block; z-index: 1; position: relative; top: 213px; border: 1px solid #FF0100;">
                </div>
                <div id="600orange" style="height:1px">
                    <span v-if="key==0" :style="{color:getCurrentTheme.cyber_status.color_1}" style="display: block; z-index: 1; position: relative; top: 172px; ">XXX</span>
                    <span v-if="key==1" style="display: block; z-index: 1; position: relative; top: 191px; right: 40px; ">600</span>
                    <hr style="display: block; z-index: 1; position: relative; top: 177px; border: 1px solid #F87302;">
                </div>                
                <div id="1100yellow">
                    <span v-if="key==0" :style="{color:getCurrentTheme.cyber_status.color_1}" style="display: block; z-index: 1; position: relative; top: 129px; ">XXX</span>
                    <span v-if="key==1" style="display: block; z-index: 1; position: relative; top: 153px; right: 46px; ">1,100</span>
                    <hr style="display: block; z-index: 1; position: relative; top: 140px; border: 1px solid #FFDB58;">
                </div>
                <v-col style="display: block; z-index: 2; position: relative;">
                <div style="position: relative;  text-align: center; ">
                    <label style="font-size:17px; font-family: almoni;">{{bar.value.toLocaleString("en-US")}}</label>
                    <OneBar   :data="bar" :params="params" backgroundColor="rgba(0, 0, 100%, 80%)" cWidth="55px"/>
                    <div style="display:flex; flex-direction:column;">
                        <label style="font-size:20px; font-family: almoni; bottom:0; ">{{bar.label}}</label>
                        <label style="font-size:20px; font-family: almoni; bottom:0; ">({{updateLabel(bar.description)}})</label>
                    </div>
                </div>
                </v-col>
                
            </div>
        </v-row>

    </div>

    <div class="loader" v-else>
        <div class="loader" v-if="!isErrorMsg">
            <v-progress-circular
            indeterminate
            :style="{color:getCurrentTheme.global_theme_color}"
            ></v-progress-circular>
        </div>
        <h1 v-else>  {{errorMSG}} </h1>
    </div>  


    </div>
  </template>
  
  <script>
import OneBar from '../utils/staticCustomOneBar.vue';
  export default {
    props: {
        params: { type: Object, required: false },
        view_ID: { type: Number },
    },
    async created() {
        await this.$myApi("queryList/iec/reserve_total,total_peak_reserve")
            .then((response) => {
            if (response) {
                var prodData = [];
                for (var index in response.data[0]) {
                    var tempObj = {};
                    if (response.data[0][index]["label"] == "זמינות") {
                        response.data[0][index]["label"] = "רזרבה נוכחית";
                    }
                    tempObj["label"] = response.data[0][index]["label"];
                    tempObj["max_value"] = 2500;
                    // TotalProdDataData[index]["value"] = 1100
                    tempObj["value"] = response.data[0][index]["value"];
                    tempObj["description"] = response.data[0][index]["description"];
                    // console.log(TotalProdDataData[index]["value"])
                    if (0 <= response.data[0][index]["value"] && response.data[0][index]["value"] < 100) {
                        tempObj["color"] = "#FF0100";
                    }
                    else if (310 <= response.data[0][index]["value"] && response.data[0][index]["value"] < 600) {
                        tempObj["color"] = "#F87302";
                    }
                    else if (700 <= response.data[0][index]["value"] && response.data[0][index]["value"] < 1100) {
                        tempObj["color"] = "#FFDB58";
                    }
                    else {
                        tempObj["color"] = "#008000";
                    }
                    prodData.push(tempObj);
                }
                this.prodData = prodData;
                this.doneFetching = true
            }
        })
        .catch((err) => {this.errorMSG = "אין מידע"
  console.log(err)});
  },
  methods:{
    updateLabel(item){
        return item == "N" ? "MW" : item
    }
  },
  computed:{
    isErrorMsg(){
            return this.errorMSG.length !== 0;
        }
  },
    data() {
        return {
            doneFetching:false,
            errorMSG:"",
            prodData: [],
        };
    },
    components: { OneBar }
};
  </script>
  
  
  <style scoped>

  h1 {
    
    color:#000000;
    /* height: 100%; */
    font-family: almoni-bold;
    text-align: center;

    font-size: 23px;
    
}

  label{
    font-family: almoni;
    font-size: 20px;  
    
    
}

  .center{
    text-align:center; 
}


.eachBar{
    margin: 0 27px 0 27px;
}


  </style>