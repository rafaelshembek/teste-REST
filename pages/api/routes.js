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
    console.log(`==========================`)
    console.log(produtos.find(p => p.id === 2));
    console.log(`==========================`)
    res.json(produtos);
})

router.get('/:id', (req, res) => {
    try {
        const produtos = readProdutos();
        const produto = produtos.find(p => p.id === parseInt(req.params.id));
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar o produto', error: err });
    }
})

export default router;