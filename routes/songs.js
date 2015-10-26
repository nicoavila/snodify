var express = require('express');
var https = require('https');
var router = express.Router();

//Spotify Endpoint
var spotify_endpoint = 'https://api.spotify.com/v1/search?q=';

router.get('/', function(req, res){
	
	var song_query = req.query.search_input;
	console.log(song_query);

	var optionsget = {
	    host : 'api.spotify.com', // here only the domain name
	    port : 443,
	    path : '/v1/search?type=track&q='+song_query, // the rest of the url with parameters if needed
	    method : 'GET' // do GET
	};

	console.log(optionsget);

	var reqGet = https.request(optionsget, function(res) {
	    console.log("statusCode: ", res.statusCode);

	    res.on('data', function(d) {
	        console.info('GET result:\n');
	        process.stdout.write(d);
	        console.info('\n\nCall completed');
	    });

	});

	reqGet.end();

	reqGet.on('error', function(e) {
	    console.error(e);
	});

});

module.exports = router;