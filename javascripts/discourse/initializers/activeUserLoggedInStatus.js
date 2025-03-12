import { withPluginApi } from "discourse/lib/plugin-api";
import { userLoggedInStatus } from "../utility";

export default {
    name: "activeUserLoggedInStatus",
    initialize() {
        withPluginApi("0.8.18", (api) => {
            api.onPageChange(() => {
                userLoggedInStatus(api);
                console.log("testing Page changed");
            });
            api.onAppEvent("post-stream:posted", () => {
                userLoggedInStatus(api);
                console.log("testing posted");
            });
        });
    },
};
