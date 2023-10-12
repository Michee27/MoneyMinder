const pool = require("../config/conexao")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const chaveSecreta = require("../config/chaveSecreta")

const cadastrarUsuario = async (requisicao, resposta) => {
    const { nome, email, senha } = requisicao.body

    try {

        const emailDoCliente = 'select * from usuarios where email = $1'
        const emailExistente = await pool.query(emailDoCliente, [email])

        if (emailExistente.rowCount > 0) {
            return resposta.status(400).json({
                mensagem: 'Já existe usuário cadastrado com o e-mail informado.'
            })
        }

        const criptografarSenha = await bcrypt.hash(senha, 10)

        const query = `
            insert into usuarios (nome, email, senha) 
            values ($1, $2, $3) returning *
        `
        const params = [nome, email, criptografarSenha]
        const cliente = await pool.query(query, params)
        const informacaoDoCliente = {
            id: cliente.rows[0].id,
            nome: cliente.rows[0].nome,
            email: cliente.rows[0].email
        }

        return resposta.status(201).json(informacaoDoCliente)
    } catch (error) {
        console.log(error.message)
        return resposta.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const loginUsuario = async (requisicao, resposta) => {
    const { email, senha } = requisicao.body

    try {
        const usuarioEncontrado = await pool.query("select * from usuarios where email = $1", [email])

        if (usuarioEncontrado.rowCount < 1) {
            return resposta.status(401).json({
                mensagem: "Usuário e/ou senha inválido(s)."
            })
        }

        const validarSenha = await bcrypt.compare(senha, usuarioEncontrado.rows[0].senha)

        if (!validarSenha) {
            return resposta.status(401).json({
                mensagem: "Usuário e/ou senha inválido(s)."
            })
        }

        const token = jwt.sign({ id: usuarioEncontrado.rows[0].id }, chaveSecreta, {
            expiresIn: '24h',
        })

        const retornarUsuario = {
            usuario: {
                id: usuarioEncontrado.rows[0].id,
                nome: usuarioEncontrado.rows[0].nome,
                email: usuarioEncontrado.rows[0].email
            },
            token
        }

        return resposta.status(200).json(retornarUsuario)

    } catch (error) {
        console.log(error.message)
        return resposta.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const detalharUsuario = async (requisicao, resposta) => {

    try {
        const refatorarUsuario = {
            id: requisicao.usuarioEncontrado.id,
            nome: requisicao.usuarioEncontrado.nome,
            email: requisicao.usuarioEncontrado.email
        }

        return resposta.json(refatorarUsuario)

    } catch (error) {
        console.log(error.message)
        return resposta.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const atualizarUsuario = async (requisicao, resposta) => {
    const { nome, email, senha } = requisicao.body

    try {

        const idUsuarioEncontrado = requisicao.usuarioEncontrado.id

        const emailDoCliente = 'select * from usuarios where email = $1'
        const emailExistente = await pool.query(emailDoCliente, [email])

        if (emailExistente.rowCount > 0) {
            return resposta.status(400).json({
                mensagem: 'Já existe usuário cadastrado com o e-mail informado.'
            })
        }

        const query = `
            update usuarios set nome = $1, email = $2, senha = $3 
            where id = $4
            returning *
        `
        const criptografarSenha = await bcrypt.hash(senha, 10)
        const params = [nome, email, criptografarSenha, idUsuarioEncontrado]

        const clienteAtualizado = await pool.query(query, params)

        return resposta.status(201).json()
    } catch (error) {
        console.log(error.message)
        return resposta.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}


module.exports = {
    cadastrarUsuario,
    loginUsuario,
    detalharUsuario,
    atualizarUsuario
}