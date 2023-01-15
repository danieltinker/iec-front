<template>
    <div class="scrollable" v-if="isShow">
    <div dir="ltr" class="main_container" :style="{ backgroundColor: getCurrentTheme.app_background }">
        {{ $store.state.popupDialog.selected_label }}
        <!-- {{ items[$store.state.popupDialog.selected_label] }} -->

        <v-row class="" style="text-align: center; margin-top: 5px; margin-bottom: 5px">
            <v-col cols="4" style="text-align: left;padding-top:5px;padding-bottom:0px;padding-left:25px"><v-icon
                    @click="$store.state.popupDialog.showPopupDialog = false" :style="
                        'font-size: 30px ' +
                        '; color: ' +
                        getCurrentTheme.app_color
                    ">mdi-close</v-icon></v-col>
            <v-col cols="4" style="padding-top:0;padding-bottom:0;font-family:almoni;font-size:24px">
                <span> מידע </span></v-col>
            <v-col cols="4" style="padding-top:0;padding:bottom:0;"></v-col>
        </v-row>

        <div v-for="obj in objects_data_intersection" :key="obj.title">
            <GenericLayout :template_type="obj.TEMPLATE_TYPE" :params="obj.PARAMETERS" :isDrillDown="false"
                :view_ID="4444" :ref="'component' + obj.title" :isPopupData="Object.assign(items[$store.state.popupDialog.selected_label])">
            </GenericLayout>
        </div>
    </div>
</div>
</template>

<script>
import GenericLayout from "./GenericLayout.vue";
import axios from 'axios'

export default {
    name: 'MyList',
    components: {
        GenericLayout
    },
    // props: {
    //     objects_data_intersection: { type: Object },
    // },
    data() {
        return {
            objects_data_intersection:undefined,
            items: [],
            isShow:false
        }
    },
    created() {
        this.objects_data_intersection = this.$store.state.popupDialog.params_popup_Dialog
        axios.get('http://20.102.120.232:8080/shavit-mobile/log/logsByType/update_fault')
            .then(response => {
                this.items = {
                    "label1": {
                        "data": [
      {
        "log_id": 1127,
        "log_time": "12/10/2022 | 15:02:58",
        "subject": "חזל\"ש",
        "user_code": "rannnnnnnnnnnnnnnnnnnnnnn",
        "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        "severity": {
          "desc": "בינונית",
          "color": "#FFCA28"
        },
        "status": {
          "color": "#FFCA28"
        }
      },
      {
        "log_id": 1126,
        "log_time": "12/10/2022 | 15:02:54",
        "subject": "טקסט טקסט טקסט טקסט טקסט טקסט טקסט טקסט טקסט טקסט טקסט",
        "user_code": "veronika",
        "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        "severity": {
          "desc": "חמורה",
          "color": "#D4402E"
        },
        "status": {
          "color": "#D4402E"
        }
      },
      {
        "log_id": 1105,
        "log_time": "11/10/2022 | 16:16:48",
        "subject": "למה לעזאזל",
        "user_code": "veronika",
        "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        "severity": {
          "desc": "חמורה",
          "color": "#D4402E"
        },
        "status": {
          "color": "#D4402E"
        }
      },
      {
        "log_id": 1104,
        "log_time": "11/10/2022 | 16:16:43",
        "subject": "אל תגידו לי מה לעשות",
        "user_code": "veronika",
        "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        "severity": {
          "desc": "נמוכה",
          "color": "#01978A"
        },
        "status": {
          "color": "#01978A"
        }
      },
      {
        "log_id": 1103,
        "log_time": "11/10/2022 | 16:16:37",
        "subject": "rannnnnnnnnnnnnnnnnnnnnnn משהו",
        "user_code": "veronika",
        "user_name": "rannnnnnnnnnnnnnnnnnnnnnn",
        "severity": {
          "desc": "בינונית",
          "color": "#FFCA28"
        },
        "status": {
          "color": "#FFCA28"
        }
      }
    ]
                    },
                    "label2": {
                        "data": {}
                    }
                }
            })
            this.isShow = true
    }
}
</script>

<style scoped>
.quick-view{
  overflow-y: auto;
}
.scrollable {
  overflow: scroll;
  overflow-y: auto;
}
.main_container {
    position: fixed;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    z-index: 100;
    top: 0%;
    left: 0%;
    right: 0%;
    -webkit-animation: fadeIn 0.15s;
    animation: fadeIn 0.15s;

    

  overflow-y: scroll; /* only scroll vertically */
}
</style>
