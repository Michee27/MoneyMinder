const jwt = require("jsonwebtoken")
const pool = require("../config/conexao")
const chaveSecreta = require("../config/chaveSecreta")


const autenticarUsuario = async (requisicao, resposta, next) => {
    const { authorization } = requisicao.headers

    if (!authorization) {
        return resposta.status(401).json({
            mensagem: 'Não autorizado'
        })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, chaveSecreta)

        const { rows, rowCount } = await pool.query(
            'select * from usuarios where id = $1',
            [id]
        )

        if (rowCount < 1) {
            return resposta.status(401).json({
                mensagem: 'Não autorizado'
            })
        }

        requisicao.usuarioEncontrado = rows[0]
        next()
    } catch (error) {
        return resposta.status(401).json({ mensagem: 'Não autorizado' })
    }
}

module.exports = autenticarUsuario 