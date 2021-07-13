const { menu0 } = require('../menu/menu0')
const { db } = require('../models/banco')

function execute(user, msg) {
    let menu = ' PRODUTOS \n\n'

    Object.keys(menu0).forEach((value) => {
        let element = menu0[value]
        menu += `${value} - ${element.description}        R$ ${element.price} \n`
    })

    if (msg === 'não') {
        db[user].stage = 1
        return [
            'Por favor selecione outro produto',
            menu
        ]
    }

    if (msg === '*') {
        db[user].stage = 0
        return ['Pedido cancelado com sucesso']
    }

    if (msg === '#') {
        db[user].stage = 3
        return ['Digite o endereço por favor :']
    }

    let resumo = '  RESUMO DO PEDIDO \n'
    let total = 0
    db[user].itens.forEach((value) => {
        console.log(value)
        resumo += `${value.description} ----------------  ${value.price} \n`

        total += value.price
    })

    resumo += '-------------------------\n'
    resumo += ` Total R$ ${total}`

    return [
        'Para confirmar digite # ou para cancelar digite * ',
        resumo,
    ]
}

exports.execute = execute