import { withPluginApi } from "discourse/lib/plugin-api";

withPluginApi("0.8", (api) => {
    api.modifyClass("component:site-header", {
        pluginId: "discourse-air",

        didInsertElement() {
            this._super(...arguments);
            if (!this.currentUser) {
                const signupBtn = this.element.querySelector('.sign-up-button');
                if (signupBtn) signupBtn.remove();
            }
        }
    });
});
