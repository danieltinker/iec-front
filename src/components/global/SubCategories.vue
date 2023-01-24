<template>
    <div dir="rtl" class="container" :style="'background-color: ' + getCurrentTheme.category_bar.background_color">
      <!-- {{$store.state.selected_cat_name}} sdadas
      <br>
      {{typeof $store.state.sub_categories_json}}
      <br>

      {{$store.state.sub_categories_json}} -->
      <div>
        <div v-for="(category, index) in $store.state.sub_categories_json[$store.state.selected_cat_name]" :key="index">
          <v-btn class="chipBtn ml-3" :ripple="false" :color="getCurrentTheme.category_bar.btn_chip" :id="index" elevation="0"
            @click="setCategory(index,category.CATEGORY_ID)"
            :style="
            $store.state.clearSubCategory == index
                    ? 'color: #FFFFFF; background-color:' + getCurrentTheme.global_theme_color
                    : 'color: ' + getCurrentTheme.category_bar.btn_color + ';'
                "
          >{{ category.LABEL }}</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from "axios";
  export default {
    props: ["selected_hq"],
    methods: {
      setCategory(index, category) {
        this.$store.state.clearSubCategory = index;
        this.$store.state.selected_cat_id = category;
      }
    },
    data: () => {
      return {
        active: undefined,
        defaultCategory: 0,
        categories: []
      };
    },watch:{
      "$store.state.selected_cat_id": {
      // fetch the widgets views from the DB
      async handler() {
        console.log("Dsadsad");
        this.$store.state.selected_cat_id = this.$store.state.sub_categories_json[this.$store.state.selected_cat_name][0].CATEGORY_ID
      }}

    },
    created(){
      this.$store.state.selected_cat_id = this.$store.state.sub_categories_json[this.$store.state.selected_cat_name][0].CATEGORY_ID
    },
    beforeDestroy(){
      this.$store.state.clearSubCategory = 0;
    }
  };
  </script>
    
  <style scoped>
  ::-webkit-scrollbar {
    height: 0px;
    width: 0px; /* width of vertical scrollbar */
    border: 0px solid #d5d5d5;
  }
  .chipBtn {
    font-family: almoni-medium;
    font-size: 16px !important;
    width: max-content;
    min-height: 10px;
    height: 25px !important;
    justify-content: center;
    border-radius: 16px;
  }
  .container {
    background-color: rgb(244, 244, 244);
    display: flex;
    overflow-x: auto;
    height: 50px;
    width: auto;
  }
  
  .container div:first-child {
    display: flex;
    align-self: center;
  }
  </style>
  