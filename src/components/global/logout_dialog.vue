<template>
    <v-dialog persistent class="logoutPopup" v-model="$store.state.is_logout_dialog" width="500"
        content-class="elevation-0">
        <v-card dir="" class="main_card_ti" :color="getCurrentTheme.logout_dialog.main_card">
            <v-btn icon text>
                <v-icon class="card_icon" @click="$store.state.is_logout_dialog = false"
                    :color="getCurrentTheme.logout_dialog.card_btn_title">mdi-close</v-icon>
            </v-btn>
            <v-card-title :style="{color:getCurrentTheme.logout_dialog.card_btn_title}" class="mb-2 card_title">
                ?האם ברצונך להתנתק</v-card-title>

            <v-card-actions dir="rtl" class="popupAction">
                <v-row style="margin-top: -25px; !important">
                    <v-col>
                        <v-btn class="mb-4 card_col" :color="getCurrentTheme.global_theme_color" elevation="0" @click="processLogout">
                            כן
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn outlined class="mb-4 card_col_btnn" :color="getCurrentTheme.logout_dialog.main_card" elevation="0"
                            @click="$store.state.is_logout_dialog = false" :style="{color:getCurrentTheme.logout_dialog.btn_color}">
                            לא
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    computed:{},
    methods: {
        processLogout() {
            localStorage.clear()
            // localStorage.removeItem('user_id');
            // localStorage.removeItem('sessionid');
            // localStorage.removeItem('hebrew_name');
            // localStorage.removeItem('hq_name');
            // localStorage.removeItem('main_hq');
            // localStorage.removeItem('prefTheme');
            this.$router.push("mobile_login");
            this.$store.state.is_logout_dialog = false
        }
    }


}
</script>

<style scoped>
.main_card_ti {
            font-family:almoni;
            color:black;
            border-radius: 20px; 
            overflow: hidden; 
            position: relative;
}
.card_icon{
    position: absolute; 
    left: 10px; 
    top: 0px;
}

.card_title {
    
    margin-bottom: 40px !important;
    place-content: center; 
    font-family:almoni-medium; 
    font-size:20px; 
    position:relative;
}
.popupAction {
    text-align: center; 
    display: grid; 
    place-content: center
}

.card_col {
    font-family: almoni-medium;
    font-size: 20px;
    border-radius: 18px;
    width: 90px;
    height: 36px;
    color: #ffffff !important;
}

.card_col_btnn {
    font-family:almoni-medium; 
    font-size:20px; 
    border-radius: 18px; 
    width: 90px; 
    height: 36px;
}



</style>