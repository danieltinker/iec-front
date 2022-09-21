import Vue from 'vue'
import Vuex from 'vuex'
import FavoriteAxios from '../components/utils/FavoriteAxios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected_hq_id:600,
    selected_cat_id:8,
    selected_view_id: 100,
    selected_view_param: {}, //saved clicked bookmark view parameters
    custom_bookmark_data: {}, //save custom bookmark data want to save
    serverAdrr: 'http://20.102.120.232:5080',
    quick_view: false,
    user_favorites: [],
    currUser: {"name":"yosef", "sessionId": "xxx","user_id": 999},
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
    //getter for user list
    GET_USER_FAV: state => {
      return state.user_favorites
    }
  },
  mutations: {
    SET_FAVORITES_LIST(state, fav_list)
    {
      //set user favorite list
      console.log("setting favlist", fav_list)
      state.user_favorites = fav_list
    }
  },
  actions: {
    SET_FAV_LIST: ({commit}) => {
      /*
        Function to fetch user favorite list
      */
       FavoriteAxios.getUserFav().then((response) => {
          console.log("user fav: ",response.data);
          commit("SET_FAVORITES_LIST", response.data)

      }).catch((error)=> {
          console.log("Got error getting user fav: ", error)
      })
    }
  },
  modules: {
  }
})
