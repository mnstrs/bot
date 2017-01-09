'use strict'
var request     = require('request'),
    rp          = require('request-promise'),
    token       = require('./token'),
    tokenValue  = new token()

function database(){
  'use strict'

      // dbConect      = require('./conectToFirebase'),
      // conectToDb    = new dbConect(),

  // this add to de db
  function add(path,data){
    let updates = {}

    updates[path] = data

    return  global.fire.database().ref().update(updates)

    console.log(path)
  }

  // this functions is to add enterprises
  this.enterpriseAdd = function(enterprise, state, city, type) {

    let path = 'jobs'

    let data = {
      enterprise    : enterprise,
      UF            : state,
      city          : city,
      type          : type,
      opportunities : {
        id_1        : ''
      }
    }

    add(path,enterprise,data)
  }

  // this functions is to add opportunities
  this.opportunityAdd = function(enterprise, title, city, state, description, salary) {

    let path = 'opportunities'

    let data = {
      enterprise  : enterprise,
      opportunity : title,
      UF          : state,
      city        : city,
      type        : type,
      description : description,
      salary      : salary
    }

    add(path,title,data)
  }

  // this function is to add users
  this.userAdd = function(sender){

    let path = 'users' + '/' + sender,
        options = {
          url: 'https://graph.facebook.com/v2.6/'+sender+'?fields=first_name,last_name,profile_pic&access_token='+ tokenValue.tokenVar(),
          json: true
       }

    rp(options)
        .then(function (response) {

          let data = {
            full_name :  response.first_name + ' ' + response.last_name,
            name : response.first_name,
            last_name : response.last_name,
            sender : sender
          }

          add(path,data)

        }).catch(function (err) {
          console.log(err)
        })

      //  return userInfo

  }

  // this function is to add user's knowledge
  this.knowledgeAdd = function(sender, typeOfJob){

    let path = 'users' + '/' + sender + '/knowledge',
        data = typeOfJob

    add(path,data)
  }

  // this function is to add user's local
  this.local = function(lat, long, sender){

    let path = 'users' + '/' + sender + '/address',
     options = {
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&language=pt-BR&result_type=administrative_area_level_2&key=AIzaSyDIH5ufUCfUOBEcrMX4WlMS2EzTjOwKMcQ',
        json: true
    }

    rp(options)
        .then(function (response) {

          let res   = response.results[0],
          data = {
            lat : lat,
            long : long,
            formatted_address :res.formatted_address || undefined,
            city    : res.address_components[0].long_name || undefined,
            state   : res.address_components[1].long_name || undefined,
            country : res.address_components[2].long_name || undefined
          }

          add(path,data)

        }).catch(function (err) {
          console.log(err)
        })
  }

  // this function is to add user's pretended salary
  this.salary = function(sender, salary){

    let path = 'users' + '/' + sender  + '/salary',
    data = salary

    add(path,data)

  }

}

module.exports = database
