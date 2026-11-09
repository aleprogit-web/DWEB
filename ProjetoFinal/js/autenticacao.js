
// Chaves utilizadas no localStorage.
const CHAVE_USUARIOS = 'usuarios';
const CHAVE_SESSAO = 'usuarioLogado';


// Recupera os usuários cadastrados.
function obterUsuarios() {
    return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];
}


// Cadastra um novo usuário.
function cadastrarUsuario(nome, cpf, email, senha) {
    const usuarios = obterUsuarios();

    // Verifica se já existe uma conta com esse e-mail.
    const emailExistente = usuarios.some(
        usuario => usuario.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExistente) {
        return {
            sucesso: false,
            mensagem: 'Este e-mail já está cadastrado.'
        };
    }

    // Verifica se já existe uma conta com esse CPF.
    const cpfExistente = usuarios.some(
        usuario => usuario.cpf === cpf
    );

    if (cpfExistente) {
        return {
            sucesso: false,
            mensagem: 'Este CPF já está cadastrado.'
        };
    }

    const novoUsuario = {
        id: crypto.randomUUID(),
        nome,
        cpf,
        email: email.toLowerCase(),
        senha
    };

    usuarios.push(novoUsuario);

    localStorage.setItem(
        CHAVE_USUARIOS,
        JSON.stringify(usuarios)
    );

    return {
        sucesso: true,
        mensagem: 'Usuário cadastrado com sucesso!'
    };
}


// Realiza o login do usuário.
function fazerLogin(email, senha) {
    const usuarios = obterUsuarios();

    const usuario = usuarios.find(
        usuario =>
            usuario.email === email.toLowerCase() &&
            usuario.senha === senha
    );

    if (!usuario) {
        return {
            sucesso: false,
            mensagem: 'E-mail ou senha incorretos.'
        };
    }

    // Guarda os dados do usuário conectado.
    localStorage.setItem(
        CHAVE_SESSAO,
        JSON.stringify({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        })
    );

    return {
        sucesso: true,
        mensagem: 'Login realizado com sucesso!'
    };
}


// Recupera os dados do usuário conectado.
function obterUsuarioLogado() {
    return JSON.parse(localStorage.getItem(CHAVE_SESSAO));
}


// Encerra a sessão atual.
function sairDaConta() {
    localStorage.removeItem(CHAVE_SESSAO);
}
