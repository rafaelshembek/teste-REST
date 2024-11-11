import express from "express";
import Produtos from "../models/produto.js";
import fs from "fs";
import path from "path";
const router = express.Router();


// buscar o arquivo no projeto
const produtosFilePath = path.join(process.cwd(), 'produtos.json');

// função para ler os arquivo
const readProdutos = () => {
    const data = fs.readFileSync(produtosFilePath, 'utf8');
    return JSON.parse(data);
}
// retorna todos os produtos
router.get('/', (req, res) => {
    const produtos = readProdutos();
    res.json(produtos);
})

router.get('/produtos', async (req, res) => {
    try {
        const product = await Produtos.find();
        res.json(product);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar os produtos', error: error });
    }
})
router.get('/produto/:id', (req, res) => {
    const { id } = req.params;
    res.json({ id, nome: `Produto: ${id}` });
})

export default router;