import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", api => {
  api.modifyClass("component:basic-topic-list", {
    hideMobileAvatar: false
  })
})
