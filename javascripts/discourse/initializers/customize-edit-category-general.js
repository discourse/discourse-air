import { withPluginApi } from "discourse/lib/plugin-api";
import { cancel, later } from "@ember/runloop";

export default {
  name: "customize-edit-category-general",

  initialize() {
    withPluginApi("0.8.14", api => {
      api.modifyClass("component:edit-category-general", {
        didInsertElement() {
          this._super(...arguments);
          document.body.classList.add("edit-category")
          this._focusCategoryName();
        },

        willDestroyElement() {
          this._super(...arguments);
          document.body.classList.remove("edit-category")
          this._laterFocus && cancel(this._laterFocus);
        },
      })
    })
  }
}