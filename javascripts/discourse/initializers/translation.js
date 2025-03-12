import {withPluginApi} from "discourse/lib/plugin-api";
import {defaultHomepage} from "discourse/lib/utilities";

export default {
    name: "translation",
    initialize() {
        withPluginApi("0.8.18", (api) => {
            const locale = I18n.currentLocale();
            I18n.translations[locale] = I18n.translations[locale] || {};
            I18n.translations[locale].js = I18n.translations[locale].js || {};
            I18n.translations[locale].js.login = I18n.translations[locale].js.login || {};
            I18n.translations[locale].js.login.oauth2_basic = I18n.translations[locale].js.login.oauth2_basic || {};
            I18n.translations[locale].js.login.oauth2_basic.name = 'QNAP ID';

        });
    },
};
