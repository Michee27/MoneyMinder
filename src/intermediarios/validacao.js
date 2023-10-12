
const validarUsuario = (requisicao, resposta, next) => {

    const { email, senha } = requisicao.body

    if (!email) {
        return resposta
            .status(401)
            .json({ mensagem: 'Informe o E-mail por favor' })
    }

    if (!senha) {
        return resposta
            .status(401)
            .json({ mensagem: 'Informe a senha por favor' })
    }
    next()
}

const validarNome = (requisicao, resposta, next) => {
    const { nome } = requisicao.body

    if (!nome) {
        return resposta.status(401).json({
            mensagem: 'Informe o nome por favor'
        })
    }
    next()
}

const validarTransacao = (requisicao, resposta, next) => {
    const { descricao, valor, data, categoria_id, tipo } = requisicao.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return resposta
            .status(400)
            .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
    }

    if (tipo !== "saida" && tipo !== "entrada") {
        return resposta
            .status(400)
            .json({ mensagem: "Tipo de transação inválido " });
    }
    next()
}


module.exports = {
    validarUsuario,
    validarNome,
    validarTransacao,
}