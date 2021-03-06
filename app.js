const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require("body-parser");

require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));


var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.DOMAIN});
 
var port = process.env.PORT || 8080;



app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/email', function(req, res){
	var data = {
  		from: req.body.from,
  		to: 'mddally@gmail.com',
  		subject: req.body.subject,
  		text: req.body.message
	};

	console.log(data);

	mailgun.messages().send(data, function (error, body) {
		if(error) console.log(error);
		else console.log(body);
	});

	res.redirect('/');
});


app.listen(port, () => console.log(`App running at http://localhost:${port}`));