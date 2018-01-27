/*Simple endpoint simulator to use when demoing actuation in AppIoT 
Set up a consumer on the Admin GUI and integrate with http post to following endpoint! */

var express = require('express');
var fs = require('fs');
var path = require('path');


//Initialize express 
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.post('/humidifier/:status', function (req,res,next) {
	const d = new Date(Date.now());
	const timestamp = d.toLocaleString();

	if (req.params.status != 0) {
		fs.appendFileSync('log.html', '<br></br><b>' + timestamp +  " from: " + req.header("Name") + " - " + '</b> Humidificateur allumé!');
		return res.send('Humidifier has been turned on');
		next();
	} 

	fs.appendFileSync('log.html', '<br></br><b>' + timestamp +  " from: " + req.header("Name") + " - " + '</b> Humidificateur éteint!');
	res.send('Humidifier has been turned off');
});


app.post('/heater/:status', function(req,res, next) {
	const d = new Date(Date.now());
	const timestamp = d.toLocaleString();

	if (req.params.status != 0) {
		fs.appendFileSync('log.html', '<br></br><b>' + timestamp +  " from: " + req.header("Name") + " - " + '</b> Chauffage allumé!');
		return res.send('Heater has been turned on');
		next();
	}
	
	fs.appendFileSync('log.html', '<br></br><b>' + timestamp +  " from: " + req.header("Name") + " - " + '</b> Chauffage éteint!');
	res.send('Heater has been turned off');
});

app.get('/log', function(req,res) {
	res.sendFile(path.resolve(__dirname, 'log.html'));
});

app.get('/exercise', function(req,res) {
	res.sendFile(path.resolve(__dirname, 'smart_home_exercise.pdf')); 
});

app.listen(port, () => console.log('Simulator app listening on port 3000!'));

