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
        const peoples = readProdutos();
        const { nome, profissao } = req.query;

        if (!nome && !profissao) {
            return res.status(404).json({ message: 'nome ou profissão não foi informado.' })
        }

        if (nome) {
            if (nome.trim() === "") {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            const user = peoples.find(p => p.nome && p.nome.toLowerCase() === nome.toLowerCase());
            if (!user) {
                return res.status(404).json({ message: 'Dados não informado.' });
            }
            return res.json(user);
        }
        if (profissao) {
            const user = peoples.find(p => p.profissao && p.profissao.toLowerCase() === profissao.toLowerCase());
            if (!profissao) {
                return res.status(404).json({ message: 'Profissão não encontrado.' });
            }
            return res.json(user);
        }
        // CASO NENHUM FILTRO SEJA APLICADO, RETORNA TODOS OS PRODUTOS
        return res.json(peoples);
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
router.get('/all', (req, res) => {
    const peoples = readProdutos();
    return res.json(peoples);
});
router.get('/:id', (req, res) => {
    try {
        const peoples = readProdutos();
        const people = peoples.find(p => p.id === parseInt(req.params.id));
        console.log(people);
        if (!people) {
            return res.status(404).json({ message: 'Id não encontrado' });
        }
        res.json(people);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar o usuario', error: err });
    }
})

export default router;