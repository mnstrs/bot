function database(){
  'use strict'

      // dbConect      = require('./conectToFirebase'),
      // conectToDb    = new dbConect(),

  // this add to de db
  function add(path,data){
    let updates = {}
    updates[path] = data
    return  global.fire.database().ref().update(updates)
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
  this.userAdd = function(fullName, sender){

    let path = 'users' + '/' + sender,
        data = {
          full_name : fullName,
          sender : sender
        }

    add(path,data)
  }

  // this function is to add user's knowledge
  this.knowledgeAdd = function(sender, typeOfJob){

    let path = 'users' + '/' + sender + '/knowledge',
        data = typeOfJob

    add(path,data)
  }

  // this function is to add user's local
  this.userLocal = function(lat, long, sender){

    let path = 'users' + '/' + sender + '/address'

    let data = {
      lat   : lat,
      long  : long
    }

    add(path,data)
  }

  // this function is to add user's pretended salary
  this.salary = function(sender, salary){

    let path = 'users' + '/' + sender  + '/salary',
    data = salary

    add(path,data)

  }

}

module.exports = database
