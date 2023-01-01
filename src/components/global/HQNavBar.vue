<template>
    <div>
      <v-overlay :value="drawer" z-index="4"></v-overlay>
      <v-app-bar :color="getCurrentTheme.app_background" app clipped-right flat dir="rtl">
        <v-app-bar-nav-icon :color="getCurrentTheme.hq_navbar.bar_icon" style="margin-right: -10px;" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title :style="'margin-right: 15px; font-family: almoni; font-size: 27px; color:' +
        getCurrentTheme.hq_navbar.toolbar_title">
          {{getAppTitle}}
        </v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer :color="getCurrentTheme.hq_navbar.navigation_drawer" v-model="drawer" app right clipped dir="rtl">
        <v-icon class="my-2" dir @click="drawer = !drawer" :color="getCurrentTheme.hq_navbar.span_color_first" style="font-size: 30px; justify-content: right;">mdi-close</v-icon>
        
        <div
        class="pa-3"
        :style="
          'background-color: ' + getCurrentTheme.hq_navbar.user_background + '; font-size:15px;'
        "
      >
        <span
          :style="
            'font-size:18px;font-family: almoni; display: flex; text-align: right; color: ' +
            getCurrentTheme.hq_navbar.toolbar_title
          "
          dir="rtl"
          >שם משתמש: {{$store.state.loginStore.userInfo.hebrew_name}}</span
        >
        <span
          :style="
            'font-size:18px;font-family: almoni; display: flex; text-align: right; color: ' +
            getCurrentTheme.hq_navbar.toolbar_title
          "
          dir="rtl"
          >מטה: {{hq_name_normal}} </span
        >
      </div>
        <v-list nav dense>
          <v-list-item-group v-model="group">
            <v-list-item v-for="item in hqs" :key="item.HQ_ID" @click="setHQ(item)">
              <v-list-item-title :style="{color:getCurrentTheme.global_theme_color}" style="font-size: 18px; font-family: almoni-medium">{{item.LABEL}}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <!-- myTheme -->

        <v-row dir="rtl" class="" style="padding: 12px; text-align: center; align-content: baseline;">
        <v-col cols="5" style="align-self: center"
          ><span
            :style="
              'font-size: 18px; font-family: almoni;color: ' +
              getCurrentTheme.hq_navbar.span_color_first
            "
            >תצוגת מסך</span
          ></v-col
        >
        <v-col cols="7" style="">
          <label class="switch">
            <input type="checkbox" v-model="theme" />
            <span
              class="slider round"
              :style="'background-color:' + getCurrentTheme.hq_navbar.span_color_sec"
            ></span>
            <div class="light-theme-label">
              <img
                v-if="getCurrentTheme.theme == 'lightTheme'"
                src="../../assets/menusPhotos/AppBar/lightTheme/sun.svg"
                alt=""
                class=""
              />
              <img
                v-if="getCurrentTheme.theme == 'darkTheme'"
                src="../../assets/menusPhotos/AppBar/darkTheme/sun.svg"
                alt=""
                class="ml-1"
              />

              <span
                :style="
                  theme == false
                    ? 'color: #0F2558; font-family:almoni; font-size: 16px;'
                    : 'color:' +
                    getCurrentTheme.hq_navbar.span_color_third +
                      ' ; font-family:almoni; font-size: 16px;'
                "
                >בהירה</span
              >
            </div>
            <div class="dark-theme-label">
              <img
                v-if="getCurrentTheme.theme == 'lightTheme'"
                src="../../assets/menusPhotos/AppBar/lightTheme/moon.svg"
                alt=""
                class=""
              />
              <img
                v-if="getCurrentTheme.theme == 'darkTheme'"
                src="../../assets/menusPhotos/AppBar/darkTheme/moon.svg"
                alt=""
                class="ml-1"
              />
              <span
                :style="
                  theme == true
                    ? 'color: #0F2558; font-family:almoni; font-size: 16px;'
                    : 'color:' +
                    getCurrentTheme.hq_navbar.span_color_third +
                      ' ; font-family:almoni; font-size: 16px;'
                "
                >כהה</span
              >
            </div>
          </label>
        </v-col>
      </v-row>

      
      <!-- logout -->

      
      <div
        class="mb-10"
        style="
          text-align: center;
          position: flex;
          margin-top: 20px;
          bottom: 0;
          width: 100%;
        "
      >
        <v-btn
          outlined
          :color="getCurrentTheme.hq_navbar.logout_btn"
          style="
            font-family: almoni-medium;
            font-size: 20px;
            width: 121px;
            height: 37px;
            margin-top: auto;
          "
          elevation="0"
          rounded
          @click="$store.state.is_logout_dialog = true"
          >התנתק/י</v-btn
        >
      </div>

      <!-- logout -->

      <Logout_dialog v-if="$store.state.is_logout_dialog" />


      </v-navigation-drawer>
    </div>
  </template>
  
    <script>
  import axios from "axios";
import Logout_dialog from "./logout_dialog.vue";
  export default {
    methods: {
        setHQ(item) {
            this.$store.state.selected_hq_id = item.HQ_ID;
            this.$store.state.appTitle = item.LABEL;
            this.$store.state.clearSubCategory = undefined;
            window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
        }
    },
    computed: {
      hq_name_normal(){
        return this.$store.state.loginStore.userInfo.hq_name
      },
        getAppTitle() {
            return this.$store.state.appTitle;
        }
    },
    async created() {
        //set switch button true/false by theme
        //yolan :C :C code = this.theme = this.$store.state.prefTheme == "darkTheme"
        this.$store.state.prefTheme == "darkTheme" ? this.theme = true : this.theme = false;
        //get hqs By sid
        await axios
            .get(this.$store.state.serverAdrr + "/shavit-mobile/hq", { params: { user_id: this.$store.state.loginStore.userInfo.user_id, sid: this.$store.state.loginStore.userInfo.sid } })
            .then(response => {
            this.hqs = response.data;
            response.data.forEach(obj => {
                if (obj["HQ_ID"] == this.$store.state.loginStore.userInfo.main_hq) {
                    this.$store.state.appTitle = obj["LABEL"];
                }
            });
        })
            .catch((error) => {
            console.log(error);
        });
    },
    data: () => ({
        theme: false,
        drawer: false,
        group: null,
        hqs: [],
    }),
    watch: {
        group() {
            this.drawer = false;
        },
        async theme() {
            // change store theme by user
            this.theme ? this.$store.state.prefTheme = "darkTheme" : this.$store.state.prefTheme = "lightTheme";
            let currentTheme = this.theme ? "darkTheme" : "lightTheme";
            localStorage.setItem("prefTheme", currentTheme);
            if (this.theme) {
                console.log("App Theme Mode: Dark");
            }
            else {
                console.log("App Theme Mode: Light");
            }
            // update DB user theme
            await this.$myShavitApi(`user/themes/${currentTheme}`)
                .then(response => {
                // console.log(response);
            })
                .catch(error => {
                console.log(error, "user theme update failed");
            });
        }
    },
    components: { Logout_dialog }
};
  </script>
  
  <style scoped>
    :deep()  .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close),
.v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
  width: 85% !important;
}

    .light-theme-label {
  position: absolute;
  top: 10px;
  right: 9px;
  color: #606060;
  display: flex;
  align-self: center;
}

.dark-theme-label {
  position: absolute;
  top: 10px;
  left: 18px;
  color: #0F2558;
  display: flex;
  align-self: center;
}
.switch {
  width: 157px;
  height: 43px;
  position: relative;
  display: block;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #e4e4e4;
  transition: 0.5s;
  border-radius: 21.6px;
}
.slider::before {
  position: absolute;
  content: "";
  top: 4px;
  right: 5px;
  background-color: #ffffff;
  transition: 0.5s;
}

.switch input {
  display: none;
}

input:checked + .slider {
  background-color: #b8b8b8;
}

.slider.round {
  border-radius: 35px;
}

.slider.round:before {
  width: 74.5px;
  height: 35px;
  border-radius: 21.6px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.31);
}

input:checked + .slider:before {
  transform: translateX(-73px);
}
  </style>