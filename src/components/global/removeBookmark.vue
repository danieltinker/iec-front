<template>
    <div>
      <v-dialog
        persistent
        class="removeBookmarkPopup"
        v-model="isShow"
        width="250"
        content-class="elevation-0"
      >
        <v-card
          dir=""
          :style="
            'color:' +
            getCurrentTheme.remove_dialog.card_main +
            ';font-family:almoni; ;border-radius: 20px; overflow: hidden; position: relative;background-color:' +
            getCurrentTheme.remove_dialog.icon
          "
        >
          <v-btn icon text>
            <v-icon
              class=""
              @click="closePopup"
              :color="getCurrentTheme.remove_dialog.card_main"
              style="position: absolute; left: 10px; top: 0px"
              >mdi-close</v-icon
            ></v-btn
          >
          <v-card-title
            style="
              text-align: center;
              word-break: normal !important;
              line-height: 26px !important;
              font-family: almoni-medium;
              font-size: 20px;
              position: relative;
            "
            class="mb-2"
          >
            ?האם ברצונך להסיר שעון זה מתצוגת מבט מהיר</v-card-title
          >
  
          <v-card-actions
            dir="rtl"
            class="popupAction"
            style="text-align: center; display: grid; place-content: center"
          >
            <v-row style="margin-top: -25px; !important">
              <v-col>
                <v-btn
                  class="mb-4"
                  color="#935287"
                  elevation="0"
                  @click="remove()"
                  style="
                    font-family: almoni-medium;
                    font-size: 20px;
                    border-radius: 18px;
                    width: 90px;
                    height: 36px;
                    color: #ffffff !important;
                  "
                >
                  כן
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  outlined
                  class="mb-4"
                  :color="getCurrentTheme.remove_dialog.icon"
                  elevation="0"
                  @click="closePopup"
                  :style="
                    'font-family:almoni-medium; font-size:20px; border-radius: 18px; width: 90px; height: 36px; color:' +
                    getCurrentTheme.remove_dialog.button_style
                  "
                >
                  לא
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>

  export default {
    data: () => {
      return {
        isShow:true,
      };
    },
  
    created() {
     
    },
  
    methods: {
      closePopup() {
        this.$store.state.removeBookmarkDialog = false;
      },
      async remove(){
            await this.removeBookmark()
            this.$store.state.removeBookmarkDialog = false;
            this.$store.state.quick_view = false

        }
  
      
    },
  };
  </script>
  
  
  <style scoped>
  .removeBookmarkPopup {
    height: 171px !important;
  }
  </style>