-- Active: 1696269749668@@127.0.0.1@5432@dindin

CREATE DATABASE dindin;

CREATE Table
    usuarios (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    );

CREATE Table
    categorias (
        id SERIAL PRIMARY KEY,
        descricao TEXT NOT NULL
    );

CREATE Table
    transacoes (
        id SERIAL PRIMARY KEY,
        descricao TEXT,
        valor INTEGER,
        data DATE,
        categoria_id INTEGER REFERENCES categorias(id),
        usuario_id INTEGER REFERENCES usuarios(id),
        tipo TEXT
    )


    INSERT INTO
    categorias (descricao)
VALUES
    ('Alimentação'),
    ('Assinaturas e Serviços'),
    ('Casa'),
    ('Mercado'),
    ('Cuidados Pessoais'),
    ('Educação'),
    ('Família'),
    ('Lazer'),
    ('Pets'),
    ('Presentes'),
    ('Roupas'),
    ('Saúde'),
    ('Transporte'),
    ('Salário'),
    ('Vendas'),
    ('Outras receitas'),
    ('Outras despesas');



