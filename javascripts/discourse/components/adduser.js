//button a#adduser_sign_in click $('.login-button').trigger('click');
//button a#adduser_register click $('.sign-up-button').trigger('click');
import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        const signInButton = document.querySelector('.login-button');
        const registerButton = document.querySelector('.sign-up-button');
        const signInLink = document.querySelector('a#adduser_sign_in');
        const registerLink = document.querySelector('a#adduser_register');
        if (signInButton && signInLink) {
            signInLink.addEventListener('click', function() {
                signInButton.click();
            });
        }
        if (registerButton && registerLink) {
            registerLink.addEventListener('click', function() {
                registerButton.click();
            });
        }
    }
});