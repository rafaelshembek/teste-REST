import express from "express";
import teste from "../../api/produtos.js";

const app = express();
app.use(express.json());
app.use('/', teste);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na port http://localhost:${PORT}`)
})