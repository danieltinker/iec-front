import axios from "axios";

const state = {
    loginUrl: "/shavit/system/login",
    hqsQueryUrl: "/shavit/system/hq/query",
    isAuthenticated: JSON.parse(window.localStorage.getItem("currUserData")) ? true : false,
    currUserData: JSON.parse(window.localStorage.getItem("currUserData")) || {},
    hqDict: {},
}

const actions = {
    async ACT_LOGIN({ commit }, input) {
        const result = await axios.post(this.$store.state.serverAdrr+"/shavit-mobile/login", input)
        console.log("login route result:", result)
        if (!result.data.success) {
            // commit("SET_SNACKBAR", {showSnackbar: true, 
            //                         success: result.data.success,
            //                         message: result.data.message})
        } else {
                   await axios
                    .get(this.$store.state.serverAdrr+"/shavit-mobile/hq", 
                    {params: { sid: this.$store.state.currUser.sessionId }}
                    )
                    .then(response => {
                        // put the sid from this session in store.
                        // put the flag for valid_sid in store.
                        this.valid_sid = true
                        console.log("400 - test request for sid ")
                        console.log(window.localStorage.getItem("user_id"), " my user id")
                        console.log(this.$store.state.currUser.user_id, " my user id")
                    })
                    .catch((error) => {
                        console.log("session ID isnt Valid")
                        console.log(error);
                    });

            commit("SET_LOGGED_IN", result.data.data[0])
        }

        return result.data.success;
    },
    ACT_LOGOUT({ commit }) {
        commit("SET_LOGOUT")
    },
}

const mutations = {
    SET_LOGGED_IN(state, userData) {
        state.isAuthenticated = true
        userData["userHqName"] = state.hqDict[userData.hq].title
        state.currUserData = userData
        localStorage.setItem('currUserData', JSON.stringify(userData))

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