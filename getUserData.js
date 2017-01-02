'use strict'

var request     = require('request'),
    rp          = require('request-promise'),
    token       = require('./token'),
    tokenValue  = new token(),
    userInfo    = ''


function getUserData(){


   this.getInfo = (sender) => {

    let options = {
        url: 'https://graph.facebook.com/v2.6/'+sender+'?fields=first_name,last_name,profile_pic&access_token='+ tokenValue.tokenVar(),
        json: true
    }

    rp(options)
        .then(function (response) {
          userInfo    =  response
        }) .catch(function (err) {
          userInfo    = err
        })

  return userInfo

  }


}



module.exports = getUserData
