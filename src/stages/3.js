const { db } = require('../models/banco')
const { step } = require('../models/stages')

function execute(user, msg) {
    if (msg === '*') {
        db[user].stage = 0
        return ['Pedido cancelado com sucesso']
    }

    if (msg === '#') {
        db[user].stage = 5
        return ['Escolha a forma de pagamento:\n1️⃣-Dinheiro\n2️⃣-Cartão\n3️⃣-PIX']
    }

    return [
        '```Digite # para continuar ou * para cancelar```',
        `Confirma endereco de entrega : \n ${msg}`,
    ]
}

function getStage(user) {
    if (db[user]) {
        //Se existir esse numero no banco de dados
        return db[user].stage
    } else {
        //Se for a primeira vez que entra e contato
        db[user] = {
            stage: 0,
            itens: [],
        }
        return db[user].stage
    }
}

exports.execute = execute