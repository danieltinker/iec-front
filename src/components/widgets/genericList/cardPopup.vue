<template>
    <div class="text-center">
      <v-dialog overlay-opacity="0.5" overlay-color="black" v-model="dialog" width="500" style="text-align: right;font-family: almoni;">
        <v-card style="text-align: right;">
        <v-card-title class="text-h5 lighten-2" :style="{'background-color':getCurrentTheme.global_theme_color}" style="text-align: right;padding:2px 4px;direction: rtl;height:25px">
          <!-- <span style="margin-right:20px">מידע</span> -->
          <v-icon class="" dir @click="dialog = false" color="white" style="font-size: 20px; justify-content: right;position: absolute;left: 2%;">mdi-close</v-icon>
          

        </v-card-title>
        

        <v-card-text style="padding:8px;font-family: almoni-demibold;font-size:18px;padding-left:6%;padding-right:6%;color:#010101" dir="rtl">
         {{myItem}}
        </v-card-text>

        <!-- <v-divider></v-divider> -->

        <!-- <v-card-actions>
          <v-spacer></v-spacer> -->
          <!-- <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn> -->
        <!-- </v-card-actions> -->
      </v-card>

      </v-dialog>
    </div>
  </template>

  <script>
  export default {
    props: ['myItem'],
    data(){
        return{
            dialog:false
        }
    }
  }
  </script>
  
  <style scoped>
    .card-icon{
      position: absolute; left: 10px; top: 10px
    }
    .card-title{
      place-content: center;
      font-family: almoni-demibold;
      font-size: 26px;
      color: #0F2558;
      position: relative;

    }
  .story {
    box-shadow: none;
    height: 58px !important;
    width: 58px !important;
    margin: 20px;
    margin-bottom: 5px !important;
    pointer-events: none;
    position: relative !important;
  }
  
  .actionBtn {
    height: 20px !important;
    width: 20px !important;
    position: absolute;
    top: -15px;
    right: -4px;
    pointer-events: auto;
  }
  
  .FavDiv ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    text-align: center;
  }
  
  .FavDiv ul li {
    list-style: none;
    flex: 0 0 33.333333%;
  }
  </style>