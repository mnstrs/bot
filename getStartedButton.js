
function getStartedButton() {
  'use strict'

  let request = require('request'),
      token      = "EAAN5QAbMFIsBACvD5rFueZAhxsr6KM3zgrYASWH0isqMfBvR0BvLZAQ8nNckYmk7xqTmA6UtkkbuwRLiGR2YpS8VvdlPxOmtFPvQt0WttEZAagiwNBONgx9crRMSjstaYdTeWZBOkZBVoYYxYSH00y52ZAmNpRVavG31l7IBO0igZDZD",
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
