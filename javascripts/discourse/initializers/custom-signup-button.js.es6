export default {
    name: 'remove-signup-button',

    initialize() {
        api.decorateWidget('header-buttons:after', helper => {
            const currentUser = helper.attrs.currentUser;
            if (!currentUser) {
                // Aguarda o DOM estar pronto
                setTimeout(() => {
                    const signupBtn = document.querySelector('.sign-up-button');
                    if (signupBtn) signupBtn.remove();
                }, 500);
            }
        });
    }
};
