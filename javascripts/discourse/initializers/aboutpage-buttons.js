import {withPluginApi} from "discourse/lib/plugin-api";

export default {
    name: 'aboutPageButtonLinkChange',

    initialize() {
        let aboutButtonListenerInitialized = false;
        withPluginApi("0.8.18", (api) => {
            api.onPageChange(() => {
                // const currentRoute = api.container.lookup("router:main").currentRouteName;
                // const aboutPage = currentRoute === 'about' || currentRoute === 'faq';
                if (!aboutButtonListenerInitialized) {
                    this.changeButtonLinkOnAboutPage();
                    aboutButtonListenerInitialized = true;
                }
            });
        });
    },

    changeButtonLinkOnAboutPage() {
        window.addEventListener('click', (event) => {
            const target = event.target;

            if (target.matches('a[href="/tos"]')) {
                event.preventDefault();
                window.location.href = 'https://www.qnap.com/go/legal/qnap-website-terms-of-use';
            }

            if (target.matches('a[href="/privacy"]')) {
                event.preventDefault();
                window.location.href = 'https://www.qnap.com/go/legal/qnap-privacy-policy';
            }
        });

    }
};
