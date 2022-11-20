import Vue from 'vue'
import Vuex from 'vuex'
import FavoriteAxios from '../components/utils/FavoriteAxios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    removeBookmarkDialog:false,
    fetching: false,
    selected_hq_id:600,
    selected_cat_id:1,
    selected_view_id: 100,
    selected_view_param: {}, //saved clicked bookmark view parameters
    custom_bookmark_data: {}, //save custom bookmark data want to save
    max_favorite_popup:false, // open favorite popup
    //serverAdrr: 'http://20.102.120.232:5080',
    serverAdrr: process.env.NODE_ENV === 'development' ? "http://20.102.120.232:5080" : "",
    quick_view: false,
    user_favorites: [],
    isAuthenticated: window.localStorage.getItem("sessionid") ? true : false,
    currUser: {"name":"yosef", "sessionId": window.localStorage.getItem("sessionid"),"user_id": 999},
    prefTheme:"lightTheme",
    themeDetails:{
      "darkTheme":{
        "theme":"darkTheme",
        "drill_title_color":"#ffffff",
        "app_background":"#121212",
        "app_color":"#FFFFFF",
        "solid_selected_border":"solid purple 4px",
        "kpi_sec_value": "#828282",
        "generic_title_color" : "#FFFFFF",
        "legend_border_color" : "solid white 1px",
        "kpi":{
          "kpi_value_color":"#000000",
          "kpi_sec_value": "#828282",
          "main_background":"#424242",
          "drill_background":"#424242",
          "main_label":"#ffffff",
          "value_color":"#A8699D",
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
        "list_data":{
          "main_header":"black",
          "sub_title":"#FFFFFF",
          "color_1":"#282828",
          "color_2":"#121212",
        },
        "remove_dialog":{
          "card_main":"#FFFFFF",
          "icon":"#282828",
          "button_style":"#E4E4E4",
          "button_style_secc":"",
        },
        "global":{} // global style
      },
      "lightTheme":{
        "app_background":"#F4F4F4",
        "app_color":"#000000",
        "theme":"lightTheme",
        "solid_selected_border":"solid black 2px",
        "drill_title_color":"#010101",
        "generic_title_color" : "#606060",
        "legend_border_color" : "solid black 1px",
        "kpi":{
          "kpi_value_color":"#000000",
          "kpi_sec_value": "#828282",
          "main_background":"#EBEBEB",
          "drill_background":"#FFFFFF",
          "main_label":"#010101",
          "value_color":"#0F2558",
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
          "title_color":"#0F2558",
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
        "list_data":{
          "main_header":"#0F2558",
          "sub_title":"#e0dcdc",
          "color_1":"#282828",
          "color_2":"#121212",
        },
        "remove_dialog":{
          "card_main":"#000000",
          "icon":"#FFFFFF",
          "button_style":"#0F2558",
          "button_style_secc":"",
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
