<template>
    <div class="container">
    <div class="" style="display: grid; justify-items: center">
      <!-- <img class="logoImg" src="../assets/shavit-logo.png" width="120"> -->
      <h1 class="mt-6">כניסה</h1>
    </div>

    <div class="loginForm">
      <v-form class="mt-5" style="" v-model="validForm" lazy-validation>
        <div style="text-align: right">
          <span style="color: #464649; font-size: 18px; font-family: almoni"
            >שם משתמש</span
          >
        </div>

        <v-text-field
          color="#935287"
          class="text"
          reverse
          dense
          solo
          flat
          outlined
          required
          :rules="rules.userNameRules"
          v-model="userName"
          background-color=""
          label="הזן שם משתמש"
          style="opacity: 0.85"
        ></v-text-field>
        <div style="text-align: right">
          <span style="color: #464649; font-size: 18px; font-family: almoni"
            >סיסמא</span
          >
        </div>
        <v-text-field
          color="#935287"
          class="text"
          reverse
          dense
          solo
          flat
          outlined
          required
          style="opacity: 0.85"
          background-color=""
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="הזן סיסמא"
        ></v-text-field>
        <v-btn
          rounded
          dense
          :disabled="!validForm"
          height="40px"
          elevation="0"
          width="100%"
          class="text mt-3"
          color="#935287"
          style="color: #ffffff; font-family: almoni-bold"
          @click="processLogin"
          >כניסה
        </v-btn>
        <div class="my-3 separator">או</div>
        <v-btn
          rounded
          outlined
          dense
          :disabled="!validForm"
          height="40px"
          elevation="0"
          width="100%"
          class="text"
          color="#FFFFFF"
          style="
            color: #935287;
            font-family: almoni-bold;
            border-color: #935287;
          "
          >כניסה מהירה
        </v-btn>
      </v-form>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      userName: "",
      password: "",
      showPassword: false,
      rules: {
        userNameRules: [(v) => !!v || ""],
        passwordRules: [(v) => !!v || ""],
      },
      validForm: true,
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.loginStore.isAuthenticated,
    }),
  },
  methods: {
    ...mapActions({ login: "ACT_LOGIN" }),
    async processLogin() {
        console.log("try to log in with username:",this.userName,"and password", this.password)
      const loginInput = { username: this.userName, password: this.password };
      const loginResult = await this.login(loginInput);
      console.log("login Result:", loginResult)
      console.log("my hq this.$store.state.loginStore.currUserData.hq")
      if (loginResult) {
        // !! IMPORTANT !!make sure we have the hq of the user on freaking data
        var userHQ = this.$store.state.loginStore.currUserData.hq;
        if (userHQ == 100) this.$store.state.selected_hq_id = 100;
        else if (userHQ == 777) this.$store.state.selected_hq_id = 200;
        else if (200 <= userHQ && userHQ <= 299) this.$store.state.selected_hq_id = 300;
        else if (400 <= userHQ && userHQ <= 499) this.$store.state.selected_hq_id = 400;
        else if (500 <= userHQ && userHQ <= 599) this.$store.state.selected_hq_id = 500;
        else if (600 <= userHQ && userHQ <= 699) this.$store.state.selected_hq_id = 600;
        else if (800 <= userHQ && userHQ <= 899) this.$store.state.selected_hq_id = 800;
        else if (900 <= userHQ && userHQ <= 999) this.$store.state.selected_hq_id = 900;
        else this.$router.push("/login");
      } else {
        this.rules.userNameRules = true;
      }
    },
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.push("home");
    }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: white;
  text-align: -webkit-center;
}
.loginForm {
  justify-items: center;
  background-color: transparent;
  width: 80%;
}

h1 {
  display: inline-grid;
  /* color: #f67200; */
  font-family: almoni-bold;
  text-align-last: center;
  width: 100%;
  font-size: 24px;
}

.text {
  font-family: almoni;
  font-size: 20px;
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: #848591;
  font-family: almoni;
  font-size: 18px;
  width: 55%;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #848591;
}

.separator:not(:empty)::before {
  margin-right: 0.75em;
}

.separator:not(:empty)::after {
  margin-left: 0.75em;
}

/* .v-form >>> .theme--light.v-btn.v-btn--disabled.v-btn--has-bg{background-color:#e0e0e0 !important; opacity:0.9;} */
</style>