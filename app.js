var express          = require('express'),
    app              = express(),
    bodyParser       = require('body-parser'),
    workMessages     = require('./comunicator'),
    getStarted       = require('./getStartedButton'),
    getStartedBtn    = new getStarted(),
    messenger        = new workMessages()


app.use(bodyParser.json())

// index page
app.get('/', function(req, res) {
  res.send('Hello World!')
})

// terms
app.get('/terms', function(req, res) {
  res.send('This app is beta version')
})

// for validation
app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === 'agendinha-b218a') {
    res.send(req.query['hub.challenge'])
  }
})

// showing get started button
getStartedBtn.getStarted()

// send messenges
app.post('/webhook', function (req, res) {
  messenger.receive(req, res)
})

// listening
app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})
