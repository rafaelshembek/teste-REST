import express from "express";
// import Produtos from "../models/produto.js";

import fs from "fs";
import path from "path";
const router = express.Router();


// buscar o arquivo no projeto
const produtosFilePath = path.join(process.cwd(), 'pages/api/produtos.json');

// função para ler o arquivo
const readProdutos = () => {
    const data = fs.readFileSync(produtosFilePath, 'utf8');
    return JSON.parse(data);
}
router.get('/', (req, res) => {
    const produtos = readProdutos();
    // verificar se os parametro `username` está presente na query string
    const { username, preco } = req.query;
    if (!username && !preco) {
        return res.status(404).json({ message: 'Parametros errado somente username e preço' });
    }
    if (preco == '') {
        return res.status(404).json({ message: 'Preço do produto não foi informado.' });
    }
    if (username) {
        const user = produtos.find(p => p.username && p.username.toLowerCase() === username.toLowerCase());
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        return res.json(user);
    }
    if (preco) {
        const p = produtos.find(p => {
            const myPreco = p ? p.preco === parseFloat(preco) : true;
            return myPreco;
        });
        if (!p) {
            return res.status(404).json({ message: 'Preço do produto não encontrado.' });
        } else if (!p === ' ') {
            return res.status(404).json({ message: 'Preço do produto não encontrado.' });
        }
        console.log(`preços: ${p}`)
        res.json(p);
    }
    console.log(`==========================`)
    console.log(produtos.find(p => p.id === 2));
    console.log(`==========================`)
    res.json(produtos);
})

router.get('/:id', (req, res) => {
    try {
        const produtos = readProdutos();
        const produto = produtos.find(p => p.id === parseInt(req.params.id));
        console.log(produto);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar o produto', error: err });
    }
})

export default router;