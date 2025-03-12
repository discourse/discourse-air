import { withPluginApi } from "discourse/lib/plugin-api";
import { defaultHomepage } from "discourse/lib/utilities";

export default {
    name: "custom-settings",
    initialize() {
        let sidebarMenuButtonObserverInitialized = false;
        withPluginApi("0.8.18", (api) => {
            const updateMultilingualCategoryInSidebar = () => {
                // update multilingual category name in sidebar
                // console.log($('[data-section-name="categories"] li.sidebar-section-link-wrapper').length);

                $('[data-section-name="categories"] li.sidebar-section-link-wrapper').each(function (e) {
                    const match = $(this).find('a.sidebar-section-link').attr('href').match(/\/c\/([^\/]+)/);
                    const category = match ? match[1] : null;
                    let translatedCategoryName = I18n.t(themePrefix("category." + category + ".name"));
                    // console.log(translatedCategoryName);
                    if (category &&
                        translatedCategoryName.indexOf('.theme_translations.') === -1 &&
                        $(this).find('a.sidebar-section-link .sidebar-section-link-content-text').length) {
                        // console.log(translatedCategoryName);
                        $(this).find('a.sidebar-section-link .sidebar-section-link-content-text')[0].innerHTML = translatedCategoryName;
                    }
                });
            }

            // Function to monitor changes in aria-expanded attribute
            const observeSidebarMenuButton = () => {
                let button;

                if ($('#toggle-hamburger-menu').length) {
                    button = document.getElementById('toggle-hamburger-menu');
                } else {
                    button = document.querySelector('button[aria-controls="d-sidebar"]');
                }

                if (!button) {
                    // console.warn("Button not found");
                    return;
                }


                // Define MutationObserver to listen for attribute changes
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === "attributes" && mutation.attributeName === "aria-expanded") {
                            let isExpanded;
                            if ($('#toggle-hamburger-menu').length) {
                                isExpanded = button.getAttribute('aria-expanded') !== null;
                            } else {
                                isExpanded = button.getAttribute('aria-expanded') === "true";
                            }

                            // console.log(`Button aria-expanded changed to: ${isExpanded}`);

                            if ($('#toggle-hamburger-menu').length) {
                                setTimeout(function () {
                                    updateMultilingualCategoryInSidebar();
                                }, 100);
                            } else {
                                // Execute updateMultilingualCategoryInSidebar function when aria-expanded changes
                                updateMultilingualCategoryInSidebar();
                            }
                        }
                    });
                });

                // Start observing attribute changes on the button
                observer.observe(button, { attributes: true });
            };

            const updateLangs = (langs = []) => {
                langs.forEach(({ wrap, selector, order, content }) => {
                    if (order === 'all') {
                        const elements = document.querySelectorAll(wrap);
                        for (let i = 0; i < elements.length; i++) {
                            const element = elements[i].querySelector(selector);
                            if (element) {
                                element.innerHTML = content;
                            }
                        }
                    } else {
                        const wrapperElement = document.querySelector(wrap);
                        if (wrapperElement) {
                            const elements = wrapperElement.querySelector(selector);
                            if (elements[order]) {
                                elements[order].innerHTML = content;
                            } else {
                                elements.innerHTML = content;
                            }
                        }
                    }
                });
            };

            // const showFeatureListLatest = (domain, language) => {
            //     switch (language) {
            //         case "zh_TW":
            //             document.querySelector(".feature-list-latest--zh-tw").style.display = "block";
            //             break;
            //         case "ja":
            //             document.querySelector(".feature-list-latest--ja").style.display = "block";
            //             break;
            //         default:
            //             document.querySelector(".feature-list-latest--all").style.display = "block";
            //             const rows = document.querySelectorAll('.feature-list-latest--all tr');
            //
            //             rows.forEach((row, index) => {
            //                 let tags = [];
            //                 domain === "https://community.qnap.com" ? tags = [51, 52] : tags = [18, 30];
            //                 const badgeCategoryWrapper = row.querySelector('.badge-category__wrapper');
            //                 if (badgeCategoryWrapper) {
            //                     const categoryId = badgeCategoryWrapper.querySelector('span[data-category-id]').getAttribute('data-category-id');
            //                     if (tags.includes(parseInt(categoryId))) {
            //                         row.remove();
            //                     }
            //                 }
            //                 if (index > 10) {
            //                     row.remove();
            //                 }
            //             });
            //             break;
            //     }
            // };

            api.onPageChange(() => {
            const currentRoute = api.container.lookup("router:main").currentRouteName;
            const isHomepage = currentRoute === `discovery.${defaultHomepage()}`;
            const applicationController = api.container.lookup("controller:application");
            const main = document.getElementById("main");
            const domain = window.location.origin;
            main.classList.add("discourse-theme--q");

            if (isHomepage) {
                applicationController.set("showSidebar", false);
                main.classList.add("isHomepage");
                const loadLatestTopics = async () => {
                    const response = await fetch(`${domain}/latest.json`);
                    const data = await response.json();
                    const topics = data.topic_list.topics;
                    const locale = I18n.currentLocale();
                    if (topics) {
                        const featureListWrapper = document.getElementsByClassName("featured-lists__wrapper");
                        const featureListContainer = document.getElementsByClassName("featured-lists__list-container");
                        for (let i = 0; i < featureListWrapper.length; i++) {
                            featureListWrapper[i].classList.add("full-width");
                        }
                        for (let i = 0; i < featureListContainer.length; i++) {
                            featureListContainer[i].classList.add("contents");
                        }
                    }
                    updateLangs([
                        {
                            wrap: ".featured-lists__list-header",
                            selector: "h2",
                            order: 'all',
                            content: I18n.t(themePrefix("features_list.latest.status"))
                        },
                        {
                            wrap: ".featured-lists__list-header",
                            selector: "a",
                            order: 'all',
                            content: I18n.t(themePrefix("features_list.latest.all"))
                        },
                        {
                            wrap: ".custom-search-banner-wrap",
                            selector: "h1",
                            order: 0,
                            content: I18n.t(themePrefix("search_banner.headline"))
                        },
                        {
                            wrap: ".custom-search-banner-wrap",
                            selector: "p",
                            order: 0,
                            content: I18n.t(themePrefix("search_banner.subhead"))
                        },
                        {
                            wrap: ".footer-links",
                            selector: "a",
                            order: 0,
                            content: I18n.t(themePrefix("footer.privacy_policy"))
                        },
                        {
                            wrap: ".footer-links",
                            selector: "a",
                            order: 1,
                            content: I18n.t(themePrefix("footer.terms_of_service"))
                        },
                        {
                            wrap: ".footer-links",
                            selector: "a",
                            order: 2,
                            content: I18n.t(themePrefix("footer.about"))
                        },
                        {
                            wrap: "[data-easyfooter-section=\"third-party-forums\"]",
                            selector: "span",
                            order: 0,
                            content: I18n.t(themePrefix("footer.third_party_forums"))
                        },
                    ]);

                    const searchBanner = document.querySelector(".custom-search-banner-wrap");
                    searchBanner.classList.add("active");

                    // const featureListLatest = document.querySelectorAll(".feature-list-latest");
                    // featureListLatest.forEach((featureList) => {
                    //     featureList.style.display = "none";
                    // });

                    // showFeatureListLatest(domain, locale);
                }

                loadLatestTopics();
            } else {
                applicationController.set("showSidebar", true);
                main.classList.remove("isHomepage");
                if (document.querySelector(".footer-links")) {
                    updateLangs([
                        {
                            wrap: ".footer-links",
                            selector: "a",
                            order: 0,
                            content: I18n.t(themePrefix("footer.privacy_policy"))
                        },
                        {
                            wrap: ".footer-links",
                            selector: "a",
                            order: 1,
                            content: I18n.t(themePrefix("footer.terms_of_service"))
                        },
                        {
                            wrap: ".footer-links",
                            selector: "a",
                            order: 2,
                            content: I18n.t(themePrefix("footer.about"))
                        },
                        {
                            wrap: "[data-easyfooter-section=\"third-party-forums\"]",
                            selector: "span",
                            order: 0,
                            content: I18n.t(themePrefix("footer.third_party_forums"))
                        },
                    ]);
                }
            }

            updateMultilingualCategoryInSidebar();
            // Only initialize the sidebar menu button observer if it hasn't been done already
            if (!sidebarMenuButtonObserverInitialized) {
                observeSidebarMenuButton();
                sidebarMenuButtonObserverInitialized = true;
            }

            const siteStatus = document.getElementById("siteStatus");
            if (domain !== "https://community.qnap.com") {
                siteStatus.innerText = "Testing";
            }
        });
    });
},
};
