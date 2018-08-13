const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const assert = require('assert');

let settingsBill = require('./public/settings');
let setBill = settingsBill();

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

    setBill.value_Call(req.body.callInput);
    setBill.value_Sms(req.body.smsInput);
    setBill.value_Warning(req.body.warningInput);
    setBill.value_Critical(req.body.criticalInput);

  res.render('home', setBill.returnAll());

});

app.post('/action', function(req, res) {

  let type = req.body.billItemType;

  setBill.calculate_CallSms(type);
  setBill.calculate_Total();

  res.render('home', setBill.returnAll());

});

app.post('/clear', function(req, res){
  res.render('home', setBill.clearAll());
});

app.get('/actions', function(req, res) {
  res.render('actions', { actions: setBill.returnAll().actions });
});

app.get('/actions:type', function(req, res){
  res.render('');
});
