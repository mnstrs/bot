function getDatabase() {
    'use strict'

    let slugify = require('slugify'),
        data = ''


    // get specific data
    this.fromUsers = function(sender, dataToGet, type) {

        let where = global.fire.database()

        return where.ref(type).child(sender).child(dataToGet).once('value').then(function(thisValue) {
            return thisValue.val()
        })

    }

    // get all user data
    this.currentUser = function(sender, type) {

        let where = global.fire.database()

        return where.ref(type).child(sender).once('value').then(function(thisValue) {
            return thisValue.val()
        })

    }

}

module.exports = getDatabase
