import { axios } from "./axiosConfig";
import store from "../store";


export const myApi = (endPoint) => {
    return axios({
        method: "get",
        url: `${store.state.serverAdrr}/shavit/mobile/data${endPoint}`,
        timeout: 1000 * 8, // Wait for 8 seconds
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            sid: store.state.currUser.sessionId
        }
        })
}

export const myShavitApiV1 = (endPoint) => {
    return axios({
        method: "post",
        url: `${store.state.serverAdrr}/shavit/${endPoint}`,
        timeout: 1000 * 8, // Wait for 8 seconds
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            sid: store.state.currUser.sessionId
        }
        })
}

