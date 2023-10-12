const pool = require("../config/conexao");

const cadastrarTransacoes = async (requisicao, resposta) => {
  const { descricao, valor, data, categoria_id, tipo } = requisicao.body;

  try {
    const categoria_nome = await pool.query(
      `select descricao from categorias where id = $1`,
      [categoria_id]
    );

    if (categoria_nome.rowCount < 1) {
      return resposta
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
      requisicao.usuarioEncontrado.id,
    ];

    const novaTransacao = await pool.query(query, params);
    const informacoesTransacao = {
      id: novaTransacao.rows[0].id,
      tipo: novaTransacao.rows[0].tipo,
      descricao: novaTransacao.rows[0].descricao,
      valor: novaTransacao.rows[0].valor,
      data: novaTransacao.rows[0].data,
      usuario_id: requisicao.usuarioEncontrado.id,
      categoria_id: novaTransacao.rows[0].categoria_id,
      categoria_nome: categoria_nome.rows[0].descricao,
    };

    return resposta.status(201).json(informacoesTransacao);
  } catch (error) {
    console.log(error.message);
    return resposta.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharTransacao = async (requisicao, resposta) => {
  const { id } = requisicao.params;
  const idUsuario = requisicao.usuarioEncontrado.id;

  try {
    const transacaoEncontrada = await pool.query(
      `select * from transacoes where id = $1 and usuario_id = $2   
    `,
      [id, idUsuario]
    );
    if (transacaoEncontrada.rowCount < 1) {
      return resposta
        .status(404)
        .json({ mensagem: "Nenhuma transação encontrada para o id informado" });
    }

    const informacoesTransacao = {
      id: transacaoEncontrada.rows[0].id,
      tipo: transacaoEncontrada.rows[0].tipo,
      descricao: transacaoEncontrada.rows[0].descricao,
      valor: transacaoEncontrada.rows[0].valor,
      data: transacaoEncontrada.rows[0].data,
      usuario_id: idUsuario,
      categoria_id: transacaoEncontrada.rows[0].categoria_id,
      categoria_nome: transacaoEncontrada.rows[0].descricao,
    };

    return resposta.status(200).json(informacoesTransacao);
  } catch (error) {
    console.log(error.message);
    return resposta.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};


const listarTransacao = async (requisicao, resposta) => {
  const filtros = requisicao.query.filtros;
  const usuarioId = requisicao.usuarioEncontrado.id;

  try {
    if (filtros) {
      const query = `select * from transacoes
      where descricao = ANY($1) AND usuario_id = $2`;

      const encontrar = await pool.query(query, [filtros, usuarioId]);

      const transacao = [];
      for (let i = 0; i < encontrar.rowCount; i++) {

        const categoria_id = encontrar.rows[i].categoria_id
        const categoria_nome = await pool.query(
          `select descricao from categorias where id = $1`,
          [categoria_id]
        )

        let novaTransacao = {
          id: encontrar.rows[i].id,
          tipo: encontrar.rows[i].tipo,
          descricao: encontrar.rows[i].descricao,
          valor: encontrar.rows[i].valor,
          data: encontrar.rows[i].data,
          usuario_id: encontrar.rows[i].usuario_id,
          categoria_id: encontrar.rows[i].categoria_id,
          categoria_nome: categoria_nome.rows[0].descricao,
        };
        transacao.push(novaTransacao);
      }

      return resposta.status(200).json(transacao);
    }

    const encontrar = await pool.query(
      `select * from transacoes where usuario_id = $1`,
      [requisicao.usuarioEncontrado.id]
    )

    const transacao = []
    for (let i = 0; i < encontrar.rowCount; i++) {

      const categoria_id = encontrar.rows[i].categoria_id
      const categoria_nome = await pool.query(
        `select descricao from categorias where id = $1`,
        [categoria_id]
      )

      let novaTransacao = {
        id: encontrar.rows[i].id,
        tipo: encontrar.rows[i].tipo,
        descricao: encontrar.rows[i].descricao,
        valor: encontrar.rows[i].valor,
        data: encontrar.rows[i].data,
        usuario_id: encontrar.rows[i].usuario_id,
        categoria_id: encontrar.rows[i].categoria_id,
        categoria_nome: categoria_nome.rows[0].descricao,
      }
      transacao.push(novaTransacao)
    }

    return resposta.status(200).json(transacao)
  } catch (error) {
    console.log(error.message);
    return resposta.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

const atualizarTransacao = async (requisicao, resposta) => {
  const { id } = requisicao.params
  const { descricao, valor, data, categoria_id, tipo } = requisicao.body;
  const idUsuario = requisicao.usuarioEncontrado.id

  try {
    const transacaoEncontrada = await pool.query(
      `select * from transacoes where id = $1 and usuario_id = $2   
      `,
      [id, idUsuario]
    );
    if (transacaoEncontrada.rowCount < 1) {
      return resposta
        .status(404)
        .json({ mensagem: "Nenhuma transação encontrada para o id informado" });
    }

    const categoria_nome = await pool.query(
      `select descricao from categorias where id = $1`,
      [categoria_id]
    );

    if (categoria_nome.rowCount < 1) {
      return resposta
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
      requisicao.usuarioEncontrado.id,
      transacaoEncontrada.rows[0].id
    ]

    const informacoesAtualizadas = await pool.query(query, params)

    const transacao = {
      id: informacoesAtualizadas.rows[0].id,
      tipo: informacoesAtualizadas.rows[0].tipo,
      descricao: informacoesAtualizadas.rows[0].descricao,
      valor: informacoesAtualizadas.rows[0].valor,
      data: informacoesAtualizadas.rows[0].data,
      usuario_id: requisicao.usuarioEncontrado.id,
      categoria_id: informacoesAtualizadas.rows[0].categoria_id,
      categoria_nome: categoria_nome.rows[0].descricao,

    }

    return resposta.status(200).json(transacao)
  } catch (error) {
    console.log(error.message);
    return resposta.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

const deletarTransacao = async (requisicao, resposta) => {
  const { id } = requisicao.params
  const idUsuario = requisicao.usuarioEncontrado.id

  try {
    const transacaoEncontrada = await pool.query(
      `select * from transacoes where id = $1 and usuario_id = $2  
      `,
      [id, idUsuario]
    );
    if (transacaoEncontrada.rowCount < 1) {
      return resposta
        .status(404)
        .json({ mensagem: "Transação não encontrada." });
    }

    const query = await pool.query(
      `delete from transacoes where id = $1 and usuario_id = $2`,
      [id, idUsuario]
    )

    return resposta.status(200).json()
  } catch (error) {
    console.log(error.message);
    return resposta.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

const extrato = async (requisicao, resposta) => {

  try {
    const encontrar = await pool.query(
      `select * from transacoes where usuario_id = $1`,
      [requisicao.usuarioEncontrado.id]
    )

    const entradas = encontrar.rows.filter((elemento) => {
      return elemento.tipo === "entrada"
    })

    let totalEntradas = 0
    for (let i = 0; i < entradas.length; i++) {
      totalEntradas += entradas[i].valor
    }

    const saidas = encontrar.rows.filter((elemento) => {
      return elemento.tipo === "saida"
    })

    let totalSaidas = 0
    for (let i = 0; i < saidas.length; i++) {
      totalSaidas += saidas[i].valor
    }

    const resumoExtrato = {
      entrada: totalEntradas,
      saida: totalSaidas
    }

    return resposta.status(200).json(resumoExtrato)
  } catch (error) {
    console.log(error.message);
    return resposta.status(500).json({ mensagem: "Erro interno do servidor" })
  }
}

module.exports = {
  cadastrarTransacoes,
  detalharTransacao,
  listarTransacao,
  atualizarTransacao,
  deletarTransacao,
  extrato
};
