const URL_API = "http://localhost:8080/usuarios";

// Função de apoio para imprimir o resultado na tela
function mostrarNaTela(dados) {
    const tela = document.getElementById("telaResposta");
    // Transforma o objeto JavaScript de volta em texto formatado para exibir na tela
    tela.innerText = JSON.stringify(dados, null, 4);
}


// ==========================================
// 1. GET - BUSCAR
// ==========================================
async function fazerGET() {
    const resposta = await fetch(URL_API);
    const dados = await resposta.json();
    
    mostrarNaTela(dados);
}


// ==========================================
// 2. POST - INSERIR
// ==========================================
async function fazerPOST() {
    // Monta o objeto com os dados digitados
    const usuarioNovo = {
        nome: document.getElementById("inputNome").value,
        email: document.getElementById("inputEmail").value
    };

    const resposta = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioNovo)
    });

    const dados = await resposta.json();
    mostrarNaTela(dados);
}


// ==========================================
// 3. PUT - ATUALIZAR (Precisa do ID)
// ==========================================
async function fazerPUT() {
    const id = document.getElementById("inputId").value;
    
    const usuarioAtualizado = {
        nome: document.getElementById("inputNome").value,
        email: document.getElementById("inputEmail").value
    };

    // Repare na URL: passamos o ID no final (ex: http://localhost:8080/usuarios/5)
    const resposta = await fetch(URL_API + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioAtualizado)
    });

    const dados = await resposta.json();
    mostrarNaTela(dados);
}


// ==========================================
// 4. DELETE - APAGAR (Precisa do ID)
// ==========================================
async function fazerDELETE() {
    const id = document.getElementById("inputId").value;

    const resposta = await fetch(URL_API + "/" + id, {
        method: "DELETE"
    });

    // Como o seu backend retorna uma String e não um JSON no DELETE ("Usuario Joao deletado!"), 
    // nós usamos .text() ao invés de .json() aqui.
    const textoMensagem = await resposta.text();
    
    // Mostra a string que o Java mandou de volta
    document.getElementById("telaResposta").innerText = textoMensagem; 
}