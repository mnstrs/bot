function messenger() {

    'use strict'

    let request     = require('request'),
        firebase    = require('./addToFirebase'),
        token       = require('./token'),
        emoji       = require('./emoji'),
        gtFirebase  = require('./getFromFirebase'),
        buttons     = require('./quickActions'),

        match     = require('./matcher'),
        matcher   = new match(),

        emojiRnd    = new emoji(),
        tokenValue  = new token(),
        database    = new firebase(),
        gtDatabase  = new gtFirebase(),
        quickAction = new buttons(),
        messageData = {
            text: '😛'
        }

    // this send messages to the user
    function sendText(sender, text) {

        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: tokenValue.tokenVar()
            },
            method: 'POST',
            json: {
                recipient: {
                    id: sender
                },
                message: text
            }

        }, function(error, response, body) {
            if (error) {
                // console.log('Error: sendText', error + "<-")
            } else if (response.body.error) {
                //  console.log('Error:  sendText', response.body.error)
            }
        })

    }

    // this function transform 1000 to R$ 1.000
    Number.prototype.formatMoney = function(c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "," : d,
            t = t == undefined ? "." : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "")
    }
    // (Number(VALOR)).formatMoney(2, ',', '.')

    // handle messagens /// NEED TO BE IMPROVED
    function handleMessage(event, sender) {

        let msg = event.message

        gtDatabase.currentUser(sender, 'users').then(function(value) {

            // console.log('👉', value)

            if (msg.quick_reply) {

                if (msg.quick_reply.payload) {
                    switch (msg.quick_reply.payload) {

                        case 'pick_profissional':
                            database.userAdd(sender)
                            messageData = quickAction.handleAction('interestArea', sender)
                            break

                        case 'pick_empresa':
                            messageData = {
                                text: 'Desculpe, ainda estamos trabalhando no cadastro de empresa'
                            }
                            break

                        case 'pick_design':
                            database.knowledgeAdd(sender, msg.text)
                            messageData = {
                                text: 'Qual a sua pretenção sálarial? Exemplo "3000"'
                            }
                            break

                        case 'pick_front-end':
                            database.knowledgeAdd(sender, msg.text)
                            messageData = {
                                text: 'Qual a sua pretenção sálarial? Exemplo "3000"'
                            }
                            break

                        case 'pick_full-stack':
                            database.knowledgeAdd(sender, msg.text)
                            messageData = {
                                text: 'Qual a sua pretenção sálarial? Exemplo "3000"'
                            }
                            break

                        case 'pick_back-end':
                            database.knowledgeAdd(sender, msg.text)
                            messageData = {
                                text: 'Qual a sua pretenção sálarial? Exemplo "3000"'
                            }
                            break

                        default:
                            messageData = {
                                text: '😊'
                            }

                    }
                }

            } else {

                if (!isNaN(msg.text)) {

                    messageData = {
                        text: '💵'　
                    }

                    if (value.salary == null) {

                        database.salary(sender, msg.text)

                        if (value.address == null || value.address == 'undefined')
                            messageData =  quickAction.handleAction('cityAndRegion', sender)

                    } else {

                        messageData = {
                            text: 'Você enviou um número, quer atualizar o salário pretendido?'
                        }

                    }

                } else {

                    switch (msg.text) {

                        case 'Olá':
                            messageData = {
                                text: 'Olá, ' + value.name
                            }
                            break

                        case 'Oi':
                            messageData = {
                                text: 'Oi'
                            }
                            break

                        case 'Vagas':
                            matcher.fromUser(sender)
                            break

                        case 'Vaga':
                            matcher.fromUser(sender)
                            break

                        case 'vagas':
                            matcher.fromUser(sender)
                            break

                        case 'vaga':
                            matcher.fromUser(sender)
                            break

                        case 'Res':
                            messageData = quickAction.handleAction('professionalOrEnterprise')
                            break

                        default:
                            messageData = {
                                text: 'Um texto qualquer ' + emojiRnd.emoji()
                            }
                    }

                }

            }
            // send the result
            sendText(sender, messageData)
        })
    }

    // handle attachments (images, location, ...)
    function handleAttachments(attachment, sender) {

        /* let userData = user.getInfo(sender) */

        switch (attachment.type) {

            case 'location':

                messageData = { text: '🏡'}

                /* CHANGE aqui devo testar se o usuário já está cadastrado antes de salvar os dados dele.*/

                gtDatabase.currentUser(sender, 'users').then(function(value) {


                    if (value.full_name == null) {

                      sendText(sender, quickAction.handleAction('professionalOrEnterprise'))

                    }

                    else if (value.knowledge == null) {

                      sendText(sender, quickAction.handleAction('interestArea', sender))

                    }

                    else if (value.address == null || value.address == 'undefined') {

                      database.local(attachment.payload.coordinates.lat, attachment.payload.coordinates.long, sender)
                      sendText(sender, {text: 'Tudo pronto 🙂'})

                    } else {

                        sendText(sender, {text: 'Gostaria de mudar o seu endereço?'  })

                    }

                })

                break

            case 'image':
                messageData = {  text: 'Bonito' }
                break

            default:
                messageData = quickAction.handleAction('cityAndRegion', sender)
        }
        // send the result
        sendText(sender, messageData)

    }

    // this receive messagens and kind deal with that
    this.receive = (req, res) => {
        for (let x = 0; x < req.body.entry.length; x++) {

            let messaging_events = req.body.entry[x].messaging

            for (let i = 0; i < messaging_events.length; i++) {

                let event = req.body.entry[0].messaging[i],
                    sender = event.sender.id

                // if user send a message
                if (event.message) {

                    // if it is an attachment (location or media)
                    if (!event.message.is_echo) {
                        // matcher.allUsers(sender)

                        if (event.message.attachments) {
                            handleAttachments(event.message.attachments[0], sender)
                        } else {
                            handleMessage(event, sender)
                        }

                    }

                    // if is postback
                } else if (event.postback) {

                    switch (event.postback.payload) {

                        case 'GET STARTED':
                            messageData = quickAction.handleAction('professionalOrEnterprise')
                            break

                        default:
                            messageData = {
                                text: 'O que você clicou? Não reconheço essa ação.'
                            }

                    }
                    // send the result
                    sendText(sender, messageData)
                }
            }
        }
        res.sendStatus(200)
    }

}

module.exports = messenger
