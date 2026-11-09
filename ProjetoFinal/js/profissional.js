const lista = document.getElementById('lista-profissionais');
const pesquisa = document.getElementById('pesquisa');

// Elementos da caixa de confirmação.
const modalExclusao = document.getElementById('modal-exclusao');
const nomeExclusao = document.getElementById('nome-exclusao');
const cancelarExclusao = document.getElementById('cancelar-exclusao');
const confirmarExclusao = document.getElementById('confirmar-exclusao');

let profissionalParaExcluir = null;


// Obtém os profissionais salvos no localStorage.
function obterProfissionais() {

    return JSON.parse(
        localStorage.getItem('profissionais')
    ) || [];

}


// Cria um botão e define sua ação.
function criarBotao(texto, aoClicar) {

    const botao = document.createElement('button');

    botao.type = 'button';
    botao.textContent = texto;
    botao.addEventListener('click', aoClicar);

    return botao;

}


// Renderiza a lista de profissionais.
function renderizar() {

    // Remove os profissionais exibidos anteriormente,
    // mas mantém o cabeçalho da lista.
    lista.querySelectorAll('.profissional, .lista-vazia')
        .forEach(el => el.remove());


    // Obtém o texto digitado na pesquisa.
    const termo = pesquisa.value.toLowerCase().trim();


    // Pesquisa os profissionais utilizando todos os campos do cadastro.
    const filtrados = obterProfissionais()

        .filter(p => {

            return [

                p.nome,
                p.cpf,
                p.nascimento,
                p.celular,
                p.email,
                p.endereco,
                p.numero,
                p.cidade,
                p.estado,
                p.profissao,
                p.especialidade,
                p.conselho,
                p.registro,
                p['uf-conselho'],
                p.formacao,
                p.instituicao,
                p['observacoes-profissionais'],
                p['tipo-vinculo'],
                p['data-admissao'],
                p.horario,
                p.situacao

            ].some(valor =>

                String(valor || '')
                    .toLowerCase()
                    .includes(termo)

            );

        })


        // Organiza os resultados em ordem alfabética.
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
        vazio.textContent = 'Nenhum profissional encontrado.';

        lista.appendChild(vazio);

        return;

    }


    // Percorre os profissionais encontrados.
   filtrados.forEach(p => {

        const item = document.createElement('div');

        item.className = 'profissional';


        // NOME
        const nome = document.createElement('span');

        nome.className = 'nome-profissional';

        nome.textContent =
            p.nome || 'Profissional sem nome';


        // PROFISSÃO
        const profissao = document.createElement('span');

        profissao.className = 'profissao-profissional';

        profissao.textContent =
            p.profissao || 'Profissão não informada';


        // AÇÕES
        const acoes = document.createElement('div');

        acoes.className = 'acoes-profissional';


        // Botão Editar
        const botaoEditar = criarBotao('Editar', () => {

            window.location.href =
                '../pages/cadastro-profissional.html?id=' + p.id;

        });


        // Botão Excluir
        const botaoExcluir = criarBotao('Excluir', () => {

            excluirProfissional(p.id);

        });


        acoes.append(
            botaoEditar,
            botaoExcluir
        );


        // Junta as três colunas
        item.append(
            nome,
            profissao,
            acoes
        );


        lista.appendChild(item);

    });

}


// Abre a caixa de confirmação de exclusão.
function excluirProfissional(id) {

    const profissional = obterProfissionais().find(
        p => Number(p.id) === Number(id)
    );


    if (!profissional) {

        return;

    }


    // Guarda o ID do profissional selecionado.
    profissionalParaExcluir = id;


    // Exibe o nome no modal.
    nomeExclusao.textContent =
        profissional.nome || 'este profissional';


    // Abre a caixa de confirmação.
    modalExclusao.hidden = false;

    cancelarExclusao.focus();

}


// Fecha a caixa sem excluir o profissional.
function fecharModal() {

    modalExclusao.hidden = true;

    profissionalParaExcluir = null;

}


// Confirma a exclusão do profissional.
confirmarExclusao.addEventListener('click', function() {

    if (profissionalParaExcluir === null) {

        return;

    }


    // Recupera os profissionais que não serão excluídos.
    const restantes = obterProfissionais().filter(

        p => Number(p.id) !== Number(profissionalParaExcluir)

    );


    // Atualiza o localStorage.
    localStorage.setItem(
        'profissionais',
        JSON.stringify(restantes)
    );


    // Fecha o modal e atualiza a lista.
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

    if (
        event.key === 'Escape' &&
        !modalExclusao.hidden
    ) {

        fecharModal();

    }

});


// Atualiza a lista conforme a pesquisa.
pesquisa.addEventListener('input', renderizar);


// Exibe os profissionais ao abrir a página.
renderizar();