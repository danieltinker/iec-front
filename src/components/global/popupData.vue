<template>
    <div class="" style="margin-top:20px;text-align: center;" v-if="isShow">

        <div dir="ltr" class="main_container" :style="{ backgroundColor: getCurrentTheme.app_background }">
            <!-- {{ items[$store.state.popupData.selected_label] }} -->
            <!-- {{ $store.state.popupData.popup_data }} -->


            <v-row class="" style="text-align: center; margin-top: 5px; margin-bottom: 5px">
                <v-col cols="4" style="text-align: left;padding-top:5px;padding-bottom:0px;padding-left:25px"><v-icon
                        @click="$store.state.popupData.showPopupData = false,$store.state.quick_view = false" :style="
                            'font-size: 30px ' +
                            '; color: ' +
                            getCurrentTheme.app_color
                        ">mdi-close</v-icon></v-col>

                <v-col cols="4" style="padding-top:0;padding-bottom:0;font-family:almoni;font-size:24px">
                    <span>  </span></v-col>
                

                        <v-col cols="4" style="text-align: right;padding-top:5px;padding-bottom:0px;padding-right:25px" @click="$store.state.popupData.showPopupData = false">
                    <v-icon v-if="$store.state.quick_view" :style="
                            'font-size: 30px ' +
                            '; color: ' +
                            getCurrentTheme.app_color
                        ">mdi-chevron-right</v-icon>
                </v-col>
                
            </v-row>
            <!-- <img src="./95327-usa-confetti.gif" alt="" style="max-width: 100%;
    height: auto;
    width: auto\9;"></img>
            <h1 style="    position: absolute;
    top: 40%;
    left: 40%;">הפתעה</h1> -->


            <!-- <div v-for="(obj,index) in objects_data_intersection" :key="obj.title">
          {{ index }}
        {{ items[$store.state.popupData.selected_label]['data_'+index] }}
      </div> -->
      <div v-if="errorMSG"><ErrorPage :error_text="errorMsg"/></div>
      <div v-else>
      <span id="chartsHeaders" style="text-align: center;display:block" v-if="$store.state.popupData.popup_title">
                            {{ $store.state.popupData.popup_title }}
                        </span>

                        <span id="chartsSubb" style="text-align: center;marin-top:1px" v-if="$store.state.popupData.popup_sub_title">
                            {{ $store.state.popupData.popup_sub_title }}
                        </span>
                        
            <div v-for="(obj, i) in items[this.$store.state.popupData.selected_label]" :key="i">
                <div class="mt-3">
                    <!-- {{ obj.data.meta }} -->
                    <h1 style="text-align: center;" :style="'color:' + getCurrentTheme.headline.title_color"
                        class="headline-title grid-item" v-if="obj.data.meta && obj.data.meta.headline_config">
                        {{ obj.data.meta.headline_config.title }}
                    </h1>
                    <!-- {{ Object.assign(objects_data_intersection[data_array.template_params]) }} -->
                    <!-- {{objects_data_intersection[data_array.template_params].TEMPLATE_TYPE}} -->
                    <!-- {{ objects_data_intersection[data_array.template_params] }} -->
                    <GenericLayout v-if="objects_data_intersection[obj.template_params]"
                        :template_type="objects_data_intersection[obj.template_params].TEMPLATE_TYPE"
                        :params="Object.assign(objects_data_intersection[obj.template_params].PARAMETERS)"
                        :isDrillDown="false" :view_ID="4444" :staticData="Object.assign(obj.data)"
                        :style="'background-color:' + getCurrentTheme.headline.background">
                    </GenericLayout>
                </div>
            </div>
            <br>
        </div>
    </div>

        <!-- <div v-for="(obj, index) in objects_data_intersection" :key="obj.title">
                <GenericLayout v-if="items[$store.state.popupData.selected_label]['data_' + index]"
                    :template_type="obj.TEMPLATE_TYPE" :params="obj.PARAMETERS" :isDrillDown="false" :view_ID="4444"
                    :ref="'component' + obj.title"
                    :staticData="{ '*': [Object.assign(items[$store.state.popupData.selected_label]['data_' + index])] }">
                </GenericLayout>
            </div> -->
    </div>
    <div v-else class="loader">
        <v-progress-circular :size="40" :width="4" indeterminate :style="{ color: getCurrentTheme.global_theme_color }">
        </v-progress-circular>
    </div>
</template>

<script>
import ErrorPage from "../utils/errorPage.vue";
import GenericLayout from "./GenericLayout.vue";

export default {
    name: 'MyList',
    components: {
    GenericLayout,
    ErrorPage
},
    // props: {
    //     objects_data_intersection: { type: Object },
    // },
    data() {
        return {
            objects_data_intersection: undefined,
            // items: [],
            isShow: false,
            mytest: { "DSadsa": "Dsadsada" },
            items: {},
            errorMSG:undefined

        }
    },
    created() {
        console.log("hereeeee", this.$store.state.popupData.params_popup_data);
        this.objects_data_intersection = this.$store.state.popupData.params_popup_data
        console.log("this.$store.state.popupData.popup_data",this.$store.state.popupData.popup_data);
        console.log("this.$store.state.popupData.selected_label",this.$store.state.popupData.selected_label);
        this.$myApi(this.$store.state.popupData.popup_url)
                        .then(response => {
                            console.log("response.data",response.data);
                            this.items = response.data
                            this.isShow = true

                        })
                        .catch(error => {
                            console.log(error, "drill DATA FETCH ERROR");
                            this.errorMSG = "אין מידע"
                        });
        // if (Object.prototype.hasOwnProperty.call(this.$store.state.popupData.popup_data[this.$store.state.popupData.selected_label], 'data_url')) {
        //     this.$myApi(this.$store.state.popupData.popup_data[this.$store.state.popupData.selected_label]["data_url"])
        //                 .then(response => {
        //                     console.log("response.data",response.data);
        //                     this.items = response.data
        //                     this.isShow = true

        //                 })
        //                 .catch(error => {
        //                     console.log(error, "drill DATA FETCH ERROR");
        //                     this.errorMSG = "אין מידע"
        //                 });

        // } else {
        //     console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
        //     this.items = {
        //         "label2": [
        //             {
        //                 "data": {
        //                     "meta": {
        //                         "chart_titles": { "*": ["dsadasda"] },
        //                         "buttom_text": [{ "title": "test", "text": "text" }, { "title": "test", "text": "text" }],
        //                         "upper_text": [{ "title": "חיפה", "text": "רדינג" }],
        //                         "headline_config": {
        //                             "three_dots_enabled": false,
        //                             "bookmark_enabled": false,
        //                             "title": " טטסטט"
        //                         },
        //                     },
        //                     "*": [[
        //                         {
        //                             "log_id": 1127,
        //                             "log_time": "12/10/2022 | 15:02:58",
        //                             "subject": "dsadsadsad",
        //                             "user_code": "rannnnnnnnnnnnnnnnnnnnnnn",
        //                             "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        //                             "severity": {
        //                                 "desc": "בינונית",
        //                                 "color": "#FFCA28"
        //                             },
        //                             "status": {
        //                                 "color": "#FFCA28"
        //                             }
        //                         }]]
        //                 },
        //                 "template_params": "list_1"
        //             },
        //             {
        //                 "data": {
        //                     "meta": {
        //                         "headline_config": {
        //                             "three_dots_enabled": false,
        //                             "bookmark_enabled": false,
        //                             "title": " 8888טטסטט"
        //                         },
        //                     }, "*": [[]]
        //                 },
        //                 "template_params": "list_2",
        //             }
        //         ], "label1": [
        //             {
        //                 "template_params": "list_1",
        //                 "data": {
        //                     "meta": {
        //                         "headline_config": {
        //                             "three_dots_enabled": false,
        //                             "bookmark_enabled": false,
        //                             "title": " 2222טטסטט"
        //                         },
        //                     },
        //                     "*": [[
        //                         {
        //                             "log_id": 1127,
        //                             "log_time": "12/10/2022 | 15:02:58",
        //                             "subject": "dsadsadsad",
        //                             "user_code": "rannnnnnnnnnnnnnnnnnnnnnn",
        //                             "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        //                             "severity": {
        //                                 "desc": "בינונית",
        //                                 "color": "#FFCA28"
        //                             },
        //                             "status": {
        //                                 "color": "#FFCA28"
        //                             }
        //                         },
        //                         {
        //                             "log_id": 1126,
        //                             "log_time": "12/10/2022 | 15:02:54",
        //                             "subject": "dsadsadטקסט",
        //                             "user_code": "veronika",
        //                             "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        //                             "severity": {
        //                                 "desc": "חמורה",
        //                                 "color": "#D4402E"
        //                             },
        //                             "status": {
        //                                 "color": "#D4402E"
        //                             }
        //                         },
        //                         {
        //                             "log_id": 1105,
        //                             "log_time": "11/10/2022 | 16:16:48",
        //                             "subject": "למה לעזאזל",
        //                             "user_code": "veronika",
        //                             "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        //                             "severity": {
        //                                 "desc": "חמורה",
        //                                 "color": "#D4402E"
        //                             },
        //                             "status": {
        //                                 "color": "#D4402E"
        //                             }
        //                         },
        //                         {
        //                             "log_id": 1104,
        //                             "log_time": "11/10/2022 | 16:16:43",
        //                             "subject": "אל תגידו לי מה לעשות",
        //                             "user_code": "veronika",
        //                             "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        //                             "severity": {
        //                                 "desc": "נמוכה",
        //                                 "color": "#01978A"
        //                             },
        //                             "status": {
        //                                 "color": "#01978A"
        //                             }
        //                         },
        //                         {
        //                             "log_id": 1103,
        //                             "log_time": "11/10/2022 | 16:16:37",
        //                             "subject": "rannnnnnnnnnnnnnnnnnnnnnn משהו",
        //                             "user_code": "veronika",
        //                             "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        //                             "severity": {
        //                                 "desc": "בינונית",
        //                                 "color": "#FFCA28"
        //                             },
        //                             "status": {
        //                                 "color": "#FFCA28"
        //                             }
        //                         }
        //                     ]]
        //                 }
        //             },
        //             {
        //                 "template_params": "list_2",
        //                 "data": {
        //                     "*": [[
        //                         {
        //                             "log_id": 1127,
        //                             "log_time": "12/10/2022 | 15:02:58",
        //                             "subject": "חזל\"ש",
        //                             "user_code": "rannnnnnnnnnnnnnnnnnnnnnn2222222",
        //                             "user_name": "rannnnnnnnnnnnnnnnnnnnnnn2222222222",
        //                             "severity": {
        //                                 "desc": "בינונית",
        //                                 "color": "#FFCA28"
        //                             },
        //                             "status": {
        //                                 "color": "#FFCA28"
        //                             }
        //                         },
        //                         {
        //                             "log_id": 1126,
        //                             "log_time": "12/10/2022 | 15:02:54",
        //                             "subject": "טקסט טקסט טקסט טקסט טקסט טקסט טקסט טקסט טקסט טקסט טקסט",
        //                             "user_code": "veronika",
        //                             "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        //                             "severity": {
        //                                 "desc": "חמורה",
        //                                 "color": "#D4402E"
        //                             },
        //                             "status": {
        //                                 "color": "#D4402E"
        //                             }
        //                         },
        //                         {
        //                             "log_id": 1105,
        //                             "log_time": "11/10/2022 | 16:16:48",
        //                             "subject": "למה לעזאזל",
        //                             "user_code": "veronika",
        //                             "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        //                             "severity": {
        //                                 "desc": "חמורה",
        //                                 "color": "#D4402E"
        //                             },
        //                             "status": {
        //                                 "color": "#D4402E"
        //                             }
        //                         },
        //                         {
        //                             "log_id": 1104,
        //                             "log_time": "11/10/2022 | 16:16:43",
        //                             "subject": "אל תגידו לי מה לעשות",
        //                             "user_code": "veronika",
        //                             "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        //                             "severity": {
        //                                 "desc": "נמוכה",
        //                                 "color": "#01978A"
        //                             },
        //                             "status": {
        //                                 "color": "#01978A"
        //                             }
        //                         },
        //                         {
        //                             "log_id": 1103,
        //                             "log_time": "11/10/2022 | 16:16:37",
        //                             "subject": "rannnnnnnnnnnnnnnnnnnnnnn משהו",
        //                             "user_code": "veronika",
        //                             "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        //                             "severity": {
        //                                 "desc": "בינונית",
        //                                 "color": "#FFCA28"
        //                             },
        //                             "status": {
        //                                 "color": "#FFCA28"
        //                             }
        //                         }
        //                     ]]
        //                 },
        //             }
        //         ]


        //     }
        // }

        this.isShow = true
    }
}
</script>

<style scoped>
.quick-view {
    overflow-y: auto;
}
#chartsHeaders {
    font-family: almoni-medium;font-size: 22px;
    font-size: 18px;
    color: v-bind('getCurrentTheme.generic_title_color');
    /* margin-bottom: 18px; */
}

#chartsSubb{
    font-family: almoni-medium;
    font-size: 18px;
    color: v-bind('getCurrentTheme.generic_title_color');
    /* margin-bottom: 18px; */
}
.scrollable {
    overflow: scroll;
    overflow-y: auto;
}

.main_container {
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 100;
    top: 0%;
    left: 0%;
    right: 0%;
    -webkit-animation: fadeIn 0.15s;
    animation: fadeIn 0.15s;
    overscroll-behavior: none;



    overflow-y: scroll;
    /* only scroll vertically */
}
</style>
