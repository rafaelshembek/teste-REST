// modelo do produto no banco de dados do mongodb

const produtoSchem = [
    {
        nome: {
            typ: String,
            required: true
        },
        preco: {
            typ: Number,
            required: true
        },
        descricao: {
            typ: String,
            required: false
        },
        categoria: {
            typ: String,
            required: false
        }
    }
]

export default produtoSchem;