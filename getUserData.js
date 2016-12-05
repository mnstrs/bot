function getUserData(){
  'use strict'

  var request   = require('request'),
      token     = 'EAAN5QAbMFIsBAGsq2GqLgFC2tljsIEPZB6HBlbgKX3ubZBZCErnulkP93aet8Tpk5m4Y3gr116Mc7RKKhoXQYnZCB7JqESAZAAh6l4YZA8lOEO5NcZBZCF03gwnpX9Tg4pSgsDGxHGJTOQk83Ja4f3eWdfALC7C3krU9qmTv6Nec1QZDZD'

 var userInfo = ''

  this.getInfo = (sender) => {
      request({
        url: 'https://graph.facebook.com/v2.6/'+sender+'?fields=first_name,last_name,profile_pic&access_token='+ token,
          json: true
        },function (error, response, body){
            if (!error && response.statusCode == 200)
              userInfo = body
          }
        )
      return userInfo
  }

}

module.exports = getUserData
