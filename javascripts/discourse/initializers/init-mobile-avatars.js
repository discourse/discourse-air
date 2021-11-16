import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", api => {
  api.modifyClass("component:base-topic-list", {
    hideMobileAvatar: false
  })
})
