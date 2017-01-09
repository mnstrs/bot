'use strict'

var request     = require('request'),
    rp          = require('request-promise'),
    userData = {}

function fromDb() {


    // get specific data
    let getfromUser = function(sender) {

      let where = global.fire.database()

      return where.ref('users').child(sender).once('value').then(function(thisValue) {

        userData.address = thisValue.val().address.formatted_address
        userData.salary  = thisValue.val().salary
        userData.area    = thisValue.val().knowledge

        return userData

      })

    }

    let getfromJobs = function(area) {

      let where = global.fire.database()

      return where.ref('users').child(sender).once('value').then(function(thisValue) {

        return thisValue.salary

      })

    }



    this.fromUser = function(sender){

      let where = global.fire.database()

      getfromUser(sender).then(function(value) {

        console.log('hey : ', value.area)

      })


      getfromJobs(sender).then(function(thisArea){

        console.log('retorno : ', thisArea)

      })



    }


}

module.exports = fromDb
