import { axios } from "./axiosConfig";
import store from "../store";


export const myApi = (endPoint,isDrill) => {
    return axios({
        method: "get",
        url: `${store.state.serverAdrr}/shavit-mobile/data?dsname=${endPoint}&isDrill=${isDrill}`,
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
        url: `${store.state.serverAdrr}/shavit-mobile/${endPoint}`,
        timeout: 1000 * 8, // Wait for 8 seconds
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            sid: store.state.currUser.sessionId
        }
        })
}

