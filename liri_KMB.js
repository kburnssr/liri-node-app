var nodeSpotifyApi = require("node-spotify-api");

var axiosApi = require("axios");

require("dotenv").config();

var fs = require('fs');

var keys = require("./keys.js");

var spotify = new nodeSpotifyApi(keys.spotify);

var transactionType = process.argv[2];



var concertThis = function (artist) {
    // Run the axios.get function...
    // The axios.get function takes in a URL and returns a promise (just like $.ajax)
    axiosApi
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
//            console.log(response.data);
            for (i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log(response.data[i].datetime + "\n");
            }
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}
var spotifyThis = function (songName) {
    spotify
        .search({ type: 'track', query: songName })
        .then(function (response) {
//            console.log(response);
            console.log("songname",response.tracks.items[0].name);
            console.log("albumname",response.tracks.items[0].album.name);
            for(var i = 0; i < response.tracks.items[0].artists.length; i++){
                console.log("artist",i+1,response.tracks.items[0].artists[i].name);
            }
 //           console.log("artistname",response.tracks.items[0].artists[0].name);
            console.log("previewurl",response.tracks.items[0].preview_url)
        })
        .catch(function (err) {
            console.log(err);
        });
}
var movieThis = function (movieName) {
        // Run the axios.get function...
        // The axios.get function takes in a URL and returns a promise (just like $.ajax)
        axiosApi
            .get("http://www.omdbapi.com/?apikey=trilogy&t="+movieName)
        .then(function (response) {
//            console.log(response.data);
            console.log("movieTitle",response.data.Title);
            console.log("year",response.data.Year);
            console.log("country",response.data.Country);
            console.log("actors",response.data.Actors);
            console.log("Plot",response.data.Plot);
            console.log("language",response.data.Language);
            console.log("IMDBRating",response.data.imdbRating);
            if(response.data.Ratings.length > 0){
                console.log("Rotten Tomatoes",response.data.Ratings[0].Value)
            }

        })
        .catch(function (err) {
            console.log(err);
        });
}

var subject = process.argv[3];

if (transactionType === "do-what-it-says") {
    var readRandomFile = fs.readFileSync('random-3.txt','UTF8');
    transactionType = readRandomFile.split(',')[0];
    subject = readRandomFile.split(',')[1];
    console.log(readRandomFile.split(','));
}

if (transactionType === "concert-this") {
    concertThis(subject);
} else if (transactionType === "spotify-this-song") {
    spotifyThis(subject);
} else if (transactionType === "movie-this") {
    movieThis(subject);
}
