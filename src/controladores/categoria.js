const pool = require("../config/conexao");

const listarCategorias = async (requisicao, resposta) => {
  try {
    const query = `select * from categorias`;
    const categorias = await pool.query(query);

    return resposta.json(categorias.rows);
  } catch (error) {
    console.log(error);
    return resposta.status(500).json("Erro interno do servidor.");
  }
};

module.exports = {
  listarCategorias,
};
