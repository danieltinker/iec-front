<template>
    <div
      class="favContainer"
      :style="
        'background-color: ' +
        getTheme.mainLabelColor +
        '; color: ' +
        getTheme.labelsColors.mainLabelColor
      "
    >
      <div
        :style="
          'background-color: ' +
          getTheme.mainLabelColor +
          '; color: ' +
          getTheme.labelsColors.mainLabelColor +
          '; overflow-x: auto; margin-right:3px;'
        "
      >
        <div style="display: flex" class="mr-3">
          <v-col
            class="mt-2 ml-5 mb-2"
            :style="
              '0-0' in getUserFavData
                ? 'width: 58px; height:97px; text-align: center;'
                : 'width: 58px; height:112px; text-align: center;'
            "
            v-for="(fav, clockKey) in getUserFavData"
            :key="clockKey"
          >
            <v-row
              ><v-btn
                color="#935287"
                outlined
                fab
                class="story"
                @click="openQuickViewPopup(clockKey, fav)"
                ><img v-if="fav.icon != ''" :src="getImgUrl(fav.icon)" /></v-btn
            ></v-row>
            <v-row
              class="mt-5"
              :style="
                'place-content: center; color: ' +
                getTheme.labelsColors.mainLabelColor
              "
              ><label
                class="favoriteLabels"
                :style="'color: ' + getTheme.labelsColors.mainColor"
                >{{ fav.name }}</label
              ></v-row
            >
          </v-col>
        </div>
      </div>
      <QuickViewPopup v-if="$store.state.openQuickViewPopup == true" />
  
      <vue-bottom-sheet ref="addFavoriteGuide">
        <div id="sheetContent" style="">
          <span id="headline" class="" style="">מבט מהיר</span>
          <img
            v-if="getTheme.theme == 'lightTheme'"
            src="../../assets/menusPhotos/QuickViewPopup/FavBarStructure-lightTheme.svg"
            alt=""
          />
          <img
            v-else
            src="../../assets/menusPhotos/QuickViewPopup/FavBarStructure-darkTheme.svg"
            alt=""
          />
          <span
            class="mb-3"
            style="font-size: 18px; width: 75%; justify-self: center"
            >צפה במהירות במידע הרלוונטי עבורך על ידי לחיצה על כפתוח "שמירה".</span
          >
          <v-icon class="mb-3" style="font-size: 30px" color="#935287"
            >mdi-bookmark-outline</v-icon
          >
          <span
            class="mb-2"
            style="
              font-size: 16px;
              width: 75%;
              justify-self: center;
              color: #606060;
            "
          >
            ניתן להוסיף 6 שעונים לבחירתך
          </span>
          <div id="allDataTemplate" style="">
            <img
              v-if="getTheme.theme == 'lightTheme'"
              src="../../assets/menusPhotos/QuickViewPopup/watchStructure-lightTheme.svg"
              alt=""
            />
            <img
              v-else
              src="../../assets/menusPhotos/QuickViewPopup/watchStructure-darkTheme.svg"
              alt=""
            />
          </div>
        </div>
      </vue-bottom-sheet>
    </div>
  </template>
  
  <script>
  import QuickViewPopup from "./QuickViewPopup.vue";
  
  export default {
    data: () => {
      return {};
    },
    components: {
      QuickViewPopup,
    },
    created() {},
  
    methods: {
      getImgUrl(img) {
        var images = require.context(
          "../../assets/menusPhotos/FavBar/",
          false,
          /\.svg$/
        );
        return images("./" + img + ".svg");
      },
  
      openQuickViewPopup(clockKey, fav) {
        if (fav["icon"] != "" && fav["icon"] != "plus") {
          this.$store.state.selectedQuickView = { clockKey: fav };
          this.$store.state.itoc = "";
          this.$store.state.openQuickViewPopup = true;
        }
  
        if (fav["icon"] == "plus") {
          this.$refs.addFavoriteGuide.open();
          this.$refs.addFavoriteGuide.$refs.bottomSheetCard.style.backgroundColor =
            this.getTheme.secColor;
        }
      },
    },
    computed: {
      getUserFavData() {
        return this.$store.state.loginStore.currUserData.favorites;
      },
  
  
    },
  };
  </script>
  
  <style scoped>
  .favContainer {
    direction: rtl;
    margin-top: 65px;
    right: 0;
    display: grid;
  }
  
  ::-webkit-scrollbar {
    height: 0px;
    width: 0px;
    border: 0px solid #d5d5d5;
  }
  
  .story {
    box-shadow: none;
    height: 58px;
    width: 58px;
  }
  
  .favoriteLabels {
    font-family: almoni;
    size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    /* word-wrap: break-word; */
    text-overflow: ellipsis;
  }
  
  .favRow {
    overflow-x: auto;
    margin-top: 2rem;
  }
  
  ::v-deep .bottom-sheet__card.fx-default {
    height: max-content !important;
  }
  
  #sheetContent {
    font-family: almoni;
    text-align: center;
    justify-items: center;
    display: grid;
    padding-bottom: 10px;
  }
  
  #headline {
    font-family: almoni-medium;
    font-size: 24px;
    color: #935287;
  }
  </style>