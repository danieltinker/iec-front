<template>
    <div dir="rtl" class="container" :style="{'background-color' :getCurrentTheme.category_bar.background_color}">
      <div>
        <div v-for="(category, index) in categories" :key="index">
          <v-btn class="chipBtn ml-3" :color="getCurrentTheme.category_bar.btn_chip" :id="index" elevation="0"
            @click="setCategory(index,category.CATEGORY_ID)"
            :style="
                  active == index
                    ? {'color': '#FFFFFF', 'background-color' : getCurrentTheme.global_theme_color}
                    : {'color' : getCurrentTheme.category_bar.btn_color}
                "
          >{{ category.LABEL }}</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from "axios";
  export default {
    methods: {
      setCategory(index, category) {
        this.active = index;
        this.$store.state.selected_cat_id = category;
      }
    },
    async created(){
      console.log("create cat bar")
      await axios
            .get(this.$store.state.serverAdrr+"/shavit-mobile"+
              `/${this.$store.state.selected_hq_id}/categories`,
              { params: { sid: this.$store.state.loginStore.userInfo.sid } }
            )
            .then(response => {
              this.categories = response.data;
              //SET default category
              this.$store.state.selected_cat_id = this.categories[0].CATEGORY_ID;
              this.active = 0
            })
            .catch(error => {
              console.log(error);
            });
    }
    ,
    watch: {
      "$store.state.selected_hq_id": {
        async handler() {
          await axios
            .get(this.$store.state.serverAdrr+"/shavit-mobile"+
              `/${this.$store.state.selected_hq_id}/categories`,
              { params: { sid: this.$store.state.loginStore.userInfo.sid } }
            )
            .then(response => {
              this.categories = response.data;
              //SET default category
              this.$store.state.selected_cat_id = this.categories[0].CATEGORY_ID;
              this.active = 0
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    },
    data: () => {
      return {
        active: 0,
        defaultCategory: 0,
        categories: []
      };
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
  