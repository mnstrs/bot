
function getStartedButton() {
  'use strict'

  let request     = require('request'),
      getUser     = require('./getUserData'),
      token       = require('./token'),
      tokenValue  = new token(),
      user        = new getUser()


  this.getStarted = function(sender, text){

    let userData = user.getInfo(sender)

    request({
        url: 'https://graph.facebook.com/v2.6/me/thread_settings?access_token='+ tokenValue.tokenVar(),
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
<<<<<<< HEAD
          if (!error && response.statusCode == 200)
            console.log('deu certo')

=======
          // if (!error && response.statusCode == 200){
          //   console.log('deu certo')
          // }
>>>>>>> a1820e59eb323143ed340e8939ab1c2cb2a0d1f0
        }
    )


  }

}

module.exports = getStartedButton
