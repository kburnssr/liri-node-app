var nodeSpotifyApi = require("node-spotify-api");

var axiosApi = require("axios");

require("dotenv").config();

var fs = require('fs');

var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);

var transactionType = process.argv[2];


var artist = process.argv[3];

var concertThis = function(artist){
// Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)
axiosApi
  .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    for(i=0; i<response.data.length; i++){
    console.log(response.data[i].venue.name);
    console.log(response.data[i].venue.city + ", " + response.data[i].venue.country);
    console.log(response.data[i].datetime + "\n");
    }
  })
  .catch(function(error) {
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

if(transactionType === "concert-this"){
    concertThis(artist);
}
