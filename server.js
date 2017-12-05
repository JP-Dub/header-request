// init project
var express = require('express');
var requestIp = require('request-ip');
var app = express();

var obj = {
  "ipaddress": "null",
  "language": "null",
  "software": "null"
  };

// allows use of the "public" folder
app.use(express.static('public'));

// publishes the index.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// app.use, middleware used by npm "request-ip
app.use(requestIp.mw())

app.use(function(req, res, next) {      
       obj.ipaddress = req.clientIp;// returns user IP address
       next();
   });

app.get('/:api/whoami', function(req, res, next) {
  var language = req.acceptsLanguages();//returns user language array     
  var agent = req.headers;
  var reg = /\((.*?)\)/i;
     
  obj.language = language[0];  
    
  for(var key in agent) { 
    if (key === "user-agent") {
      var user = agent[key].match(reg);
      obj.software = user[1];
    }
      /* 
      // intially used header and manually parsed data to return required data
      switch (key){
        case "x-forwarded-for":
          obj.ipaddress = agent[key];
          break;
        case "user-agent":
          var user = agent[key].match(reg);
          obj.software = user[1];
          break;
        case "accept-language":
          obj.language = agent[key];
          break;
       }
       */
    }
    
     res.json(obj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});