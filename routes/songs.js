var express = require('express');
var https = require('https');
var router = express.Router();

router.get('/', function(req, res){
	
	var song_query = req.query.search_input;
	console.log("Canciones a buscar: " + song_query);

	//Configura las opciones del GET a la API de Spotify
	var optionsget = {
	    host : 'api.spotify.com',
	    port : 443,
	    path : '/v1/search?type=track&q='+song_query,
	    method : 'GET' 
	};

	//Realiza el GET a API de Spotify
	var spotiGet = https.request(optionsget, function(res) {
	    console.log("Código HTTP: ", res.statusCode);

	    res.on('data', function(sr) {
	        console.info('GET result:\n');
	        var respObj = JSON.parse(sr);
	        console.log(respObj);
	        console.info('\n\nCall completed');
	    });

	});
	spotiGet.end();

	//En caso de error, muestra el mensaje de error.
	spotiGet.on('error', function(e) {
		console.error("Error de comunicación con Spotify...");
	    console.error(e);
	});

});

module.exports = router;