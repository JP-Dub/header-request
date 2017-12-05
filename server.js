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

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// only edit below this line //
app.use(requestIp.mw())

app.use(function(req, res, next) {      
       obj.ipaddress = req.clientIp;// returns user IP address
       next();
   });

app.get('/:api/whoami', function(req, res, next) {
     var lan = req.acceptsLanguages();//returns user language
     var enc = req.headers;
     var agent = enc;

    
    for(var key in agent) { 
      switch (key){
        case "x-forwarded-for":
          obj.ipaddress = agent[key];
          break;
        case "user-agent":
          obj.software = agent[key];
          break;
        case "accept-language":
          obj.language = agent[key];
          break;
       }
    }
    console.log(obj.software)
  console.log(obj.ipaddress)
  console.log(obj.language)
   //  obj.language = lan[0];
    // obj.software = enc;
     res.json(obj);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


     /*if (key === "x-forwarded-for" || key === "user-agent" || key === "accept-language") {  
      obj.ipaddress = agent[key];

    }*/


/*

app.use(requestIp.mw())

app.use(function(req, res, next) {      
       obj.ipaddress = req.clientIp;
       next();
   });

app.get('/:api/whoami', function(req, res, next) {
     var lan = req.acceptsLanguages();
     var enc = req.headers;
     obj.language = lan[0];
     obj.software = enc;
     res.json(obj);
});

*/





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
