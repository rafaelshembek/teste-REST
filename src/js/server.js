import express from "express";
import routes from "../../pages/api/routes.js";

const app = express();
app.use(express.json());
app.use('/produtos', routes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na port http://localhost:${PORT}`)
})