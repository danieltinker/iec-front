import axios from "axios";

const state = {
    loginUrl: "/shavit/system/login",
    hqsQueryUrl: "/shavit/system/hq/query",
    isAuthenticated:false,
    userInfo:{sid:"", user_id:"",prefTheme:"lightTheme",main_hq:"100",hebrew_name:"",hq_name:""},
    hqDict: {},
    // currUserData: JSON.parse(window.localStorage.getItem("currUserData")) || {},
}
//window.localStorage.getItem("sessionid")
const actions = {
    async ACT_LOGIN({rootState, commit }, input) {
        const result = await axios.post(this.state.serverAdrr+"/shavit-mobile/login", input)
        if (!result.status) {
            console.log("fail login request", result.data.success)
        } 
        else { 
            await axios
            .get(this.state.serverAdrr+"/shavit-mobile/test"
            )
            .then(response => {
                console.log("Login store: setting local storage, isAuthenticated & userInfo")
                localStorage.setItem("hebrew_name",result.data.hebrew_name) 
                localStorage.setItem("hq_name",result.data.hq_name) 
                localStorage.setItem("prefTheme",result.data.prefTheme) 
                localStorage.setItem("sessionid",result.data.userid) 
                localStorage.setItem("user_id",result.data.sid) 
                localStorage.setItem("main_hq",result.data.main_hq) 


                rootState.loginStore.userInfo.sid = result.data.sid
                rootState.loginStore.userInfo.user_id = result.data.userid
                rootState.loginStore.userInfo.main_hq = result.data.main_hq
                rootState.loginStore.userInfo.hebrew_name = result.data.hebrew_name
                rootState.loginStore.userInfo.hq_name = result.data.hq_name
                rootState.prefTheme = result.data.prefTheme
                rootState.loginStore.isAuthenticated = true
                this.$router.push("/");
                
                console.log("200 - SUCCESSFUL LOGIN + HQ requests loginStore.UserInfo: ",rootState.loginStore.userInfo)
            })
            .catch((error) => {
                rootState.loginStore.isAuthenticated = false
                console.log("session ID isnt Valid")
                console.log(error);
            });

        }

        return result.data.success;
    },
    ACT_LOGOUT({ commit }) {
        commit("SET_LOGOUT")
    },
}

const mutations = {
    SET_LOGGED_IN(state, userData) {
        console.log("set auth to true and user data to store",state,userData)
        state.isAuthenticated = true
    },
    SET_LOGOUT(state) {
        state.isAuthenticated = false
        state.currUserData = {}
        localStorage.removeItem("currUserData")
    }
}

const getters = {}

const methods = {
    // Query all hqs
    async MET_GET_HQS(rootState, sessionId) {
        const hqResponse = await axios.post(rootState.serverUrl + state.hqsQueryUrl, null,
                                          { params: { sid: sessionId }})
        for (let hq of hqResponse.data.data) {
            state.hqDict[hq.hq_id] = hq
        }
    }
}

export default {
    state,
    actions,
    getters,
    mutations,
};