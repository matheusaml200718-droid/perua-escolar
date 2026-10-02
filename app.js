const loginForm = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();


    // LOGIN DA ADMINISTRADORA
    if (usuario === "admin" && senha === "admin") {

        localStorage.setItem("tipoUsuario", "admin");

        window.location.href = "admin.html";

        return;
    }


    // BUSCAR ALUNOS CADASTRADOS
    const resposta = await fetch(
    SUPABASE_URL +
    "/rest/v1/alunos?usuario=eq." +
    encodeURIComponent(usuario) +
    "&senha=eq." +
    encodeURIComponent(senha) +
    "&select=*",
    {
        method: "GET",

        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization":
                "Bearer " + SUPABASE_KEY
        }
    }
);

if (!resposta.ok) {

    mensagem.textContent =
        "Erro ao conectar ao banco.";

    return;
}

const alunos = await resposta.json();

const alunoEncontrado = alunos[0];

    // SE ENCONTROU O RESPONSÁVEL
    if (alunoEncontrado) {

        localStorage.setItem(
            "usuarioLogado",
            alunoEncontrado.usuario
        );

        localStorage.setItem(
            "tipoUsuario",
            "responsavel"
        );

        window.location.href = "responsavel.html";

        return;
    }


    // LOGIN INCORRETO
    mensagem.textContent =
        "Usuário ou senha incorretos.";

});