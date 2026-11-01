alert("Bem-vindo(a) ao meu portfólio!");
function apresentacao() {
    alert("Olá! Meu nome é Thiago Basilio e sou estudante de Análise e Desenvolvimento de Sistemas.");
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
const fields = ["nomeContato", "emailContato", "assunto", "mensagemContato"];

function showAlert(message, type = "success") {
    formAlert.className = "alert alert-" + type;
    formAlert.textContent = message;
}

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const nome = document.getElementById("nomeContato").value.trim();
    const email = document.getElementById("emailContato").value.trim();
    const assunto = document.getElementById("assunto").value.trim() || "Contato pelo portfólio";
    const mensagem = document.getElementById("mensagemContato").value.trim();
    const corpo = "Nome: " + nome + "\nE-mail: " + email + "\n\nMensagem:\n" + mensagem;

    showAlert("Seu aplicativo de e-mail será aberto para você concluir o envio.", "success");
    window.location.href =
        "mailto:thiagobasilio887@gmail.com?subject=" + encodeURIComponent(assunto) +
        "&body=" + encodeURIComponent(corpo);
});

document.getElementById("saveButton").addEventListener("click", function () {
    const draft = {};
    fields.forEach(function (id) {
        draft[id] = document.getElementById(id).value;
    });

    try {
        localStorage.setItem("thiagoPortfolioContactDraft", JSON.stringify(draft));
        showAlert("Rascunho salvo neste navegador.", "success");
    } catch (error) {
        showAlert("Não foi possível salvar o rascunho neste navegador.", "warning");
    }
});

document.getElementById("clearButton").addEventListener("click", function () {
    contactForm.reset();
    showAlert("Os campos foram limpos.", "warning");
});

contactForm.addEventListener("reset", function () {
    window.setTimeout(function () {
        formAlert.className = "alert d-none";
        formAlert.textContent = "";
    }, 0);
});

try {
    const savedDraft = localStorage.getItem("thiagoPortfolioContactDraft");

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