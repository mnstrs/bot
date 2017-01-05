    'use strict'
var request     = require('request'),
    rp          = require('request-promise'),
    userInfo = ''

function fromDb() {


    let slugify = require('slugify')

    // find location
    function findLocation(coords) {

      let options = {
          url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+coords.lat +','+coords.long,
          json: true
      }

      rp(options)
          .then(function (response) {
            userInfo    = response
            console.log(response)

          }) .catch(function (err) {
            userInfo    = err
          })

          return userInfo

    }


    // get specific data
    this.allUsers = function(sender) {

        let where = global.fire.database()

        where.ref('users').child(sender).once('value').then(function(thisValue) {
            let user = thisValue.val()
            findLocation(user.address)

        })

    }



}

module.exports = fromDb

/*
{

  '1090761591038429':{
      address: { lat: -30.035611959467, long: -51.228065678545 },
     full_name: 'Thom Morais',
     knowledge: 'Front End Developer',
     salary: '5755',
     sender: '1090761591038429'
   },

  '1137302476361644':{
     address: { lat: -30.035482356118, long: -51.228070138657 },
     full_name: 'Thom Morais',
     knowledge: 'Design',
     salary: '2000',
     sender: '1137302476361644'
   }

}
*/
