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
    max_favorite_popup:false, // open favorite popup
    serverAdrr: 'http://20.102.120.232:5080',
    quick_view: false,
    user_favorites: [],
    currUser: {"name":"yosef", "sessionId": "xxx","user_id": 999},
    prefTheme:"lightTheme",
    themeDetails:{
      "darkTheme":{
        "theme":"darkTheme",
        "app_background":"#121212",
        "app_color":"#FFFFFF",
        "solid_selected_border":"solid purple 4px",
        "kpi_sec_value": "#828282",
        "kpi":{
          "kpi_value_color":"#000000",
          "kpi_sec_value": "#828282",
          "main_background":"#424242",
          "drill_background":"#424242",
        },
        "hq_navbar":{
          "span_color_first":"#FFFFFF",
          "span_color_sec":"#424242",
          "span_color_third":"#FFFFFF",
          "app_bar":"#121212",
          "bar_icon":"#FFFFFF",
          "toolbar_title":"#FFFFFF",
          "navigation_drawer":"#282828"
        },
        "category_bar":{
          "btn_chip":"#424242",
          "btn_color":"#FFFFFF",
          "background_color":"#282828"
        },
        "headline":{
          "title_color":"#E4E4E4",
          "background":"#282828"
        }, // headline style
        "genericClock":{
          "main_background":"#282828",
          "drill_background":"#121212"
        }, // generic Main clock components
        "baseGenericPie":{
          "span_color":"#FFFFFF",
          "btn_color_drill":"#424242",
          "btn_color":"#424242",
          "innerContentColor":"#FFFFFF"
        },
        "one_bar":{
          "background_bar":"#3B3B3B",
          "label_color":"#E4E4E4"
        },
        "max_fevorite":{
          "card_color":"#FFFFFF",
          "card_background_color":"#282828",
          "card_subtitle":"FFFFFF"
        },
        "cyber_status":{
          "box_color_1":"#FFFFFF",
          "box_color_2":"#FFFFFF",
          "color_1":"#282828",
          "color_2":"#121212",
        },
        "global":{} // global style
      },
      "lightTheme":{
        "app_background":"#EBEBEB",
        "app_color":"#000000",
        "theme":"lightTheme",
        "solid_selected_border":"solid black 2px",
        "kpi":{
          "kpi_value_color":"#000000",
          "kpi_sec_value": "#828282",
          "main_background":"#EBEBEB",
          "drill_background":"#FFFFFF",
        },
        "hq_navbar":{
          "span_color_first":"#000000",
          "span_color_sec":"#EBEBEB",
          "span_color_third":"#606060",
          "app_bar":"#EBEBEB",
          "bar_icon":"#000000",
          "toolbar_title":"#000000",
          "navigation_drawer":"#FFFFFF"
        },
        "category_bar":{
          "btn_chip":"#EBEBEB",
          "btn_color":"#000000",
          "background_color":"#FFFFFF"
        },
        "headline":{
          "title_color":"#935287",
          "background":"#FFFFFF"
        }, // headline style
        "genericClock":{
          "main_background":"#FFFFFF",
          "drill_background":"#EBEBEB"
        }, // generic Main clock components
        "baseGenericPie":{
          "span_color":"#606060",
          "btn_color_drill":"#FDFDFD",
          "btn_color":"#EBEBEB",
          "innerContentColor":"#000000"
        },
        "one_bar":{
          "background_bar":"#F4F4F4",
          "label_color":"#606060"
        },
        "max_fevorite":{
          "card_color":"#000000",
          "card_background_color":"#FFFFFF",
          "card_subtitle":"606060"
        },
        "cyber_status":{
          "box_color_1":"#010101",
          "box_color_2":"#606060",
          "color_1":"#FFFFFF",
          "color_2":"#EBEBEB",
        },
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
      state.user_favorites = fav_list
    },
    SET_FETCHING(state, level)
    {
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
