function database(){

  'use strict'

  // [START initialize]
  let firebase  = require('firebase')
  let slugify   = require('slugify')

/*
  let admin     = require('firebase-admin')

  let fire = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "agendinha-b218a",
      clientEmail: "fire-947@agendinha-b218a.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCiOWcG8a+9y2Ze\nqS9uyREeXfzrhghof2sJpcibz9qfVzaSinuXHnCnqNxNL1NqD2LrmbwvfvuWVbRV\nocNEpDU8JYkYym4vGKGUJGchGqz93QYorRKiRNmlvyJZzpDWm5UQgkK6BZVKFE0z\nha0zikGnjtcn3g4TKBtd1idWp7dA8wCVl7lFXoFUdRwvTUg7Q5kNo/NsvvDfgbqn\nmSr/ojkIHG/UjiW6J6zJDaTXm34n/dqNdWSXzfMDQafUmD4Ayk0RJQlVFiNV3LC1\nKvwfHqANa9Ke/+2etPkhHGbZZLowPD5LzrYWd0rn2Y8WV3WEo7uBWjaXBRluJel+\nW2mH4FuHAgMBAAECggEBAIF7Ga2kOKZfc7z4gwCFAeHgGOCQIaPul6uipEUhGRl3\nTfqXB+BtjnNzxyrgLE8KKuVr1pV+YCb1DzQOIkJmYos4Vn3wDRQQL9+DUsFMfmk+\nAg1zXt0f4Sx3K17NDjQNCGSd486AaFExdRE7kCwEHTU1QKv0g/1sVLOIG+wBf7YZ\nOW0xHMBY3kszKdRS7D/UlHZAhUs6YQnmuFWXWp2tzCrIyA3qs2HRPKyCMf5U/pke\n09i2qpN9Gz869Xd4gUPJ6L8jTDaInkV8m1NrQjoFgKQqWEWbSz/++jd8esVg3v12\npnINKGPv4FNs8jcRg8i9VsTx4e+MupvEN6hLtwy2RrECgYEA1OCAIRVaR7lvLoh9\nvGkb0/2KV2BoKYYoQVrbSoNkJpLSXWUWZNTxijb3L7BXX/1KJe75ivAMwTMviuZN\nlc8OaXZv4r98j6Z5Ft3gt8ExTNuTITKFmBc0qgMKzWJEm1QeDdDc4AwfnMYJxsht\neQjZIl4mFa2h1X7eNBx+yIOlrUkCgYEAwxYfbheRZiK8fmig+122noJB6LB8NOjW\ndd4YSt2uDWebIc3VwsMn8Kc0uXsTaILL9Jh7MqlgSjUrfqgrrKa5WzQcFFrlsvUN\nAKsoeIpYpaU99l2d7whuscw2mMknzWSLcYDaidwpVTEoa1pFzaCQdH1pVO7HFmED\nNIfY4iTK0k8CgYBt8roa3EVx0CPNm++dNYiK+GPQd1m1QLZf8wZaOPysM571X/Wu\nBJHwei03c1PdnxwB9ajrisp7qu0+R28BFh1yeRqWuaIjK69VESo0nlLRSIN4XPjF\nMg8gVEvrAns+4rZXGm5KRdi6B0sbYX+xSNGlP41aGwEAHPO1ZJZTCDO1CQKBgQCM\nJRBfHj8tiDaw+Kjs6t2N8TU329DekYW/FtWMssOejZc8KYouZ9QBZZzSwj+nDI9I\nH2IhetvZc2jTjCwT05HEmyKw3Lu2W6QDnvFr5rbYCGUC3y3d0cjzoSh3ico2Gsyx\ntUdJUge/U5kdxbPvjDE5/f31LbOHuBl9WznK+3NYsQKBgHRoJb8JibdCzoVrNfW3\nh1MPsw8JussYS3/MKFQbeVAPB5977XKxaxZhbN98QE4axC99UQewxMFdMofopwYG\nJKpLeO6gQJprcYs++ZjiqELYRK7G9YraD1hQp2whiZHhNxg2/s5OyXp0SZVLAEml\nK3WdLPtuvrTlHPuhlZxghGTh\n-----END PRIVATE KEY-----\n",
    }),
    databaseURL: "https://agendinha-b218a.firebaseio.com/"
  })

*/

  let fire = firebase.initializeApp({
      serviceAccount: {
          projectId: "agendinha-b218a",
          clientEmail: "fire-947@agendinha-b218a.iam.gserviceaccount.com",
          privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCiOWcG8a+9y2Ze\nqS9uyREeXfzrhghof2sJpcibz9qfVzaSinuXHnCnqNxNL1NqD2LrmbwvfvuWVbRV\nocNEpDU8JYkYym4vGKGUJGchGqz93QYorRKiRNmlvyJZzpDWm5UQgkK6BZVKFE0z\nha0zikGnjtcn3g4TKBtd1idWp7dA8wCVl7lFXoFUdRwvTUg7Q5kNo/NsvvDfgbqn\nmSr/ojkIHG/UjiW6J6zJDaTXm34n/dqNdWSXzfMDQafUmD4Ayk0RJQlVFiNV3LC1\nKvwfHqANa9Ke/+2etPkhHGbZZLowPD5LzrYWd0rn2Y8WV3WEo7uBWjaXBRluJel+\nW2mH4FuHAgMBAAECggEBAIF7Ga2kOKZfc7z4gwCFAeHgGOCQIaPul6uipEUhGRl3\nTfqXB+BtjnNzxyrgLE8KKuVr1pV+YCb1DzQOIkJmYos4Vn3wDRQQL9+DUsFMfmk+\nAg1zXt0f4Sx3K17NDjQNCGSd486AaFExdRE7kCwEHTU1QKv0g/1sVLOIG+wBf7YZ\nOW0xHMBY3kszKdRS7D/UlHZAhUs6YQnmuFWXWp2tzCrIyA3qs2HRPKyCMf5U/pke\n09i2qpN9Gz869Xd4gUPJ6L8jTDaInkV8m1NrQjoFgKQqWEWbSz/++jd8esVg3v12\npnINKGPv4FNs8jcRg8i9VsTx4e+MupvEN6hLtwy2RrECgYEA1OCAIRVaR7lvLoh9\nvGkb0/2KV2BoKYYoQVrbSoNkJpLSXWUWZNTxijb3L7BXX/1KJe75ivAMwTMviuZN\nlc8OaXZv4r98j6Z5Ft3gt8ExTNuTITKFmBc0qgMKzWJEm1QeDdDc4AwfnMYJxsht\neQjZIl4mFa2h1X7eNBx+yIOlrUkCgYEAwxYfbheRZiK8fmig+122noJB6LB8NOjW\ndd4YSt2uDWebIc3VwsMn8Kc0uXsTaILL9Jh7MqlgSjUrfqgrrKa5WzQcFFrlsvUN\nAKsoeIpYpaU99l2d7whuscw2mMknzWSLcYDaidwpVTEoa1pFzaCQdH1pVO7HFmED\nNIfY4iTK0k8CgYBt8roa3EVx0CPNm++dNYiK+GPQd1m1QLZf8wZaOPysM571X/Wu\nBJHwei03c1PdnxwB9ajrisp7qu0+R28BFh1yeRqWuaIjK69VESo0nlLRSIN4XPjF\nMg8gVEvrAns+4rZXGm5KRdi6B0sbYX+xSNGlP41aGwEAHPO1ZJZTCDO1CQKBgQCM\nJRBfHj8tiDaw+Kjs6t2N8TU329DekYW/FtWMssOejZc8KYouZ9QBZZzSwj+nDI9I\nH2IhetvZc2jTjCwT05HEmyKw3Lu2W6QDnvFr5rbYCGUC3y3d0cjzoSh3ico2Gsyx\ntUdJUge/U5kdxbPvjDE5/f31LbOHuBl9WznK+3NYsQKBgHRoJb8JibdCzoVrNfW3\nh1MPsw8JussYS3/MKFQbeVAPB5977XKxaxZhbN98QE4axC99UQewxMFdMofopwYG\nJKpLeO6gQJprcYs++ZjiqELYRK7G9YraD1hQp2whiZHhNxg2/s5OyXp0SZVLAEml\nK3WdLPtuvrTlHPuhlZxghGTh\n-----END PRIVATE KEY-----\n",
      },
      databaseURL: "https://agendinha-b218a.firebaseio.com/"
  })
  // [END initialize]


// this add to de db
function add(path,data){

  let updates = {}

  updates[path] = data

  return fire.database().ref().update(updates)

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

    let path = 'users' + '/' + slugify(fullName),
        data = {
          full_name : fullName,
          sender : sender
        }

    add(path,data)
  }

  // this function is to add user's knowledge
  this.knowledgeAdd = function(fullName, typeOfJob){

    let path = 'users' + '/' + slugify(fullName) + '/knowledge',
        data = typeOfJob

    add(path,data)
  }

  this.userLocal = function(lat, long, fullName){

    let path = 'users' + '/' + slugify(fullName)  + '/address'

    let data = {
      lat   : lat,
      long  : long
    }

    add(path,data)
  }

}




module.exports = database
