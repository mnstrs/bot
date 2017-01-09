'use strict'

var request = require('request'),
    rp = require('request-promise'),
    userData = {}

function fromDb() {


    // get specific data
    let getfromUser = function(sender) {

        let where = global.fire.database()

        return where.ref('users').child(sender).once('value').then((snap) => {

            userData.address = snap.val().address.formatted_address
            userData.salary = snap.val().salary
            userData.knowledge = snap.val().knowledge

            return userData

        })

    }

    let getfromJobs = (area, address, salary) => {

        let where = global.fire.database()

        return where.ref('jobs').once('value').then((snap) => {

            let object = snap.val(),
                jobs = {}

            Object.keys(object).forEach((key) => {

                if (
                    object[key].salary == salary &&
                    object[key].opportunity == area &&
                    object[key].address == address.formatted_address) {
                    jobs.companies = object
                }

            })

            return jobs

        })
    }



    this.fromUser = (sender) => {

      return getfromUser(sender).then((value) => {

            return getfromJobs(value.knowledge, value.address, value.salary).then((jobs) => {
                return jobs
            })

        })

    }


}

module.exports = fromDb
