import axios from "axios";
import store from "../../store"

//Base shavit mobile
const ShavitMobileFavReq = axios.create({
    baseURL: store.state.serverAdrr + "/shavit/mobile/favorite/"
});

export default{

    //getting user fav
    getUserFav() {
        console.log("Getting user favorites")
        return ShavitMobileFavReq.get(`${store.state.currUser.user_id}`,{},{
            params: {
                sid: store.state.currUser.sessionId,
            }
        })
    },

    //add to user fav
    AddUserFav() {
        console.log("Adding favorite to user")
        return ShavitMobileFavReq.post("",{"viewid":store.state.selected_view_id, "userid": store.state.currUser.user_id, "state": ""},{
            params: {
                sid: store.state.currUser.sessionId,
            }
        })
    },
    //remove favorite
    RemoveUserFav() {
        console.log("Remove favorite to user")
        return ShavitMobileFavReq.delete(`${store.state.currUser.user_id}/${store.state.selected_view_id}`,{},{
            params: {
                sid: store.state.currUser.sessionId,
            }
        })
    }
}