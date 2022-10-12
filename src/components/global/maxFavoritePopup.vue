<template>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500" style="">
        <v-card
          dir="ltr"
          :style="
            'color:' +
            getCurrentTheme.max_fevorite.card_color +
            ';font-family:almoni; ;border-radius: 10px; overflow: hidden; background-color:' +
            getCurrentTheme.max_fevorite.card_background_color
          "
        >
        {{Object.keys(newFav).length}}
          <v-card-title
            style="
              place-content: center;
              font-family: almoni-demibold;
              font-size: 26px;
              color: #935287;
              position: relative;
            "
            class="mb-1"
          >
            <v-icon
              class=""
              @click="exitPopup"
              :color="getCurrentTheme.max_fevorite.card_color"
              style="position: absolute; left: 10px; top: 10px"
              >mdi-close</v-icon
            >
            <span> שעוני מבט מהיר</span></v-card-title
          >
  
          <v-card-subtitle
            :style="
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
              v-if="emptyFav"
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
                    color="#935287"
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
                    color="#935287"
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
              color="#935287"
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
  import axios from "axios";
  import { mapGetters } from 'vuex'
  export default {
    data: () => {
      return {
        dialog: true,
        newFav: [],
        id: "",
        userCurrentFav: [],
        maxFav: false,
        emptyFav: false,
      };
    },
  
    created() {
        console.log(this.$store.state.selected_view_param,"dskdsakskfdsfjsdfj");
        this.newFav.push(this.$store.state.selected_view_param);
        console.log(JSON.stringify(this.$store.state.selected_view_param));
        this.userCurrentFav = [...this.GET_USER_FAV]
        //this.userCurrentFav = [{"USER_ID":999,"VIEW_ID":100,"VIEW_ORDER":3,"STATE":{"PARAMETERS":{"show_main_clock":true,"headline_config":{"three_dots_enabled":true,"bookmark_enabled":true,"title":"example CLIENTS"},"click_open_drill_enabled":true,"data_category":["*"],"selected_category":"*","chart_titles":["My first PIE"],"data_url":"/basicKPITest","expand":false,"fav_icon":"pie","innerPieText":"כללי","drill_down_params":{"innerPieText":"כללי","headline_config":{"three_dots_enabled":true,"bookmark_enabled":true,"title":"drill headline"},"data_category":["*"],"chart_titles":["My first KPI","my second","my third"],"selected_category":"*","enabled":true,"data_url":"/carouselKPItest","template_type":"genericPIE"},"TEMPLATE_TYPE":"genericPIE"},"CUSTOM_SETTINGS":{}}},{"USER_ID":999,"VIEW_ID":101,"VIEW_ORDER":4,"STATE":{"PARAMETERS":{"show_main_clock":true,"headline_config":{"three_dots_enabled":true,"bookmark_enabled":true,"title":"example CLIENTS1"},"click_open_drill_enabled":true,"data_category":["*"],"selected_category":"*","chart_titles":["My first PIE"],"data_url":"/basicKPITest","expand":false,"fav_icon":"pie","innerPieText":"כללי","drill_down_params":{"innerPieText":"כללי","headline_config":{"three_dots_enabled":true,"bookmark_enabled":true,"title":"drill headline"},"data_category":["*"],"chart_titles":["My first KPI","my second","my third"],"selected_category":"*","enabled":true,"data_url":"/carouselKPItest","template_type":"genericPIE"},"TEMPLATE_TYPE":"genericPIE"},"CUSTOM_SETTINGS":{}}},{"USER_ID":999,"VIEW_ID":105,"VIEW_ORDER":5,"STATE":{"PARAMETERS":{"show_clock":true,"headline_config":{"three_dots_enabled":true,"bookmark_enabled":true,"title":"FULL GENERIC"},"click_open_drill_enabled":true,"data_category":["*"],"selected_category":"*","chart_titles":["My first KPI","my second","my third"],"data_url":"/basicKPITest","expand":true,"data_intersection":true,"fav_icon":"pie","drill_down_params":{"show_clock":true,"headline_config":{"three_dots_enabled":true,"bookmark_enabled":true,"title":"drill headline"},"data_category":["*"],"selected_category":"*","chart_titles":["one_title","two_title","three_title"],"data_url":"/carouselKPItest","template_type":"genericKPI"},"TEMPLATE_TYPE":"genericKPI"},"CUSTOM_SETTINGS":{}}}]
        console.log(JSON.stringify(this.GET_USER_FAV));
  
    },
  
    computed: {
    ...mapGetters(["GET_USER_FAV"]),
  
      getUserFavData() {
        return this.$store.state.loginStore.currUserData.favorites;
      },
  
     
    },
    // watch:{
    //     getUserFavData(){
    //         this.userCurrentFav = Object.assign({}, this.getUserFavData);
    //     }
    // },
  
    methods: {
        getTitle(item){
            //{{ item.STATE.PARAMETERS.headline_config.title ? item.STATE.PARAMETERS.headline_config.title : item.headline_config.title}}
            
            
            return item.STATE ? item.STATE.PARAMETERS.headline_config.title : item.headline_config.title

        },
        getFavIcon(item){
            return item.fav_icon || "item.STATE.PARAMETERS.fav_icon"

        },
        getNevFavorites(){
            this.newFav.push(this.$store.state.selected_view_param)
        },
      exitPopup() {
        this.$emit('exitPopUp')
        this.maxFav = false;
        this.emptyFav = false;
      },
  
      getNewFav(id) {
        axios
          .post(
            this.$store.state.serverUrl +
              "/shavit/system/mobile/getFavoritesCatalog",
            null,
            { params: { sid: this.sessionId } }
          )
          .then((result) => {
            if (result.data.success) {
              //update the store and the localStorage
              let tmpNewFav = {};
              tmpNewFav[id] = result.data.data[0][id];
              this.newFav = {
                ...this.newFav,
                ...tmpNewFav,
              };
            }
          });
      },
  
      getImg(img) {
            try {
                return require(`@/assets/FavBar/${img}.svg`);
            }
            catch (e) {
                //defaultImage
                return require("@/assets/FavBar/bar.svg");
            }
        },
  
      removeFav(favId) {
        console.log(this.userCurrentFav);
        this.maxFav = false;
        this.emptyFav = false;
        //this.newFav = [this.userCurrentFav[favId],this.newFav]
        this.newFav.push(this.userCurrentFav[favId]);
        this.userCurrentFav.splice(favId, 1)
        // this.newFav = Object.assign(this.userCurrentFav[favId], this.newFav);
        //this.newFav[favId] = this.userCurrentFav[favId];
        //delete this.userCurrentFav[favId];
        //this.userCurrentFav = Object.assign({}, this.userCurrentFav);
        //if (Object.keys(this.userCurrentFav).length == 0) {
        //  console.log("DEVELOPER MSG - empty Fav list");
        //  this.emptyFav = true;
        //}
      },
  
      addFav(newFIndex) {
        this.emptyFav = false;
        if (this.userCurrentFav.length < 6) {
          // var tmpObj = {}
          // tmpObj[newFIndex] = this.newFav[newFIndex]
          // this.userCurrentFav = {newFIndex:this.newFav[newFIndex], ...this.userCurrentFav}
          //this.userCurrentFav[newFIndex] = this.newFav[newFIndex];
          //delete this.newFav[newFIndex];
          //this.newFav = Object.assign({}, this.newFav);
          this.userCurrentFav.push(this.newFav[newFIndex]);
          this.newFav.splice(newFIndex, 1)
        } else {
          this.maxFav = true;
        }
      },
  
      save() {
        console.log(this.userCurrentFav);
        this.$root.$emit("updateUserPref", this.userCurrentFav);
        // this.$store.state.loginStore.currUserData.favorites =
        this.maxFav = false;
        this.dialog = false;
      },
    },
  };
  </script>
  
  <style scoped>
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