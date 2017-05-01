'use strict'
const express = require( 'express' );
const nunjucks = require( 'nunjucks' );
const routes = require( './routes' );
const models = require( './models' );
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
const Sequelize = require('sequelize');
//var db = new Sequelize('postgres://localhost/wikistack');

const app = express(); // creates an instance of an express application

app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
app.set('view engine', 'html'); // have res.render work with html files
//nunjucks.configure('views', {noCache: true});
var env = nunjucks.configure('views', {noCache: true});

// logging middleware
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('*', function (req, res, next) {
  console.log(req.method, req.path);
  res.on('finish', function(){
  	console.log('responded: ', res.statusCode);
  })
  next();
});

app.use(express.static('public'));

app.use('/', routes);

app.use('/', function (req, res, next) {
  res.render( 'index' );
  next();
});

models.db.sync().then(function () {
    app.listen(3000, () => {
		console.log("Listening on port 3000")
	});
}).catch(console.error);

// var server = app.listen(3000, () => {
// 	console.log("Listening on port 3000")
// })