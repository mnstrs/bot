function messenger() {
  'use strict'

    let request    = require('request'),
        firebase   = require('./firebase'),
        getUser    = require('./getUserData'),
        buttons    = require('./quickActions'),
        user       = new getUser(),
        database   = new firebase(),
        quickAction= new buttons(),
        messageData = {text: '😛'},
        token      = "EAAN5QAbMFIsBAGsq2GqLgFC2tljsIEPZB6HBlbgKX3ubZBZCErnulkP93aet8Tpk5m4Y3gr116Mc7RKKhoXQYnZCB7JqESAZAAh6l4YZA8lOEO5NcZBZCF03gwnpX9Tg4pSgsDGxHGJTOQk83Ja4f3eWdfALC7C3krU9qmTv6Nec1QZDZD"

    // this send messages to the user
    function sendText(sender, text) {

        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: token
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

    // handle messagens /// NEED TO BE IMPROVED
    function handleMessage(event, sender, userName, userData){

      let name        =  userName,
          fullName    = name +' '+ userData.last_name,
          msg         = event.message.text

      if(event.message.quick_reply){
        msg =  event.message.quick_reply.payload

        if(!event.message.is_echo){
          console.log('🐘 PAYLOAD -> ',msg)
        }

        switch (msg) {

          case 'pick_profissional':
            database.userAdd(fullName, sender)
            messageData = quickAction.handleAction('interestArea', name)
          break

          case 'pick_empresa':
            messageData = {  text: 'Desculpe, ainda estamos trabalhando no cadastro de empresa'  }
          break

          case 'pick_design':
            database.knowledgeAdd(fullName, event.message.text)
            messageData = quickAction.handleAction('cityAndRegion', name)
          break

          case 'pick_front-end':
            database.knowledgeAdd(fullName, event.message.text)
            messageData = quickAction.handleAction('cityAndRegion', name)
          break

          case 'pick_full-stack':
            database.knowledgeAdd(fullName, event.message.text)
            messageData = quickAction.handleAction('cityAndRegion', name)
          break

          case 'pick_back-end':
            database.knowledgeAdd(fullName, event.message.text)
            messageData = quickAction.handleAction('cityAndRegion', name)
          break

          default:
            messageData = {  text: '😊'}
        }

      } else if(!event.message.is_echo){

        console.log(msg.startsWith("R$") , '🎬', msg)

        let word = 'qualuqer coisa'

        if(msg.startsWith("R$")){
          word = 'true'
        }else{
          word = 'false'
        }


        messageData = {  text: word}

        // console.log('😈 -> ', event)
      }else{

        messageData = {  text: 'Ainda não sei conversar com humanos, desculpe.'}
        // if(!event.message.is_echo)
        //   console.log(event.message)
      }

      // send the result
      sendText(sender, messageData)

    }

    // handle attachments (images, location, ...)
    function handleAttachments(attachment, userData, sender){

        let type = attachment.type,
            fullName    = userData.first_name +' '+ userData.last_name

         switch (type) {
          case 'location':
            database.userLocal(attachment.payload.coordinates.lat, attachment.payload.coordinates.long, fullName)
            messageData = {  text: 'Qual a sua pretenção sálarial? (Ex: R$ 3.000)'}
          break

          default:
            messageData = quickAction.handleAction('cityAndRegion', userData.first_name)

        }
        // send the result
        sendText(sender, messageData)

      }

    // this receive messagens and kind deal with that
    this.receive = (req, res) => {
        for(let x = 0; x < req.body.entry.length; x++){

            let messaging_events = req.body.entry[x].messaging

            for (let i = 0; i < messaging_events.length; i++) {

              let event     = req.body.entry[0].messaging[i],
                  sender    = event.sender.id,
                  userData  = user.getInfo(sender),
                  firstName = userData.first_name

              // if user send a message
              if(event.message){

                // if it is an attachment (location or media)
                if(event.message.attachments){
                  handleAttachments(event.message.attachments[0], userData, sender)
                }else{
                  handleMessage(event, sender, firstName, userData)
                }

              // if is postback
              }else if(event.postback){

                  let payload = event.postback.payload

                  switch (payload) {

                    case 'GET STARTED':
                      let content     = quickAction.handleAction('professionalOrEnterprise')
                          messageData = content
                    break

                   default:
                      messageData = {  text: 'O que você clicou? Não reconheço essa ação.'}
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
