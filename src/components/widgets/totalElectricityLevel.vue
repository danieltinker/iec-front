<template>
    <div :style="'background-color:' + getCurrentTheme.cyber_status.color_1" style="position: relative">
  
        <div style="height:400px; " v-if="doneFetching">
                
        <v-row id="test" class="mt-2" style="place-content: center; background: #FFFFFF;  color:black;"> 
            <div class="eachBar" v-for="(bar, key) in prodData" :key="key">
                <div id="100red" style="height:1px">
                    <span v-if="key==0" style="display: block; z-index: 1; position: relative; top: 206px; color:#FFFFFF; ">XXX</span>
                    <span v-if="key==1" style="display: block; z-index: 1; position: relative; top: 224px; right: 40px; ">100</span>
                    <hr style="display: block; z-index: 1; position: relative; top: 213px; border: 1px solid #FF0100;">
                </div>
                <div id="600orange" style="height:1px">
                    <span v-if="key==0" style="display: block; z-index: 1; position: relative; top: 172px; color:#FFFFFF; ">XXX</span>
                    <span v-if="key==1" style="display: block; z-index: 1; position: relative; top: 191px; right: 40px; ">600</span>
                    <hr style="display: block; z-index: 1; position: relative; top: 177px; border: 1px solid #F87302;">
                </div>                
                <div id="1100yellow">
                    <span v-if="key==0" style="display: block; z-index: 1; position: relative; top: 129px; color:#FFFFFF; ">XXX</span>
                    <span v-if="key==1" style="display: block; z-index: 1; position: relative; top: 153px; right: 46px; ">1,100</span>
                    <hr style="display: block; z-index: 1; position: relative; top: 140px; border: 1px solid #FFDB58;">
                </div>
                <v-col style="display: block; z-index: 2; position: relative;">
                <div style="position: relative;  text-align: center; ">
                    <label style="font-size:17px; font-family: almoni;">{{bar.value.toLocaleString("en-US")}}</label>
                    <OneBar   :data="bar" :params="params" backgroundColor="rgba(0, 0, 100%, 80%)" cWidth="55px"/>
                    <div style="display:flex; flex-direction:column;">
                        <label style="font-size:20px; font-family: almoni; bottom:0; ">{{bar.label}}</label>
                        <label style="font-size:20px; font-family: almoni; bottom:0; ">({{bar.description}})</label>
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
            color="purple"
            ></v-progress-circular>
        </div>
        <h1 v-else>  {{errorMSG}} </h1>
    </div>  


    </div>
  </template>
  
  <script>
  import axios from 'axios'
import OneBar from './genericBAR/oneBar.vue';
  export default {
    props: {
        params: { type: Object, required: false },
        view_ID: { type: Number },
    },
    async created() {
        await axios
            .post("http://localhost:5000/shavit/metric/queryList/iec/reserve_total,total_peak_reserve?sid=983eabf8-c5a3-41b3-9c8e-0c4103797712", { params: {
                sid: this.$store.state.currUser.sessionId
            }
        })
            .then((response) => {
            if (response.data.success) {
                console.log("herhehehe", response);
                var prodData = [];
                for (var index in response.data.data[0]) {
                    var tempObj = {};
                    if (response.data.data[0][index]["label"] == "זמינות") {
                        response.data.data[0][index]["label"] = "רזרבה נוכחית";
                    }
                    tempObj["label"] = response.data.data[0][index]["label"];
                    tempObj["max_value"] = 2500;
                    // TotalProdDataData[index]["value"] = 1100
                    tempObj["value"] = response.data.data[0][index]["value"];
                    tempObj["description"] = response.data.data[0][index]["description"];
                    // console.log(TotalProdDataData[index]["value"])
                    if (0 <= response.data.data[0][index]["value"] && response.data.data[0][index]["value"] < 100) {
                        tempObj["color"] = "#FF0100";
                    }
                    else if (310 <= response.data.data[0][index]["value"] && response.data.data[0][index]["value"] < 600) {
                        tempObj["color"] = "#F87302";
                    }
                    else if (700 <= response.data.data[0][index]["value"] && response.data.data[0][index]["value"] < 1100) {
                        tempObj["color"] = "#FFDB58";
                    }
                    else {
                        tempObj["color"] = "#008000";
                    }
                    prodData.push(tempObj);
                }
                this.prodData = prodData;
            }
        })
        .catch((err) => {this.errorMSG = "אין מידע"
  console.log(err)});
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