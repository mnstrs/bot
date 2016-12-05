function getStartedButton() {
  'use strict'

  let token   = 'EAAN5QAbMFIsBAGsq2GqLgFC2tljsIEPZB6HBlbgKX3ubZBZCErnulkP93aet8Tpk5m4Y3gr116Mc7RKKhoXQYnZCB7JqESAZAAh6l4YZA8lOEO5NcZBZCF03gwnpX9Tg4pSgsDGxHGJTOQk83Ja4f3eWdfALC7C3krU9qmTv6Nec1QZDZD'
  let request = require('request')

  this.showStarterButton = function() {

    request({
        url: 'https://graph.facebook.com/v2.6/me/thread_settings',
        qs: {
            access_token: token
        },
        method: 'POST',
        json:{
            setting_type : 'call_to_actions',
            thread_state : 'existing_thread',
            call_to_actions:[
                {
                  'payload' : 'home'
                }
              ]
        }

    }, function(error, response, body) {
        if (error) {
            console.log('Error:', error)
        } else if (response.body.error) {
            console.log('Error:', response.body.error)
        }
    })

  }

}

module.exports = getStartedButton
