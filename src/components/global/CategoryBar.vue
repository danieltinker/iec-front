<template>
    <div dir="rtl" class="container" :style="{'background-color' :getCurrentTheme.category_bar.background_color}">
      <div>
        <div v-for="(category, index) in categories" :key="index">
          <v-btn class="chipBtn ml-3" :ripple="false" :color="getCurrentTheme.category_bar.btn_chip" :id="index" elevation="0"
            @click="setCategory(index,category.CATEGORY_ID,category.SUB_CATEGORIES,category.LABEL)"
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
      setCategory(index, category,SUB_CATEGORIES,LABEL) {
        if(this.active != index){
          this.$store.state.isSubCategories = false
        console.log("SUB_CATEGORIES",this.$store.state.isSubCategories);
        this.$store.state.clearSubCategory = 0;
        this.$store.state.isSubCategories = SUB_CATEGORIES;
        this.$store.state.selected_cat_name = LABEL;
        console.log("SUB_CATEGORIES",this.$store.state.isSubCategories);
        console.log(LABEL);
        this.active = index;
        if(!this.$store.state.isSubCategories){
          this.$store.state.selected_cat_id = category;
        }
        }
      }
    },
    async created(){
      console.log("Creating Category Bar")
      await axios
            .get(this.$store.state.serverAdrr+"/shavit-mobile"+
              `/${this.$store.state.selected_hq_id}/categories`,
              { params: { sid: this.$store.state.loginStore.userInfo.sid } }
            )
            .then(response => {
              //this.categories = response.data;
              this.categories = response.data['CATEGORIES'];
              this.$store.state.sub_categories_json = response.data['SUB_CATEGORIES'];
              //SET default category
              this.$store.state.selected_cat_id = this.categories[0].CATEGORY_ID;
              this.$store.state.selected_cat_name = this.categories[0].LABEL;
              this.$store.state.isSubCategories = this.categories[0].SUB_CATEGORIES;
              console.log("SUB_CATEGORIES",this.$store.state.isSubCategories);

              this.active = 0
            })
            .catch(error => {
              console.log(error);
              if(error.response.status == 405){
                                window.location.href = this.$store.state.serverAdrr + "/adfs_mobile";
                            }
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
              //this.categories = response.data;
              this.categories = response.data['CATEGORIES'];
              this.$store.state.sub_categories_json = response.data['SUB_CATEGORIES']
              //SET default category
              this.$store.state.selected_cat_id = this.categories[0].CATEGORY_ID;
              this.$store.state.selected_cat_name = this.categories[0].LABEL;
              this.$store.state.isSubCategories = this.categories[0].SUB_CATEGORIES;
              console.log("SUB_CATEGORIES",this.$store.state.isSubCategories);
              this.active = 0
            })
            .catch(error => {
              console.log(error);
              if(error.response.status == 405){
                                window.location.href = this.$store.state.serverAdrr + "/adfs_mobile";
                            }
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
  