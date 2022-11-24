import axios from "axios";

const state = {
    loginUrl: "/shavit/system/login",
    hqsQueryUrl: "/shavit/system/hq/query",
    isAuthenticated:false,
    userInfo:{sid:"", user_id:"",prefTheme:"lightTheme",main_hq:"100"},
    hqDict: {},
    // currUserData: JSON.parse(window.localStorage.getItem("currUserData")) || {},
}
//window.localStorage.getItem("sessionid")
const actions = {
    async ACT_LOGIN({rootState, commit }, input) {
        const result = await axios.post(this.state.serverAdrr+"/shavit-mobile/login", input)
        if (!result.status) {
            console.log("fail login request", result.data.success)
        } else { 
                   await axios
                    .get(this.state.serverAdrr+"/shavit-mobile/hq", 
                    {params: { sid: result.data.sid}}
                    )
                    .then(response => {
                        rootState.loginStore.isAuthenticated = true
                        rootState.loginStore.userInfo.sid = result.data.sid
                        rootState.loginStore.userInfo.user_id = result.data.userid
                        console.log("200 - test request for sid USER INFO: ",rootState.loginStore.userInfo)

                        // store.commit("SET_LOGGED_IN", result.data)
                        // commit("SET_LOGGED_IN", result.data)

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