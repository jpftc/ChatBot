const { db } = require('../models/banco')
//const { step } = require('../models/stages')

function execute(user, msg) {
    if (msg.match('1')) {
        db[user].stage = 4
        return ['Caso precise de troco informe o valor!']
    } else if (msg.match('2')) {
        db[user].stage = 4
        return ['Vale-Refeição ou cartão de crédito/debito?']
    } else if (msg.match('3')) {
        db[user].stage = 4
        return ['Chave do PIX aqui 000.000.000-00, favor informe quando for realziado o pagamento!']
    } else {
        return ['Por favor selecione uma opção váldia!']
    }
}

exports.execute = execute