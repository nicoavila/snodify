var express = require('express');
var https = require('https');
var spotify = require('spotify');
var router = express.Router();

router.get('/', function(req, res){
	
	var song_query = req.query.search_input;
	console.log("Canciones a buscar: " + song_query);

	//Busca en la cancion en Spotify
	spotify.search({ type: 'track', query: song_query}, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }

	    viewData = [];
	    tracks = data.tracks.items;
	    for(item in tracks){
	    	viewData.push({
	    		artist_name: tracks[item].artists[0].name,
	    		album_name: tracks[item].album.name,
	    		song_name: tracks[item].name,
	    		cover : tracks[item].album.images[0].url
	    	});
	    }

	    //Variable a vista
	    res.render("songs", { 
	    	tracks : viewData,
	    	query: song_query
	    });
	});

});

module.exports = router;