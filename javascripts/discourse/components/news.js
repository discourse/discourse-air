import Component from '@ember/component';
import { ajax } from 'discourse/lib/ajax';

export default Component.extend({
    didInsertElement() {
        this._super(...arguments);
        let lang = I18n.currentLocale().toLowerCase();
        const qnapLangMapping = (lang) => {
            let tmpLang ='';
            let langMapping = {
                "da": "da-dk",
                "de": "de-de",
                "en": "en",
                "es": "es-es",
                "fr": "fr-fr",
                "hu": "hu-hu",
                "it": "it-it",
                "ja": "ja-jp",
                "ko": "ko-kr",
                "nl": "nl-nl",
                "pl_PL": "pl-pl",
                "pt": "pt-pt",
                "pt-br": "pt-br",
                "sv": "sv-se",
                "th": "th-th",
                "tr": "tr-tr",
                "vi": "vi-vn",
                "zh-cn": "zh-cn",
                "zh-tw": "zh-tw"
            };

            if (langMapping[lang] === undefined) {
                tmpLang = 'en';
            } else{
                tmpLang = langMapping[lang];
            }

            return tmpLang;
        }
        if (lang.indexOf('_') !== -1) {
            lang = lang.replace('_', '-');
        }

        // console.log('lang:', lang);
        lang = qnapLangMapping(lang);
        let apiUrl = 'https://www.qnap.com/api/v1/articles/news?locale=' + lang;
        // console.log('apiUrl:', apiUrl);

        ajax(apiUrl, {
            method: 'GET'
        }).then((data) => {
            let news = data.data;
            news.sort((a, b) => new Date(b.date) - new Date(a.date));
            news.splice(3);
            this.set('news', news);
        }).catch((error) => {
            console.error('Error fetching:', error);
        });
    }
});
