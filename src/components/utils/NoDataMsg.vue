<template>
    <div style="display: flex; align-items: center;height:150px">
    <!-- <v-card class="text-xs-center" style="margin: auto; max-width: 220px; min-height: 20px; min-width: 220px;; dark;"> -->
      <v-card
            :color="isDrill ? getCurrentTheme.kpi.drill_background : getCurrentTheme.kpi.main_no_data_background"
            max-width=220
            
            min-width=220
            min-height=20
            :loader-height="8"
            dark
            class="text-xs-center"
            style="margin: auto;"
          >
      <div v-if="message" style="place-content: center;font-family: almoni-medium;font-size:16px;padding:4px !important" :style="{color : getCurrentTheme.generic_title_color}">
            {{ message }}
          </div>

          <div v-else style="place-content: center;font-family: almoni-medium;font-size:16px;padding:4px !important" :style="{color : getCurrentTheme.generic_title_color}">
            אין פריטים זמינים להצגה
          </div>
    </v-card>
    </div>
    
</template>

<script>
export default {
    props: {
        templateType: { type: String },
        isDrill:{type:Boolean},
        message:{type:String}
        }
}
</script>

<style scoped>
:deep() .v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: none;
}

.main-center{
    padding-top:10%
     
     
}
.no-data-box{
    display: flex;
    color:v-bind('getCurrentTheme.generic_title_color');
    align-items: center;
    vertical-align: center;
    justify-content: space-around;
    padding-top: 12px;
    background-color: v-bind('isDrill ? getCurrentTheme.kpi.drill_background : getCurrentTheme.kpi.main_no_data_background');
    margin: auto;
    /* margin-top: 20px;
    margin-bottom: 10px; */
    text-align: center;
    width: 220px;
    height: auto;
    border-radius: 4px;
    font-size: 18px;
    font-family: almoni-demibold;
}

.no-data-info{
    width: 200px;
    height: 20px;
    font-size: 14px;
}
</style>