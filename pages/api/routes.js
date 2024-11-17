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
// ROTA PRINCIPAL
router.get('/', (req, res) => {
    try {
        const produtos = readProdutos();
        const { username, preco } = req.query;

        if (!username && !preco) {
            return res.status(404).json({ message: 'username ou preco sem informação.' })
        }

        if (username) {
            if (username.trim() === "") {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            const user = produtos.find(p => p.username && p.username.toLowerCase() === username.toLocaleLowerCase());
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            return res.json(user);
        }
        if (preco) {
            const precoFloat = parseFloat(preco);
            if (isNaN(precoFloat)) {
                return res.status(400).json({ message: 'Preço inválido. Deve ser um número.' });
            }
            const produtoComPreco = produtos.find(p => p.preco === precoFloat);
            if (produtoComPreco.length === 0) {
                return res.status(400).json({ message: 'Nenhum produto encontrado com esse preço' });
            }
            return res.json(produtoComPreco);
        }
        // CASO NENHUM FILTRO SEJA APLICADO, RETORNA TODOS OS PRODUTOS
        return res.json(produtos);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao processar a requisição. dados informado não encontrado' });
    }

    // if (!preco) {
    //     const p = produtos.find(p => {
    //         const myPreco = p ? p.preco === parseFloat(preco) : true;
    //         return myPreco;
    //     });
    //     if (!p) {
    //         return res.status(404).json({ message: 'Preço do produto não encontrado.' });
    //     }
    //     console.log(`preços: ${p}`)
    //     res.json(p);
    // }
    // res.json(produtos);
})
router.get('/allprodutos', (req, res) => {
    const produtos = readProdutos();
    return res.json(produtos);
});
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