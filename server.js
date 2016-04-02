'use strict';
const config = require('./config/config');
const Mongoose = require('mongoose').connect(config.dbURI);
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.engine('html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Log an error if the mongoose connection to mongodb conection fails
Mongoose.connection.on('error', (error) => {
	console.log(`MongoDB Error: ${error}`);
});

const betModel = new Mongoose.Schema({
	userName: String,
	friendName: String,
	date: String
});

// Turn schema into a usable model
let bet = Mongoose.model('betModel', betModel);

app.get('/', function(req, res, next) {
	res.render('index');
});

app.get('/bets', function(req, res, next) {
	console.log('getting bets');
  	Mongoose.model("betModel").find('Rob', function(err, bets) {
	    console.log(bets);
	    res.send(bets);
  	});
});

app.post('/bets', function(req, res, next) {
	console.log('posting bet');
	const userName = req.body.userName;
	const friendName = req.body.friendName;
	const date = req.body.date;
	      
	const newBet = new bet(); 

	newBet.userName = userName; 
	newBet.friendName = friendName;
	newBet.date = date; 
	    
	newBet.save(function(err) {
	    if(!err) {
	        res.status(201).json({message: "Bet created for: " + newBet.date });   
	    } else {
	        res.status(500).json({message: "Could not create bet. Error: " + err});
	    }

	});
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

const port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('server running on port ' + port);
});