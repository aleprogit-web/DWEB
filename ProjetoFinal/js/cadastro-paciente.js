const formulario = document.getElementById('formulario');

const campos = [
    'nome',
    'endereco',
    'numero',
    'cidade',
    'estado',
    'celular',
    'cpf',
    'nascimento',
    'email',
    'convenio',
    'plano',
    'carteirinha',
    'validade',
    'observacoes'
];

let idEdicao = Number(
    new URLSearchParams(window.location.search).get('id')
) || null;

function obterPacientes() {
    return JSON.parse(localStorage.getItem('pacientes')) || [];
}

// Se for edição, preenche os campos com os dados existentes.
if (idEdicao) {
    const existente = obterPacientes().find(
        p => p.id === idEdicao
    );

    if (existente) {
        campos.forEach(c => {
            const campo = document.getElementById(c);

            if (campo) {
                campo.value = existente[c] || '';
            }
        });
    } else {
        idEdicao = null;
    }
}

// Salva um paciente novo ou atualiza um existente.
function salvarPaciente() {
    const dados = {};

    campos.forEach(c => {
        const campo = document.getElementById(c);

        if (campo) {
            dados[c] = campo.value.trim();
        }
    });

    if (dados.nome === '') {
        alert('Digite o nome do paciente.');
        document.getElementById('nome').focus();
        return null;
    }

    const pacientes = obterPacientes();

    if (idEdicao) {
        const indice = pacientes.findIndex(
            p => p.id === idEdicao
        );

        if (indice === -1) {
            alert('Paciente não encontrado.');
            return null;
        }

        // Mantém o ID e atualiza os dados do paciente.
        pacientes[indice] = {
            ...pacientes[indice],
            ...dados
        };
    } else {
        idEdicao = Date.now();

        pacientes.push({
            id: idEdicao,
            ...dados
        });
    }

    localStorage.setItem(
        'pacientes',
        JSON.stringify(pacientes)
    );

    return idEdicao;
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const id = salvarPaciente();

    if (id) {
        alert('Paciente cadastrado com sucesso!');
        window.location.href = '../pages/paciente.html';
    }
});