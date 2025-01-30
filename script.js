document.addEventListener("DOMContentLoaded", () => {
    // Função para alternar o estado entre "Pendente" e "Visto"
    const toggleStatus = (button) => {
        const currentState = button.textContent.trim();
        const dataNumber = button.getAttribute("data-number");

        // Seleciona todos os botões com o mesmo data-number
        const buttonsWithSameNumber = document.querySelectorAll(`button[data-number="${dataNumber}"]`);

        buttonsWithSameNumber.forEach((btn) => {
            if (currentState === "Pendente") {
                btn.textContent = "Visto";
                btn.classList.remove("pendente");
                btn.classList.add("visto");
            } else {
                btn.textContent = "Pendente";
                btn.classList.remove("visto");
                btn.classList.add("pendente");
            }
        });

        // Salva o estado no LocalStorage
        saveState(dataNumber, currentState === "Pendente" ? "Visto" : "Pendente");
    };

    // Função para salvar o estado no LocalStorage
    const saveState = (dataNumber, state) => {
        const savedStates = JSON.parse(localStorage.getItem("savedStates")) || {};
        savedStates[dataNumber] = state;
        localStorage.setItem("savedStates", JSON.stringify(savedStates));
    };

    // Função para carregar o estado salvo do LocalStorage
    const loadState = () => {
        const savedStates = JSON.parse(localStorage.getItem("savedStates")) || {};

        Object.keys(savedStates).forEach((dataNumber) => {
            const buttons = document.querySelectorAll(`button[data-number="${dataNumber}"]`);
            buttons.forEach((button) => {
                if (savedStates[dataNumber] === "Visto") {
                    button.textContent = "Visto";
                    button.classList.remove("pendente");
                    button.classList.add("visto");
                } else {
                    button.textContent = "Pendente";
                    button.classList.remove("visto");
                    button.classList.add("pendente");
                }
            });
        });
    };

    // Carrega o estado salvo quando a página é carregada
    loadState();

    // Seleciona todos os botões
    const buttons = document.querySelectorAll("button[data-number]");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            toggleStatus(button); // Alterna o estado do botão clicado e de todos os botões com o mesmo número
        });
    });
});
document.getElementById("reset-button").addEventListener("click", () => {
    localStorage.removeItem("savedStates"); // Remove os dados salvos
    location.reload(); // Recarrega a página para aplicar as mudanças
});