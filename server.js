// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var requestIp = require('request-ip');
var obj = {
           "ipaddress": "",
          "software": "null",
          "language": "null"
       };

app.use(requestIp.mw())

app.use(function(req, res, next) {      
       obj.ipaddress = req.clientIp;
       next();
   });

app.get('/:api/whoami', function(req, res, next) {
    //console.log(req.url)
    var date = req.params.time; //returns the search parameter
    
   // inside middleware handler 
   // app.use(requestIp.mw())
 /*   
   app.use(function(req, res, next) {
       const ip = req.clientIp;
       res.end(ip, "your ip address");
   });*/
  res.json(obj);

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

/*
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];
*/
