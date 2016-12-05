function messenger() {
  'use strict'

    let request    = require('request'),
        firebase   = require('./firebase'),
        getUser    = require('./getUserData'),
        buttons    = require('./quickActions'),
        user       = new getUser(),
        database   = new firebase(),
        quickAction= new buttons(),
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
                console.log('Error: Request', error + "<-")
            } else if (response.body.error) {
                console.log('Error:  Request', response.body.error)
            }
        })
    }

    // handle messagens
    function handleMessage(event, sender, userName, userData){

      let name        =  userName,
          messageData = {},
          fullName    = name +' '+ userData.last_name

      // if user send an text message
      if (event.message){

        let msg = event.message.text

          switch (msg ) {

            case 'Olá':
              messageData = {  text: msg + ', ' + name }
            break

            case 'Profissional':
              let content = quickAction.handleAction('interestArea', name)
              messageData = content
            break

            case 'Empresa':
              messageData = {  text: 'Desculpe, ainda estamos trabalhando no cadastro de empresa'  }
            break

           default:
              messageData = {  text: sender + ' ' +  msg + ' ' +  name}
           }

        // send the result
        sendText(sender, messageData)
      }

      // if user click on some button
      if (event.postback) {

        let payload = event.postback.payload

        switch (payload) {

          case 'GET STARTED':
            let content = quickAction.handleAction('professionalOrEnterprise')
            messageData = content
          break

         default:
            messageData = {  text: 'Some Payload inited'}
         }

         // send the result
         sendText(sender, messageData)
      }

    }

    // this receive messagens and kind deal with that
    this.receive = (req, res) => {
        for(let x = 0; x < req.body.entry.length; x++){

            let messaging_events = req.body.entry[x].messaging

            for (let i = 0; i < messaging_events.length; i++) {

              let event = req.body.entry[0].messaging[i],
              sender    = event.sender.id,
              userData  = user.getInfo(sender),
              firstName = userData.first_name

              handleMessage(event, sender, firstName, userData)
          }
        }
        res.sendStatus(200)
    }

}

module.exports = messenger
