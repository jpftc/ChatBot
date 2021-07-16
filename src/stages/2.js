const { menu0 } = require('../menu/menu0')
const { db } = require('../models/banco')
const axios = require('axios')

function execute(user, msg) {
    let menu = ' PRODUTOS \n\n'

    Object.keys(menu0).forEach((value) => {
        let element = menu0[value]
        menu += `${value} - ${element.description}        R$ ${element.price} \n`
    })

    if (msg.match(/n..|N../g)) {
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
        return ['Digite o seu CEP por favor']
    }

    if (msg.match(/\d\d\d\d\d\d\d\d|\d\d\d\d\d-\d\d\d/g)) {
        let url = `https://viacep.com.br/ws/${msg.match(/\d\d\d\d\d\d\d\d|\d\d\d\d\d-\d\d\d/g)[0]}/json/`
        axios.get(url).then((response) => {
            db[user].logradouro = response.data.logradouro
            db[user].bairro = response.data.bairro
            db[user].localidade = response.data.localidade
            db[user].uf = response.data.uf
        }).catch((err) => {
            console.error(err)
        })
        return [
            'Digite o numero da residência'
        ]
    }

    if (msg.match(/\d{5}|\d{4}|\d{3}|\d{2}/g)) {
        db[user].stage = 3
        let address = `${db[user].logradouro}, ${msg.match(/\d{5}|\d{4}|\d{3}|\d{2}/g)[0]} ${db[user].bairro} ${db[user].localidade} ${db[user].uf}?`
        return [
            address,
            'Confirma o endereço:'
        ]
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