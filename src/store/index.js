import Vue from 'vue'
import Vuex from 'vuex'
import FavoriteAxios from '../components/utils/FavoriteAxios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fetching: false,
    selected_hq_id:600,
    selected_cat_id:8,
    selected_view_id: 100,
    selected_view_param: {}, //saved clicked bookmark view parameters
    custom_bookmark_data: {}, //save custom bookmark data want to save
    serverAdrr: 'http://20.102.120.232:5080',
    quick_view: false,
    user_favorites: [],
    currUser: {"name":"yosef", "sessionId": "xxx","user_id": 999},
    prefTheme:"darkTheme",
    themeDetails:{
      "darkTheme":{
        "theme":"darkTheme",
        "headline":{
          "test":8888
        }, // headline style
        "genericMain":{}, // generic Main clock components
        "global":{} // global style
      },
      "lightTheme":{
        "theme":"lightTheme",
        "headline":{}, // headline style
        "genericMain":{}, // generic Main clock components
        "global":{} // global style
      }
    },
  },
  getters: {
    //getter for theme
    currentTheme(state){
      return state.themeDetails[state.prefTheme]
    }
    ,
    //getter for user list
    GET_USER_FAV: state => {
      return state.user_favorites
    },
    IS_FETCHING: state => {
      return state.fetching
    }
  },
  mutations: {
    SET_FAVORITES_LIST(state, fav_list)
    {
      //set user favorite list
      // console.log("setting favlist", fav_list)
      state.user_favorites = fav_list
    },
    SET_FETCHING(state, level)
    {
      //set user favorite list
      // console.log("setting favlist", fav_list)
      state.fetching = level
    }
  },
  actions: {
    SET_FAV_LIST: ({commit}) => {
      /*
        Function to fetch user favorite list
      */
        commit("SET_FETCHING", true)
       FavoriteAxios.getUserFav().then((response) => {
          // console.log("user fav: ",response.data);
          commit("SET_FAVORITES_LIST", response.data)
          commit("SET_FETCHING", false)

      }).catch((error)=> {
          console.log("Got error getting user fav: ", error)
      })
    },

    
    DO_FETCH: ({commit}) => {
      /*
        Function to set fetch on
      */
          commit("SET_FETCHING", true)
    },
    END_FETCH: ({commit}) => {
      /*
        Function to set fetch off
      */
          commit("SET_FETCHING", false)
    }
  },
  modules: {
  }
})
