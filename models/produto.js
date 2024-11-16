// modelo do produto no banco de dados do mongodb

const produtoSchem = [
    {
        nome: {
            type: String,
            required: true
        },
        preco: {
            type: Number,
            required: true
        },
        descricao: {
            type: String,
            required: false
        },
        categoria: {
            type: String,
            required: false
        },
        img: {
            type: String,
            required: false
        }
    }
]

export default produtoSchem;