var url = require("url");
var express = require("express");
var authenticator = require("./authenticator");
var config = require("./config");
var app = express();

app.use(require("cookie-parser")());

app.get("/auth/twitter"), authenticator.redirectToTwitterLoginPage
);

app.get(url.parse(config.oauth_callback).path, function(req, res){
  authenticator.authenticate(req, res, function(err){
    if(err){
      console.log(err);
      res.sendStatus(401);
    } else {
      res.send("Authentication Successful");
    }
  });
});

app.listen(config.prt, function() {
  console.log("Listening on port " + config.port);
});
