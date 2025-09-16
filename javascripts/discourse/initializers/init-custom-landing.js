// javascripts/discourse/initializers/init-custom-landing.js
import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
    // Run on route changes
    api.onPageChange(() => {
        try {
            const root = document.getElementById("custom-landing-root");
            if (!root) return;

            const path = window.location.pathname || "/";
            const isRoot = path === "/" || path === "" || path === "/index";

            if (isRoot) {
                root.classList.remove("hidden");
                root.setAttribute("aria-hidden", "false");
                document.documentElement.classList.add("custom-landing-active");

                // focus for keyboard users
                const landing = root.querySelector(".custom-landing");
                if (landing) landing.focus();
            } else {
                root.classList.add("hidden");
                root.setAttribute("aria-hidden", "true");
                document.documentElement.classList.remove("custom-landing-active");
            }
        } catch (e) {
            // keep fail-safe — don't break Discourse
            console.error("custom landing error", e);
        }
    });

    // Escape key hides landing (useful for keyboard users)
    document.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape") {
            const root = document.getElementById("custom-landing-root");
            if (!root) return;
            root.classList.add("hidden");
            root.setAttribute("aria-hidden", "true");
            document.documentElement.classList.remove("custom-landing-active");
        }
    });

    // Make the "#forum" anchor hide landing so the anchor link works
    document.addEventListener("click", (ev) => {
        const el = ev.target;
        if (!el) return;
        if (el.matches && el.matches("#landing-go-forum")) {
            const root = document.getElementById("custom-landing-root");
            if (root) {
                root.classList.add("hidden");
                root.setAttribute("aria-hidden", "true");
                document.documentElement.classList.remove("custom-landing-active");
            }
        }
    });
});
