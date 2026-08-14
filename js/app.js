// Rota da API REST de Alunos exigida na atividade
const URL_API = "http://localhost:8080/alunos";

// Função de apoio para imprimir o resultado formatado na caixa preta da tela
function mostrarNaTela(dados) {
    const tela = document.getElementById("telaResposta");
    tela.innerText = JSON.stringify(dados, null, 4);
}

// ----------------------------------------
// 1. GET - BUSCAR TODOS OS ALUNOS
// ----------------------------------------
async function fazerGET() {
    try {
        const resposta = await fetch(URL_API);
        const dados = await resposta.json();
        mostrarNaTela(dados);
    } catch (erro) {
        mostrarNaTela({ erro: "Não foi possível conectar à API. O Spring Boot está rodando?" });
    }
}

// ----------------------------------------
// 2. POST - CADASTRAR NOVO ALUNO
// ----------------------------------------
async function fazerPOST() {
    // Monta o objeto com todos os novos atributos exigidos no enunciado
    const alunoNovo = {
        nome: document.getElementById("inputNome").value,
        idade: parseInt(document.getElementById("inputIdade").value) || 0,
        registroAluno: document.getElementById("inputRA").value,
        emailInstitucional: document.getElementById("inputEmail").value,
        turma: document.getElementById("inputTurma").value,
        periodo: document.getElementById("inputPeriodo").value,
        apresentacao: document.getElementById("inputApresentacao").value
    };

    try {
        const resposta = await fetch(URL_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(alunoNovo)
        });

        const dados = await resposta.json();
        mostrarNaTela(dados);
        limparFormulario();
    } catch (erro) {
        mostrarNaTela({ erro: "Erro ao realizar o POST. Verifique o console ou o banco de dados." });
    }
}

// ----------------------------------------
// 3. PUT - ATUALIZAR ALUNO EXISTENTE
// ----------------------------------------
async function fazerPUT() {
    const id = document.getElementById("inputId").value;
    if (!id) {
        alert("Por favor, insira o ID do aluno que deseja atualizar.");
        return;
    }

    const alunoAtualizado = {
        nome: document.getElementById("inputNome").value,
        idade: parseInt(document.getElementById("inputIdade").value) || 0,
        registroAluno: document.getElementById("inputRA").value,
        emailInstitucional: document.getElementById("inputEmail").value,
        turma: document.getElementById("inputTurma").value,
        periodo: document.getElementById("inputPeriodo").value,
        apresentacao: document.getElementById("inputApresentacao").value
    };

    try {
        const resposta = await fetch(`${URL_API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(alunoAtualizado)
        });

        const dados = await resposta.json();
        mostrarNaTela(dados);
        limparFormulario();
    } catch (erro) {
        mostrarNaTela({ erro: "Erro ao realizar o PUT. Esse ID existe no banco?" });
    }
}

// ----------------------------------------
// 4. DELETE - REMOVER ALUNO DO BANCO
// ----------------------------------------
async function fazerDELETE() {
    const id = document.getElementById("inputId").value;
    if (!id) {
        alert("Por favor, insira o ID do aluno que deseja apagar.");
        return;
    }

    try {
        const resposta = await fetch(`${URL_API}/${id}`, {
            method: "DELETE"
        });

        const textoMensagem = await resposta.text();
        document.getElementById("telaResposta").innerText = textoMensagem || `Aluno com ID ${id} removido com sucesso!`;
        limparFormulario();
    } catch (erro) {
        document.getElementById("telaResposta").innerText = "Erro ao realizar o DELETE.";
    }
}

// Função auxiliar para limpar os campos após as ações de envio
function limparFormulario() {
    document.getElementById("inputId").value = "";
    document.getElementById("inputNome").value = "";
    document.getElementById("inputIdade").value = "";
    document.getElementById("inputRA").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputTurma").value = "";
    document.getElementById("inputPeriodo").value = "";
    document.getElementById("inputApresentacao").value = "";
}

// Vinculando os botões da tela às funções correspondentes
document.getElementById("btnGet").addEventListener("click", fazerGET);
document.getElementById("btnPost").addEventListener("click", fazerPOST);
document.getElementById("btnPut").addEventListener("click", fazerPUT);
document.getElementById("btnDelete").addEventListener("click", fazerDELETE);