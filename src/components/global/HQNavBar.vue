<template>
    <div>
      <v-overlay :value="drawer" z-index="4"></v-overlay>
      <!-- :color="getTheme.mainColor" -->
      <v-app-bar color="#ffffff" app clipped-right flat dir="rtl">
        <!-- :color="getTheme.labelsColors.mainLabelColor" -->
        <v-app-bar-nav-icon color="red" style="margin-right: -10px;" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <!-- :style="'margin-right: 15px; font-family: almoni; font-size: 27px; color:' +
            getTheme.labelsColors.mainLabelColor
        "-->
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-app-bar>
      <!-- :color="getTheme.secColor" -->
      <v-navigation-drawer v-model="drawer" app right clipped hide-overlay dir="rtl">
        <v-icon class="my-2" dir @click="drawer = !drawer" style="font-size: 30px; justify-content: right;">mdi-close</v-icon>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
            <v-list-item v-for="item in hqs" :key="item.HQ_ID" @click="setHQ(item)">
              <v-list-item-title>{{item.LABEL}}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
  </template>
  
    <script>
  import axios from "axios";
  export default {
    methods:{
      setHQ(item){
        this.$store.state.selected_hq_id = item.HQ_ID
        this.title=item.LABEL
      }
  
    },
    async created() {
      //get hqs By sid
      await axios
        .get("http://20.102.120.232:5080/shavit/mobile/hq", 
        {params: { sid: "xxx" }}
        )
        .then(response => {this.hqs = response.data;})
        .catch((error) => {
          console.log(error);
        });
    },
    data: () => ({
      drawer: false,
      group: null,
      hqs: [],
      title:'מטה מנכ"ל'
    }),
  
    watch: {
      group() {
        this.drawer = false;
      }
    }
  };
  </script>
  
  <style scoped>
  
  </style>