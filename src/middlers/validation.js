
const validateUser = (req, res, next) => {

    const { email, senha } = req.body

    if (!email) {
        return res
            .status(401)
            .json({ mensagem: 'Informe o E-mail por favor' })
    }

    if (!senha) {
        return res
            .status(401)
            .json({ mensagem: 'Informe a senha por favor' })
    }
    next()
}

const validateName = (req, res, next) => {
    const { nome } = req.body

    if (!nome) {
        return res.status(401).json({
            mensagem: 'Informe o nome por favor'
        })
    }
    next()
}

const validateTransaction = (req, res, next) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res
            .status(400)
            .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
    }

    if (tipo !== "saida" && tipo !== "entrada") {
        return res
            .status(400)
            .json({ mensagem: "Tipo de transação inválido " });
    }
    next()
}


module.exports = {
    validateUser,
    validateName,
    validateTransaction,
}