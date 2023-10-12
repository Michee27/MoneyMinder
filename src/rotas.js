const express = require("express");

const {
  cadastrarUsuario,
  loginUsuario,
  detalharUsuario,
  atualizarUsuario,
} = require("./controladores/usuario");

const {
  validarUsuario,
  validarNome,
  validarTransacao
} = require("./intermediarios/validacao");

const autenticarUsuario = require("./intermediarios/autenticacao");

const { listarCategorias } = require("./controladores/categoria");

const {
  cadastrarTransacoes,
  detalharTransacao,
  listarTransacao,
  atualizarTransacao,
  deletarTransacao,
  extrato
} = require("./controladores/transacao");

const rotas = express();

//END POINT CADASTRO E LOGIN
rotas.post("/usuario", validarUsuario, validarNome, cadastrarUsuario);
rotas.post("/login", validarUsuario, loginUsuario);

rotas.use(autenticarUsuario);

//END POINT USUARIO
rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", validarUsuario, validarNome, atualizarUsuario);


//END POINT TRANSAÇÕES
rotas.get("/transacao", listarTransacao)
rotas.get("/transacao/extrato", extrato)
rotas.get("/transacao/:id", detalharTransacao)
rotas.post("/transacao", validarTransacao, cadastrarTransacoes);
rotas.put("/transacao/:id", validarTransacao, atualizarTransacao)
rotas.delete("/transacao/:id", deletarTransacao)

//END POINT CATEGORIAS
rotas.get("/categoria", listarCategorias);


module.exports = rotas;
