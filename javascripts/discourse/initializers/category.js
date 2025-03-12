import {withPluginApi} from "discourse/lib/plugin-api";
import {defaultHomepage} from "discourse/lib/utilities";

export default {
    name: "category-pages",
    initialize() {
        withPluginApi("0.8.18", (api) => {
            api.onPageChange(() => {
                // it's in category page
                if (document.body.classList.contains('category')) {
                    const match = window.location.pathname.match(/\/c\/([^\/]+)/);
                    const category = match ? match[1] : null;

                    // update multilingual category desc in category page
                    if (category) {
                        let translatedCategoryName = I18n.t(themePrefix("category." + category + ".name"));
                        let translatedCategoryDesc = I18n.t(themePrefix("category." + category + ".description"));

                        if (translatedCategoryDesc.indexOf('.theme_translations.') === -1 &&
                            document.querySelector('.category-heading p > span')) {
                            document.querySelector('.category-heading p > span').innerText = translatedCategoryDesc;
                        }

                        if (translatedCategoryName.indexOf('.theme_translations.') === -1 &&
                            document.querySelector('span.badge-category__name')) {
                            document.querySelector('span.badge-category__name').innerText = translatedCategoryName;
                        }
                    }
                } else if (document.body.classList.contains('categories-list')) {
                    $('.category .category-title-link').each(function (e) {
                        const match = $(this).attr('href').match(/\/c\/([^\/]+)/);
                        const category = match ? match[1] : null;
                        let translatedCategoryName = I18n.t(themePrefix("category." + category + ".name"));
                        let translatedCategoryDesc = I18n.t(themePrefix("category." + category + ".description"));
                        if (category) {
                            if (translatedCategoryName.indexOf('.theme_translations.') === -1 &&
                                $(this).find('span.category-name span').length) {
                                $(this).find('span.category-name span')[0].innerHTML = translatedCategoryName;
                            }

                            if (translatedCategoryDesc.indexOf('.theme_translations.') === -1 &&
                                $(this).parent().parent().find('div.category-description span').length) {
                                $(this).parent().parent().find('div.category-description span')[0].innerHTML = translatedCategoryDesc;
                            }
                        }
                    });
                }
            });
        });
    },
};
