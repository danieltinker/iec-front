<template>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500" style="">
        <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
         {{myItem}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
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
      color: #935287;
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