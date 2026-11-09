
const formulario = document.getElementById('formulario');

// Todos os campos existentes no HTML.
const campos = [
    'nome',
    'cpf',
    'nascimento',
    'celular',
    'email',
    'endereco',
    'numero',
    'cidade',
    'estado',
    'profissao',
    'especialidade',
    'conselho',
    'registro',
    'uf-conselho',
    'formacao',
    'instituicao',
    'observacoes-profissionais',
    'tipo-vinculo',
    'data-admissao',
    'horario',
    'situacao'
];

// Recupera o ID da URL, caso seja uma edição.
const parametros = new URLSearchParams(window.location.search);

let idEdicao = Number(parametros.get('id')) || null;

// Recupera os profissionais cadastrados.
function obterProfissionais() {
    return JSON.parse(localStorage.getItem('profissionais')) || [];
}


// Se for edição, preenche os campos com os dados existentes.
if (idEdicao !== null) {

    const existente = obterProfissionais().find(
        p => p.id === idEdicao
    );

    if (existente) {

        campos.forEach(c => {

            const campo = document.getElementById(c);

            if (campo) {
                campo.value = existente[c] ?? '';
            }

        });

    } else {

        alert('Profissional não encontrado.');
        idEdicao = null;

    }
}


// Salva um profissional novo ou atualiza um existente.
function salvarProfissional() {

    const dados = {};

    // Obtém os valores de todos os campos.
    campos.forEach(c => {

        const campo = document.getElementById(c);

        if (campo) {
            dados[c] = campo.value.trim();
        }

    });


    // Valida o preenchimento do nome.
    if (dados.nome === '') {

        alert('Digite o nome do profissional.');
        document.getElementById('nome').focus();

        return null;
    }


    // Valida o preenchimento do CPF.
    if (dados.cpf === '') {

        alert('Digite o CPF do profissional.');
        document.getElementById('cpf').focus();

        return null;
    }


    // Valida o preenchimento do celular.
    if (dados.celular === '') {

        alert('Digite o celular do profissional.');
        document.getElementById('celular').focus();

        return null;
    }


    // Valida o preenchimento do e-mail.
    if (dados.email === '') {

        alert('Digite o e-mail do profissional.');
        document.getElementById('email').focus();

        return null;
    }


    // Valida a profissão.
    if (dados.profissao === '') {

        alert('Selecione a profissão.');
        document.getElementById('profissao').focus();

        return null;
    }


    // Valida o conselho profissional.
    if (dados.conselho === '') {

        alert('Selecione o conselho profissional.');
        document.getElementById('conselho').focus();

        return null;
    }


    // Valida o número de registro.
    if (dados.registro === '') {

        alert('Digite o número de registro profissional.');
        document.getElementById('registro').focus();

        return null;
    }


    // Valida a UF do conselho.
    if (dados['uf-conselho'] === '') {

        alert('Digite a UF do registro profissional.');
        document.getElementById('uf-conselho').focus();

        return null;
    }


    const profissionais = obterProfissionais();


    // Verifica se o CPF já está cadastrado.
    // Na edição, ignora o próprio profissional.
    const cpfExistente = profissionais.find(
        p =>
            p.cpf === dados.cpf &&
            p.id !== idEdicao
    );

    if (cpfExistente) {

        alert('Já existe um profissional cadastrado com este CPF.');
        document.getElementById('cpf').focus();

        return null;
    }


    if (idEdicao !== null) {

        // UPDATE - Atualiza um profissional existente.
        const indice = profissionais.findIndex(
            p => p.id === idEdicao
        );

        if (indice === -1) {

            alert('Profissional não encontrado.');

            return null;
        }


        // Mantém o ID e atualiza todos os dados.
        profissionais[indice] = {
            ...profissionais[indice],
            ...dados
        };


    } else {

        // CREATE - Cadastra um novo profissional.
        idEdicao = Date.now();

        profissionais.push({
            id: idEdicao,
            ...dados
        });

    }


    // Salva os dados no localStorage.
    localStorage.setItem(
        'profissionais',
        JSON.stringify(profissionais)
    );

    return idEdicao;

}


// Evento de envio do formulário.
formulario.addEventListener('submit', function(event) {

    event.preventDefault();

    // Guarda se o formulário estava em modo de edição.
    const estavaEditando = parametros.has('id');

    const id = salvarProfissional();

    if (id !== null) {

        alert(
            'Profissional ' +
            (estavaEditando ? 'atualizado' : 'cadastrado') +
            ' com sucesso!'
        );

        // Retorna para a listagem de profissionais.
        window.location.href = 'profissional.html';

    }

});