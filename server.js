var express = require('express')
var app = express()
var request = require('request');
var wikiResponse = ""

request.get({
    url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=bee&limit=1&format=json",
    json: true,
}, function(error, response, body) {
    if (error) {
        console.error(error);
        // return res.json(body);
    }
    wikiResponse = body
});
app.get('/healthz', function (req, res, next) {
  // check my health
  // -> return next(new Error('DB is unreachable'))
  res.sendStatus(200)
})

app.get('/', function(req, res) {
    res.send('Hello World!'+"</br>" + JSON.stringify(wikiResponse))
})

app.listen(5000, function() {
    console.log(' app listening on port 3000! ')
})
