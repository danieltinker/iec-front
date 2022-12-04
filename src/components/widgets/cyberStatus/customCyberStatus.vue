<template>
    <div>
      <div class="container">
          <h1 v-if="subTitle" class="mainHeadline" :style="'color:'+getCurrentTheme.cyber_status.box_color_1">סייבר</h1>
        <span v-if="subTitle" id="subTitleText" :style="'color:'+getCurrentTheme.cyber_status.box_color_2">מצב כוננות קודם</span>
        <span v-else id="subTitleText" :style="'color:'+getCurrentTheme.cyber_status.box_color_2">מצב כוננות</span>
        <div :style="{'background-color':dataCyber.details.color}" class="statusBox">
          <h1 style="font-family: almoni-ultralight;font-size:22px">{{dataCyber.details.desc}}</h1>
        </div>
        <div class="details">
          <div class="grid-container">
            <div class="grid-item">
              <div class="data-col">
                
  
                <p :style="'color:'+getCurrentTheme.cyber_status.box_color_1">זמן התחלה</p>
                <p :style="'color:'+getCurrentTheme.cyber_status.box_color_1">{{ dataCyber.start_timestamp }}</p>
              </div>
            </div>
  
            <div class="grid-item">
              <div class="data-col" v-if="dataCyber.end_timestamp">
                <p :style="'color:'+getCurrentTheme.cyber_status.box_color_1">זמן סיום</p>
                <p :style="'color:'+getCurrentTheme.cyber_status.box_color_1">{{ dataCyber.end_timestamp }}</p>
  
              </div>
            </div>
          </div>
  
          <div class="data-col">
            <p :style="'color:'+getCurrentTheme.cyber_status.box_color_1">סיבה</p>
            <p :style="'color:'+getCurrentTheme.cyber_status.box_color_1">{{ dataCyber.details.comment }}</p>
          </div>
          <div class="data-col">
            <p :style="'color:'+getCurrentTheme.cyber_status.box_color_1">הגורם הממליץ על מצב כוננות</p>
            <p :style="'color:'+getCurrentTheme.cyber_status.box_color_1">{{ dataCyber.details.recommend }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
      props:['dataCyber','subTitle']
  }
  </script>
  
  <style scoped>
  .mainHeadline{
    font-family: almoni-medium;
    margin-bottom:10px;
    font-size:24px
  }
  #subTitleText{
  font-family: almoni;
  font-size: 18px;
  color:#606060;
  
  }
  .grid-container {
      direction: rtl;
    text-align: right;
    display: inline-grid;
    grid-template-columns: auto auto auto;
  }
  .grid-item {
    margin-left: 15px;
    text-align: right;
  }
  
  .data-col {
    margin-top: 15px;
  }
  
  .details {
      margin: 32px;
  
  
    color: #323232;
    margin-top: 25px;
    text-align: right;
  }
  .details p {
    padding: 0px;
    margin: 0px;
    
  }
  
  .data-col p:first-child{
      font-size: 20px;
    font-family: almoni-bold;
  }
  .data-col p{
      font-size: 20px;
    font-family: almoni-light;
  }
  .statusBox {
    text-align: center;
    line-height: 50px;
    margin: auto;
    width: 50%;
    margin-top: 20px;
    width: 180px;
    height: 50px;
  }
  
  .statusBox h1 {
    color: #ffffff;
    font-size: 18px;
    text-align: center;
    justify-content: center;
    justify-items: center;
  }
  .container {
    padding: 8px;
    text-align: center;
    font-size: 16px;
    font-family: almoni-medium;
  }
  .center {
    margin: auto;
    width: 50%;
    padding: 10px;
  }
  .headlineDiv1 ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    text-align: center;
    padding-top: 10px;
  }
  
  .headlineDiv1 ul li {
    list-style: none;
    /* flex: 25 50 25%; */
  }
  
  .bookmaerkBtn:before {
    opacity: 0 !important;
  }
  
  .bookmaerkBtn :deep()  .v-ripple__container {
    opacity: 0 !important;
  }
  </style>