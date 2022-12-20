<template>
    <div class="text-center">
      <v-dialog v-model="dialog" persistent width="500" style="">
        <v-card
          dir="ltr"
          :style="
            'color:' +
            getCurrentTheme.max_fevorite.card_color +
            ';font-family:almoni; ;border-radius: 10px; overflow: hidden; background-color:' +
            getCurrentTheme.max_fevorite.card_background_color
          "
        >
          <v-card-title class="mb-1 card-title">
            <v-icon
              class="card-icon"
              @click="exitPopup"
              :color="getCurrentTheme.max_fevorite.card_color"
              >mdi-close</v-icon
            >
            <span :style="{color:getCurrentTheme.global_theme_color}"> שעוני מבט מהיר</span></v-card-title
          >
  
          <v-card-subtitle :style="
              'text-align: center; padding-bottom:10px !important; font-size:18px; font-family:almoni; color:' +
              getCurrentTheme.max_fevorite.card_subtitle
            "
          >
            ניתן להוסיף עד 6 שעונים למבט מהיר
          </v-card-subtitle>
  
          <v-card-text
            class=""
            :style="
              'font-size:18px; font-family:almoni-demibold; padding-bottom: 0px; text-align: right;color:' +
              getCurrentTheme.max_fevorite.card_color
            "
          >
            השעונים שלך
          </v-card-text>
  
          <div class="FavDiv" dir="rtl">
            <span
              v-if="this.userCurrentFav.length === 0"
              class="mt-4 mb-3"
              :style="
                'padding: 0 24px 20px;font-family:almoni; font-size:18px; color:' +
                getCurrentTheme.max_fevorite.card_subtitle
              "
              >אין לך שעונים במבט המהיר</span
            >
            <ul>
              <li
              v-for="(item,index) in userCurrentFav" :key="index"
                style="text-align: center"
              >
                <div style="">
                  <v-btn
                    :ripple="false"
                    :style="{color:getCurrentTheme.global_theme_color}"
                    outlined
                    fab
                    class="story"
                    ><img v-if="item.STATE ? item.STATE.PARAMETERS.fav_icon : item.fav_icon != ''" :src="getImg(item.STATE ? item.STATE.PARAMETERS.fav_icon : item.fav_icon)" />
                    <v-btn
                      color="red"
                      @click="removeFav(index)"
                      elevation="0"
                      fab
                      class="actionBtn"
                      ><img
                        src="../../assets/menusPhotos/maxFavoritesPopup/Delete.svg"
                    /></v-btn>
                  </v-btn>
                  <span
                    class="favoriteLabels"
                    style="font-family: almoni; font-size: 16px"
                    >{{ item.STATE ? item.STATE.PARAMETERS.headline_config.title : item.headline_config.title}}</span
                  >
                </div>
              </li>
            </ul>
          </div>
  
          <v-divider
            class="my-3 ma-5"
            style="background-color: #e4e4e4"
          ></v-divider>
  
          <v-card-text
            class="mt-2"
            :style="
              'font-size:18px; font-family:almoni-demibold; padding-bottom: 0px; text-align: right;color:' +
              getCurrentTheme.max_fevorite.card_color
            "
          >
            שעונים נוספים
          </v-card-text>
  
          <div class="FavDiv" dir="rtl" v-if="newFav != {}">
            <ul>
              <li v-for="(item,index) in newFav" :key="index">
                <div style="">
                  <v-btn
                    :ripple="false"
                    :style="{color:getCurrentTheme.global_theme_color}"
                    outlined
                    fab
                    class="story"
                    ><img v-if="item.fav_icon ? item.fav_icon : item.STATE.PARAMETERS.fav_icon != ''" :src="getImg(item.fav_icon ? item.fav_icon : item.STATE.PARAMETERS.fav_icon)" />
                    <v-btn
                      color="green"
                      @click="addFav(index)"
                      elevation="0"
                      class="actionBtn"
                      fab
                      style=""
                      ><img src="../../assets/menusPhotos/maxFavoritesPopup/Add.svg"
                    /></v-btn>
                  </v-btn>
                  <span
                    class="favoriteLabels"
                    style="font-family: almoni; font-size: 16px"
                    >{{item.STATE ? item.STATE.PARAMETERS.headline_config.title : item.headline_config.title}}</span
                  >
                </div>
              </li>
            </ul>
          </div>
  
          <v-card-actions
            style="text-align: center; display: grid; place-content: center"
          >
            <v-spacer></v-spacer>
            <span v-if="maxFav" class="mt-4 mb-3" style="color: #e7584d"
              >ניתן להוסיף עד 6 שעונים</span
            >
            <v-btn
              class="mb-4 mt-2"
              
              :color=getCurrentTheme.global_theme_color
              elevation="0"
              rounded
              @click="save"
              style="
                font-family: almoni-medium;
                color: white;
                font-size: 20px;
                border-radius: 10px;
                width: 150px;
                height: 35px;
                border-radius: 18px;
                width: 197px;
                height: 36px;
              "
            >
              שמירה
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  
  <script>
  import { mapGetters,mapActions } from 'vuex'
  import FavoriteAxios from "../utils/FavoriteAxios";
  export default {
    data: () => {
      return {
        currentViewId:0,
        dialog: true,
        newFav: [],
        userCurrentFav: [],
        maxFav: false,
        emptyFav: false,
      };
    },
  
    created() {
        this.newFav.push(this.$store.state.selected_view_param);
        this.currentViewId = this.$store.state.selected_view_id;
        this.userCurrentFav = [...this.GET_USER_FAV]
  
    },
  
    computed: {
    ...mapGetters(["GET_USER_FAV"]),
    },
    methods: {
      ...mapActions(["SET_FAV_LIST","DO_FETCH","END_FETCH"]),
    //Get user favorites
    GetUserFav: function () {
      this.SET_FAV_LIST()
    },

      exitPopup() {
        this.$store.state.max_favorite_popup = false
        this.maxFav = false;
        this.emptyFav = false;
      },
      getImg(img) {
        try {
                return this.getCurrentTheme.theme == "darkTheme" ? require(`@/assets/FavBar/${img}_dark.svg`) : require(`@/assets/FavBar/${img}.svg`);
            }
            catch (e) {
                //defaultImage
                return require("@/assets/FavBar/bar.svg");
            }
        },
  
      removeFav(favId) {
        this.maxFav = false;
        this.emptyFav = false;
        this.newFav.push(this.userCurrentFav[favId]);
        this.userCurrentFav.splice(favId, 1)
      },
  
      addFav(newFIndex) {
        this.emptyFav = false;
        if (this.userCurrentFav.length < 6) {
          this.userCurrentFav.push(this.newFav[newFIndex]);
          this.newFav.splice(newFIndex, 1)
        } else {
          this.maxFav = true;
        }
      },
  
      async save() {
        for(let item in this.newFav){
            if(this.newFav[item].VIEW_ID){
            console.log(this.newFav[item].VIEW_ID);
            this.$store.state.selected_view_id = this.newFav[item].VIEW_ID
            await FavoriteAxios.RemoveUserFav()
            .then(() => {
              //if we got new info update user favorite list
              this.GetUserFav();
            })
            .catch((error) => {
              console.log("Got error removing user fav: ", error);
            });
            }
          }
        for(let item in this.userCurrentFav){
            if(!this.userCurrentFav[item].VIEW_ID){
               this.$store.state.selected_view_id = this.userCurrentFav[item].VIEW_ID
               this.$store.state.selected_view_param = Object.assign({},this.userCurrentFav[item]) 
               this.$store.state.selected_view_param["TEMPLATE_TYPE"] = this.userCurrentFav[item].TEMPLATE_TYPE
               this.$store.state.selected_view_id = this.currentViewId;
               FavoriteAxios.AddUserFav()
                  .then(() => {
                    //if we got new info update user favorite list
                      this.GetUserFav();
                  })
                  .catch((error) => {
                    console.log("Got error adding user fav: ", error);
                    console.log("Maximum favorites =>" ,error.response.status);
                    if(error.response.status == 400){
                      this.$refs.RefMaxFavoritePopup.dialog = true
                    }
                  });
            } 
          }

        this.maxFav = false;
        this.$store.state.max_favorite_popup = false
      },
    },
  };
  </script>
  
  <style scoped>
    .card-icon{
      position: absolute; left: 10px; top: 10px
    }
    .card-title{
      place-content: center;
      font-family: almoni-demibold;
      font-size: 26px;
      color: #0F2558;
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