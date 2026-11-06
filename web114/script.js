alert("Bem-vindo(a) ao meu portfólio!");

function apresentacao() {
    alert(
        "Olá! Meu nome é Thiago Basilio e sou estudante de Análise e Desenvolvimento de Sistemas."
    );
}

function alterarTitulo() {
    const nome = prompt("Digite seu nome:");

    if (nome !== null && nome.trim() !== "") {
        document.getElementById("titulo-principal").textContent =
            "Portfólio Profissional - " + nome.trim();
    }
}

function destacarSobre() {
    const sobre = document.getElementById("Sobremim");

    sobre.style.backgroundColor = "#FFF3CD";
    sobre.style.color = "#222222";
    sobre.style.border = "2px solid #FFC107";
    sobre.style.borderRadius = "10px";
    sobre.style.padding = "20px";
}

function modoEscuro() {
    document.body.classList.toggle("dark-mode");
}

const contactForm = document.getElementById("contactForm");
const formAlert = document.getElementById("formAlert");

const fields = [
    "nomeContato",
    "emailContato",
    "assunto",
    "mensagemContato"
];

function showAlert(message, type = "success") {
    formAlert.className = "alert alert-" + type;
    formAlert.textContent = message;
}

function hideAlert() {
    formAlert.textContent = "";
    formAlert.className = "alert d-none";
}

fields.forEach(function (id) {
    const campo = document.getElementById(id);

    campo.addEventListener("input", function () {
        campo.setCustomValidity("");

        const valor = campo.value.trim();

        if (id === "nomeContato" && valor !== "") {
            if (valor.length < 3) {
                campo.setCustomValidity(
                    "O nome deve ter pelo menos 3 caracteres."
                );
            } else if (valor.length > 50) {
                campo.setCustomValidity(
                    "O nome deve ter no máximo 50 caracteres."
                );
            }
        }

        if (id === "emailContato" && valor !== "") {
            if (!campo.validity.valid) {
                campo.setCustomValidity(
                    "Digite um endereço de e-mail válido."
                );
            }
        }

        if (id === "mensagemContato" && valor !== "") {
            if (valor.length < 10) {
                campo.setCustomValidity(
                    "A mensagem deve ter pelo menos 10 caracteres."
                );
            } else if (valor.length > 1000) {
                campo.setCustomValidity(
                    "A mensagem deve ter no máximo 1000 caracteres."
                );
            }
        }

        if (!campo.validity.valid) {
            showAlert(campo.validationMessage, "danger");
        } else {
            hideAlert();
        }
    });
});

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    hideAlert();

    const nome = document.getElementById("nomeContato").value.trim();
    const email = document.getElementById("emailContato").value.trim();
    const assunto =
        document.getElementById("assunto").value.trim() ||
        "Contato pelo portfólio";
    const mensagem =
        document.getElementById("mensagemContato").value.trim();

    if (!contactForm.reportValidity()) {
        return;
    }

    if (nome.length < 3 || nome.length > 50) {
        showAlert(
            "O nome deve ter entre 3 e 50 caracteres.",
            "danger"
        );
        document.getElementById("nomeContato").focus();
        return;
    }

    if (email === "") {
        showAlert("Por favor, informe seu e-mail.", "danger");
        document.getElementById("emailContato").focus();
        return;
    }

    if (mensagem.length < 10 || mensagem.length > 1000) {
        showAlert(
            "A mensagem deve ter entre 10 e 1000 caracteres.",
            "danger"
        );
        document.getElementById("mensagemContato").focus();
        return;
    }

    const corpo =
        "Nome: " + nome +
        "\nE-mail: " + email +
        "\n\nMensagem:\n" + mensagem;

    showAlert(
        "Validação concluída! Seu aplicativo de e-mail será aberto para concluir o envio.",
        "success"
    );

    window.location.href =
        "mailto:thiagobasilio887@gmail.com?subject=" +
        encodeURIComponent(assunto) +
        "&body=" +
        encodeURIComponent(corpo);
});

document.getElementById("saveButton").addEventListener("click", function () {
    const draft = {};

    fields.forEach(function (id) {
        draft[id] = document.getElementById(id).value;
    });

    try {
        localStorage.setItem(
            "thiagoPortfolioContactDraft",
            JSON.stringify(draft)
        );

        showAlert("Rascunho salvo neste navegador.", "success");
    } catch (error) {
        showAlert(
            "Não foi possível salvar o rascunho neste navegador.",
            "warning"
        );
    }
});

document.getElementById("clearButton").addEventListener("click", function () {
    contactForm.reset();

    showAlert("Os campos foram limpos.", "warning");
});

contactForm.addEventListener("reset", function () {
    window.setTimeout(function () {
        hideAlert();

        fields.forEach(function (id) {
            document.getElementById(id).setCustomValidity("");
        });
    }, 0);
});

try {
    const savedDraft = localStorage.getItem(
        "thiagoPortfolioContactDraft"
    );

    if (savedDraft) {
        const draft = JSON.parse(savedDraft);

        fields.forEach(function (id) {
            if (typeof draft[id] === "string") {
                document.getElementById(id).value = draft[id];
            }
        });
    }
} catch (error) {
}