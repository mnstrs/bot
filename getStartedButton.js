
function getStartedButton() {
  'use strict'

  let request = require('request'),
      token   = "EAAN5QAbMFIsBAGsq2GqLgFC2tljsIEPZB6HBlbgKX3ubZBZCErnulkP93aet8Tpk5m4Y3gr116Mc7RKKhoXQYnZCB7JqESAZAAh6l4YZA8lOEO5NcZBZCF03gwnpX9Tg4pSgsDGxHGJTOQk83Ja4f3eWdfALC7C3krU9qmTv6Nec1QZDZD",
      getUser = require('./getUserData'),
      user       = new getUser()

  this.getStarted = function(sender, text){
    request({
        url: 'https://graph.facebook.com/v2.6/me/thread_settings?access_token='+ token,
        method: 'POST',
        json: {
          "setting_type":"call_to_actions",
          "thread_state":"new_thread",
          "call_to_actions":[
            {
              'payload':'GET STARTED'
            }
          ]
        }
    },function (error, response, body){
          if (!error && response.statusCode == 200)
            console.log('deu certo')

        }
    )

    let userData = user.getInfo(sender)

  }




}

module.exports = getStartedButton
