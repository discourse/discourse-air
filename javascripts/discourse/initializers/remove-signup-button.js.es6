import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: 'remove-signup-button',

  initialize() {
    withPluginApi("0.8", (api) => {
      api.decorateWidget('header-buttons:after', helper => {
        const currentUser = helper.attrs.currentUser;
        if (!currentUser) {
          setTimeout(() => {
            const signupBtn = document.querySelector('.sign-up-button');
            if (signupBtn) signupBtn.remove();
          }, 500);
        }
      });
    });
  }
};
