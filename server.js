var express = require('express')
var app = express()
var request = require('request');
var wikiResponse = ""
var requesCounter=0
var requesCounterError=0
getWiki=function(){
  request.get({
      url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=bee&limit=1&format=json",
      json: true,
  }, function(error, response, body) {
      if (error) {
          console.error(error);
          // return res.json(body);
          wikiResponse = error
          requesCounterError=requesCounterError+1
      }else{
        requesCounter=requesCounter+1
      }
      wikiResponse = body
  });
}

app.get('/healthz', function (req, res, next) {
  // check my health
  // -> return next(new Error('DB is unreachable'))
  res.sendStatus(200)
})

app.get('/', function(req, res) {
    getWiki();
    var stringRequest = "a new request , "+"number of requests is "+requesCounter ;
    res.send('Hello World!'+"</br>" + JSON.stringify(wikiResponse)+"</br>"+stringRequest+"</br>"+wikiResponse+"</br> number of requests failed is "+requesCounterError)
    console.log(stringRequest);
})

app.listen(8000, function() {
    console.log(' app listening on port 3000! ')
})
