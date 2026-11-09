const lista = document.getElementById('lista-pacientes');
const pesquisa = document.getElementById('pesquisa');

// Elementos da caixa de confirmação.
const modalExclusao = document.getElementById('modal-exclusao');
const nomeExclusao = document.getElementById('nome-exclusao');
const cancelarExclusao = document.getElementById('cancelar-exclusao');
const confirmarExclusao = document.getElementById('confirmar-exclusao');

let pacienteParaExcluir = null;

// Obtém os pacientes salvos no localStorage.
function obterPacientes() {
    return JSON.parse(localStorage.getItem('pacientes')) || [];
}

// Cria um botão e define sua ação.
function criarBotao(texto, aoClicar) {
    const botao = document.createElement('button');

    botao.type = 'button';
    botao.textContent = texto;
    botao.addEventListener('click', aoClicar);

    return botao;
}

// Renderiza a lista de pacientes.
function renderizar() {
    lista.querySelectorAll('.paciente, .lista-vazia')
        .forEach(el => el.remove());

    const termo = pesquisa.value.toLowerCase().trim();

    // Pesquisa os pacientes e organiza os resultados por nome.
    const filtrados = obterPacientes()
        .filter(p =>
            [
                p.nome,
                p.celular,
                p.cpf,
                p.email,
                p.endereco,
                p.cidade,
                p.estado
            ].some(valor =>
                String(valor || '').toLowerCase().includes(termo)
            )
        )
        .sort((a, b) =>
            (a.nome || '').localeCompare(
                b.nome || '',
                'pt-BR',
                { sensitivity: 'base' }
            )
        );

    // Mensagem quando não existem resultados.
    if (filtrados.length === 0) {
        const vazio = document.createElement('div');

        vazio.className = 'lista-vazia';
        vazio.textContent = 'Nenhum paciente encontrado.';

        lista.appendChild(vazio);
        return;
    }

    filtrados.forEach(p => {
        const item = document.createElement('div');
        item.className = 'paciente';

        // Avatar e nome do paciente.
        const info = document.createElement('div');
        info.className = 'info-paciente';

        const avatar = document.createElement('span');
        avatar.className = 'avatar';
        avatar.textContent = (p.nome || '?')
            .charAt(0)
            .toUpperCase();

        const nome = document.createElement('span');
        nome.textContent = p.nome || 'Paciente sem nome';

        info.append(avatar, nome);

        // Botões de ação.
        const acoes = document.createElement('div');
        acoes.className = 'acoes-paciente';

        acoes.append(
            criarBotao('Editar', () => {
                window.location.href =
                    '../pages/cadastro-paciente.html?id=' + p.id;
            }),

            criarBotao('Excluir', () => {
                excluirPaciente(p.id);
            })
        );

        item.append(info, acoes);
        lista.appendChild(item);
    });
}

// Abre a caixa de confirmação de exclusão.
function excluirPaciente(id) {
    const paciente = obterPacientes().find(p => p.id === id);

    if (!paciente) {
        return;
    }

    pacienteParaExcluir = id;

    nomeExclusao.textContent =
        paciente.nome || 'este paciente';

    modalExclusao.hidden = false;
    cancelarExclusao.focus();
}

// Fecha a caixa sem excluir o paciente.
function fecharModal() {
    modalExclusao.hidden = true;
    pacienteParaExcluir = null;
}

// Confirma a exclusão do paciente.
confirmarExclusao.addEventListener('click', function() {
    if (pacienteParaExcluir === null) {
        return;
    }

    const restantes = obterPacientes().filter(
        p => p.id !== pacienteParaExcluir
    );

    localStorage.setItem(
        'pacientes',
        JSON.stringify(restantes)
    );

    fecharModal();
    renderizar();
});

// Botão Cancelar.
cancelarExclusao.addEventListener('click', fecharModal);

// Fecha a caixa ao clicar fora dela.
modalExclusao.addEventListener('click', function(event) {
    if (event.target === modalExclusao) {
        fecharModal();
    }
});

// Fecha a caixa ao pressionar Esc.
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !modalExclusao.hidden) {
        fecharModal();
    }
});

// Atualiza a lista conforme a pesquisa.
pesquisa.addEventListener('input', renderizar);

// Exibe os pacientes ao abrir a página.
renderizar();