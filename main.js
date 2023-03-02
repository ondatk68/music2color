import {SpotifyWebApi} from "./node_modules/spotify-web-api-js/src/spotify-web-api.js";

//var Spotify = require('spotify-web-api-js');
//var s = new Spotify();

var spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('YOUR ACCESS TOKEN');

spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err, data) {
    if (err) console.error(err);
    else console.log('Artist albums', data);
});


function music2color(music){
    colors = ["red", "green", "blue"]
    index = Math.round(Math.random() * 2)
    return colors[index]
}


function onSelected(event){
    console.log("fire");
    let music = document.getElementById('musicList').value;
    color = music2color(music);
    document.getElementById("color").style.color=color;
    document.getElementById("color").innerHTML=color;
}

window.addEventListener('DOMContentLoaded', function(){  
    document.getElementById('checkButton').addEventListener('click', onSelected);
});