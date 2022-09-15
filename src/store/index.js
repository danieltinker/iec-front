import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected_hq_id:600,
    selected_cat_id:8,
    themeDetails:{
      "darkTheme":{
        "theme":"darkTheme",
        "mainColor": "#121212", //background, childCard background
        "secColor":"#282828", //mainCategory div background, hamburger background, fatherCard background, addFavoriteGuide background, logout Popup
        "thirdColor":"#000000", //separation background
        "fourthColor":"#424242", //chips background, fatherCard legends background
        "fifthColor":"#424242", //childCard legends background
        "sixthColor":"#424242", //hamburger userDetails background
        "seventhColor":"#424242", //hamburger themeToggle background
        "eighthColor":"#FFFFFF", //signOut btn
        "ninethColor":"#424242", //kpi div color
        "tenthColor":"#3B3B3B", //bar background color
        "labelsColors":{
          "mainLabelColor": "#FFFFFF",
          "secLabelColor":"#FFFFFF", //toggle labelColor, second pie headline
          "thirdColor":"#E4E4E4", //bar headline
          "fourthColor":"#E4E4E4", //bar headline
          "fifthColor":"#FFFFFF",
        }
      },
      "lightTheme":{
        "theme":"lightTheme",
        "labelColor": "black",
        "mainColor": "#EBEBEB", //background, childCard background
        "secColor":"#FFFFFF", //mainCategory div background, hamburger background, fatherCard background, addFavoriteGuide background, logout Popup
        "thirdColor":"#D8D8D8", //separation background
        "fourthColor":"#EBEBEB", //chips background, fatherCard legends background
        "fifthColor":"#FDFDFD", //childCard legends background
        "sixthColor": "#F4F4F4", //hamburger userDetails background
        "seventhColor":"#EBEBEB", //hamburger themeToggle background
        "eighthColor":"#935287", //signOut btn
        "ninethColor":"#FFFFFF", //kpi div color
        "tenthColor":"#F4F4F4", //bar background color
        "labelsColors":{
          "mainLabelColor": "#000000",
          "secLabelColor":"#606060", //toggle labelColor, second pie headline
          "thirdColor":"#935287", //bar headline
          "fourthColor":"#606060", //bar headline
          "fifthColor":"#010101",
        }
      }
    },
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
