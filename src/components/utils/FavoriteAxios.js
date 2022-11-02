import axios from "axios";
import store from "../../store";

//Base shavit mobile
const ShavitMobileFavReq = axios.create({
  baseURL: store.state.serverAdrr + "/shavit-mobile/favorite/",
});

export default {
  //getting user fav
  getUserFav() {
    return ShavitMobileFavReq.get(`${store.state.currUser.user_id}`, {
      params: {
        sid: store.state.currUser.sessionId,
      },
    });
  },

  //add to user fav
  AddUserFav() {
    let fav_state = {
      PARAMETERS: store.state.selected_view_param,
      CUSTOM_SETTINGS: store.state.custom_bookmark_data,
    };
    let final_fav_setttings = {
      viewid: store.state.selected_view_id,
      userid: store.state.currUser.user_id,
      state: fav_state,
    };
    return ShavitMobileFavReq.post("add", final_fav_setttings, {
      params: {
        sid: store.state.currUser.sessionId,
      },
    });
  },
  //remove favorite
  RemoveUserFav() {
    return ShavitMobileFavReq.delete(
      `${store.state.currUser.user_id}/${store.state.selected_view_id}`,
      {
        params: {
          sid: store.state.currUser.sessionId,
        },
      }
    );
  },
};
