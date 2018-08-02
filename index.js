// this file holds all function imports and setups

const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const assert = require('assert');

let settingsBill = require('./public/settings');
let setBill = settingsBill();

// let settings = {};
// let calculate = {};

let PORT = process.env.PORT || 3300;

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('home');
});

app.post('/settings', function(req, res) {

  let settings = {
    callVal: setBill.value_Call(req.body.callInput),
    smsVal: setBill.value_Sms(req.body.smsInput),
    warningVal: setBill.value_Warning(req.body.warningInput),
    criticalVal: setBill.value_Critical(req.body.criticalInput)
  }

  res.render('home', settings);

});

app.post('/action', function(req, res) {

  let type = req.body.billItemType;

  setBill.calculate_CallSms(type);
  setBill.calculate_Total();

  let calculate = {
    callTotal: setBill.calculatedCalls(),
    smsTotal: setBill.calculatedSms(),
    total: setBill.calculatedTotal()
  };

  res.render('home', calculate);

});
