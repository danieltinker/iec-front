import Axios from "axios";
import store from "../store";
const axiosInstance =  Axios.create({
    baseURL:store.state.serverAdrr
})

export const axios = axiosInstance
