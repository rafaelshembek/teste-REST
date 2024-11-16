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
export default function handler(req, res) {
    const { method, query } = req;
    try {
        const produtos = readProdutos();
        if (method === "GET") {
            if (query.id) {
                // buscar produto pelo ID
                const produto = produtos.find(p => p.id === parseInt(req.params.id));
                if (!produto) {
                    return res.status(404).json({ message: 'Produto não encontrado' });
                }
                return res.status(200).json(produto);
            }
            // Retornar todos os produtos
            return res.status(200).json(produtos);
        }
        res.status(405).json({ message: "Método não permitido" });
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor", error: err.message });
    }
}
