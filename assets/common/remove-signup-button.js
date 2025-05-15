document.addEventListener("DOMContentLoaded", function () {
    console.log("tema air fib ativado")
    // Função para tentar remover o botão
    function removeSignupBtn() {
        const signupBtn = document.querySelector(".sign-up-button");
        if (signupBtn) {
            signupBtn.remove();
            console.log("Botão Cadastrar-se removido");
        } else {
            console.log("Botão Cadastrar-se não encontrado");
        }
    }

    // Remove logo que o DOM estiver pronto
    removeSignupBtn();

    // Também tenta remover depois de 1s para pegar atualizações
    setTimeout(removeSignupBtn, 1000);
});
