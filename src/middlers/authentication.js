const jwt = require("jsonwebtoken")
const pool = require("../config/connection")
const chaveSecreta = require("../config/secretKey")


const autenticarUsuario = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({
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
            return res.status(401).json({
                mensagem: 'Não autorizado'
            })
        }

        req.userFound = rows[0]
        next()
    } catch (error) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }
}

module.exports = autenticarUsuario 