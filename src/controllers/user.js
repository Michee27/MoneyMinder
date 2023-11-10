const pool = require("../config/connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const chaveSecreta = require("../config/secretKey")

const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body

    try {

        const clientEmail = 'select * from usuarios where email = $1'
        const existingEmail = await pool.query(clientEmail, [email])

        if (existingEmail.rowCount > 0) {
            return res.status(400).json({
                mensagem: 'Já existe usuário cadastrado com o e-mail informado.'
            })
        }

        const encryptPassword = await bcrypt.hash(senha, 10)

        const query = `
            insert into usuarios (nome, email, senha) 
            values ($1, $2, $3) returning *
        `
        const params = [nome, email, encryptPassword]
        const client = await pool.query(query, params)

        const clientInfo = {
            id: client.rows[0].id,
            nome: client.rows[0].nome,
            email: client.rows[0].email
        }

        return res.status(201).json(clientInfo)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const loginUser = async (req, res) => {
    const { email, senha } = req.body

    try {
        const userFound = await pool.query("select * from usuarios where email = $1", [email])

        if (userFound.rowCount < 1) {
            return res.status(401).json({
                mensagem: "Usuário e/ou senha inválido(s)."
            })
        }

        const validatePassword = await bcrypt.compare(senha, userFound.rows[0].senha)

        if (!validatePassword) {
            return res.status(401).json({
                mensagem: "Usuário e/ou senha inválido(s)."
            })
        }

        const token = jwt.sign({ id: userFound.rows[0].id }, chaveSecreta, {
            expiresIn: '24h',
        })

        const returnUser = {
            user: {
                id: userFound.rows[0].id,
                nome: userFound.rows[0].nome,
                email: userFound.rows[0].email
            },
            token
        }

        return res.status(200).json(returnUser)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const detailUser = async (req, res) => {

    try {
        const refactorUser = {
            id: req.userFound.id,
            nome: req.userFound.nome,
            email: req.userFound.email
        }

        return res.json(refactorUser)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const updateUser = async (req, res) => {
    const { nome, email, senha } = req.body

    try {

        const iduserFound = req.userFound.id

        const clientEmail = 'select * from usuarios where email = $1'
        const existingEmail = await pool.query(clientEmail, [email])

        if (existingEmail.rowCount > 0) {
            return res.status(400).json({
                mensagem: 'Já existe usuário cadastrado com o e-mail informado.'
            })
        }

        const query = `
            update usuarios set nome = $1, email = $2, senha = $3 
            where id = $4
            returning *
        `
        const encryptPassword = await bcrypt.hash(senha, 10)
        const params = [nome, email, encryptPassword, iduserFound]

        const updatedUser = await pool.query(query, params)

        return res.status(201).json()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}


module.exports = {
    registerUser,
    loginUser,
    detailUser,
    updateUser
}