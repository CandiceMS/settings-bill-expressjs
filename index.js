// this file holds all function imports and setups

// let settingsBill = require('./public/settings');
// let index = require('./public.index');

// are the 2 lines above unnecessary due to them being in public folder?
// .handlebars or .css/.html?
// DOM referencing and event emit?

const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const assert = require('assert');

// all code below to be adjusted...

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res) {
res.render('home');
});

let PORT = process.env.PORT || 3300;

app.listen(PORT, function(){
console.log('App starting on port', PORT);
});
