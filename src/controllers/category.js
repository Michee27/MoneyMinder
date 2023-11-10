const pool = require("../config/connection");

const listCategories = async (req, res) => {
  try {
    const query = `select * from categorias`;
    const categorias = await pool.query(query);

    return res.json(categorias.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Erro interno do servidor.");
  }
};

module.exports = {
  listCategories,
};
