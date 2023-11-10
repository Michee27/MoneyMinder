const pool = require("../config/connection");

const registerTransactions = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    const categoria_nome = await pool.query(
      `select descricao from categorias where id = $1`,
      [categoria_id]
    );

    if (categoria_nome.rowCount < 1) {
      return res
        .status(404)
        .json({ mensagem: "Nenhuma categoria encontrada para o id informado" });
    }

    const query = `
      insert into transacoes (tipo, descricao, valor, data, categoria_id, usuario_id)
      values ($1, $2, $3, $4, $5, $6) returning * 
        `;
    const params = [
      tipo,
      descricao,
      valor,
      data,
      categoria_id,
      req.userFound.id,
    ];

    const newTransaction = await pool.query(query, params);
    const informacoesTransacao = {
      id: newTransaction.rows[0].id,
      tipo: newTransaction.rows[0].tipo,
      descricao: newTransaction.rows[0].descricao,
      valor: newTransaction.rows[0].valor,
      data: newTransaction.rows[0].data,
      usuario_id: req.userFound.id,
      categoria_id: newTransaction.rows[0].categoria_id,
      categoria_nome: categoria_nome.rows[0].descricao,
    };

    return res.status(201).json(informacoesTransacao);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detailTransaction = async (req, res) => {
  const { id } = req.params;
  const idUser = req.userFound.id;

  try {
    const transacaoEncontrada = await pool.query(
      `select * from transacoes where id = $1 and usuario_id = $2   
    `,
      [id, idUser]
    );
    if (transacaoEncontrada.rowCount < 1) {
      return res
        .status(404)
        .json({ mensagem: "Nenhuma transação encontrada para o id informado" });
    }

    const informacoesTransacao = {
      id: transacaoEncontrada.rows[0].id,
      tipo: transacaoEncontrada.rows[0].tipo,
      descricao: transacaoEncontrada.rows[0].descricao,
      valor: transacaoEncontrada.rows[0].valor,
      data: transacaoEncontrada.rows[0].data,
      usuario_id: idUser,
      categoria_id: transacaoEncontrada.rows[0].categoria_id,
      categoria_nome: transacaoEncontrada.rows[0].descricao,
    };

    return res.status(200).json(informacoesTransacao);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};


const listTransaction = async (req, res) => {
  const filtros = req.query.filtros;
  const usuarioId = req.userFound.id;

  try {
    if (filtros) {
      const query = `select * from transacoes
      where descricao = ANY($1) AND usuario_id = $2`;

      const find = await pool.query(query, [filtros, usuarioId]);

      const transaction = [];
      for (let i = 0; i < find.rowCount; i++) {

        const categoria_id = find.rows[i].categoria_id
        const categoria_nome = await pool.query(
          `select descricao from categorias where id = $1`,
          [categoria_id]
        )

        let newTransaction = {
          id: find.rows[i].id,
          tipo: find.rows[i].tipo,
          descricao: find.rows[i].descricao,
          valor: find.rows[i].valor,
          data: find.rows[i].data,
          usuario_id: find.rows[i].usuario_id,
          categoria_id: find.rows[i].categoria_id,
          categoria_nome: categoria_nome.rows[0].descricao,
        };
        transaction.push(newTransaction);
      }

      return res.status(200).json(transaction);
    }

    const find = await pool.query(
      `select * from transacoes where usuario_id = $1`,
      [req.userFound.id]
    )

    const transaction = []
    for (let i = 0; i < find.rowCount; i++) {

      const categoria_id = find.rows[i].categoria_id
      const categoria_nome = await pool.query(
        `select descricao from categorias where id = $1`,
        [categoria_id]
      )

      let newTransaction = {
        id: find.rows[i].id,
        tipo: find.rows[i].tipo,
        descricao: find.rows[i].descricao,
        valor: find.rows[i].valor,
        data: find.rows[i].data,
        usuario_id: find.rows[i].usuario_id,
        categoria_id: find.rows[i].categoria_id,
        categoria_nome: categoria_nome.rows[0].descricao,
      }
      transaction.push(newTransaction)
    }

    return res.status(200).json(transaction)
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

const updateTransaction = async (req, res) => {
  const { id } = req.params
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const idUser = req.userFound.id

  try {
    const transactionFound = await pool.query(
      `select * from transacoes where id = $1 and usuario_id = $2   
      `,
      [id, idUser]
    );
    if (transactionFound.rowCount < 1) {
      return res
        .status(404)
        .json({ mensagem: "Nenhuma transação encontrada para o id informado" });
    }

    const categoria_nome = await pool.query(
      `select descricao from categorias where id = $1`,
      [categoria_id]
    );

    if (categoria_nome.rowCount < 1) {
      return res
        .status(404)
        .json({ mensagem: "Nenhuma categoria encontrada para o id informado" });
    }

    const query = `
      update transacoes set 
      tipo = $1, descricao = $2, valor = $3, data = $4, categoria_id = $5, usuario_id = $6
      where id = $7 returning * 
        `;
    const params = [
      tipo,
      descricao,
      valor,
      data,
      categoria_id,
      req.userFound.id,
      transactionFound.rows[0].id
    ]

    const updateInformations = await pool.query(query, params)

    const transaction = {
      id: updateInformations.rows[0].id,
      tipo: updateInformations.rows[0].tipo,
      descricao: updateInformations.rows[0].descricao,
      valor: updateInformations.rows[0].valor,
      data: updateInformations.rows[0].data,
      usuario_id: req.userFound.id,
      categoria_id: updateInformations.rows[0].categoria_id,
      categoria_nome: categoria_nome.rows[0].descricao,

    }

    return res.status(200).json(transaction)
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

const deleteTransaction = async (req, res) => {
  const { id } = req.params
  const idUser = req.userFound.id

  try {
    const transactionFound = await pool.query(
      `select * from transacoes where id = $1 and usuario_id = $2  
      `,
      [id, idUser]
    );
    if (transactionFound.rowCount < 1) {
      return res
        .status(404)
        .json({ mensagem: "Transação não encontrada." });
    }

    const query = await pool.query(
      `delete from transacoes where id = $1 and usuario_id = $2`,
      [id, idUser]
    )

    return res.status(200).json()
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

const extract = async (req, res) => {

  try {
    const find = await pool.query(
      `select * from transacoes where usuario_id = $1`,
      [req.userFound.id]
    )

    const entry = find.rows.filter((elemento) => {
      return elemento.tipo === "entrada"
    })

    let fullEntry = 0
    for (let i = 0; i < entry.length; i++) {
      fullEntry += entry[i].valor
    }

    const exits = find.rows.filter((elemento) => {
      return elemento.tipo === "saida"
    })

    let totalExit = 0
    for (let i = 0; i < exits.length; i++) {
      totalExit += exits[i].valor
    }

    const summary = {
      entrada: fullEntry,
      saida: totalExit
    }

    return res.status(200).json(summary)
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" })
  }
}

module.exports = {
  registerTransactions,
  detailTransaction,
  listTransaction,
  updateTransaction,
  deleteTransaction,
  extract
};
