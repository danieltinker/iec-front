import axios from "axios";
import store from "../../store";

//Base shavit mobile
const  ShavitMobileFavReq  = axios.create({
  baseURL: store.state.serverAdrr + "/shavit-mobile/favorite/",
});

export default {
  //getting user fav
  getUserFav() {
    return ShavitMobileFavReq.get(`${store.state.loginStore.userInfo.user_id}`, {
      params: {
        
        sid: store.state.loginStore.userInfo.sid,
      },
    });
  },

  //add to user fav
  AddUserFav() {
    console.log("saving clock to favorites")
    let fav_state = {
      PARAMETERS: store.state.selected_view_param,
      CUSTOM_SETTINGS: store.state.custom_bookmark_data,
    };
    let final_fav_setttings = {
      viewid: store.state.selected_view_id,
      userid: store.state.loginStore.userInfo.user_id,
      state: fav_state,
    };
    return ShavitMobileFavReq.post("add", final_fav_setttings, {
      params: {
        sid: store.state.loginStore.userInfo.sid,
      },
    });
  },
  //remove favorite
  RemoveUserFav() {
    console.log("Removing Clock from Favorites")
    return ShavitMobileFavReq.delete(
      `${store.state.loginStore.userInfo.user_id}/${store.state.selected_view_id}`,
      {
        params: {
          sid: store.state.loginStore.userInfo.sid,
        },
      }
    );
  },
};
