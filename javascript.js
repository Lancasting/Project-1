// Sams stormglass API key 8aca6f50-7acf-11ea-98e7-0242ac130002-8aca6ff0-7acf-11ea-98e7-0242ac130002
// Sams Google API key AIzaSyA60E-7YODoqYm16Aanxh8PoR4OXJugr_U
$(document).ready(function(){

var queryURLStorm = "https://api.stormglass.io/v2/weather/point";
var queryURLGoogle = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY";
var searchresults = $()
$("search-button").on(click, function() {
$.ajax({
    url: queryURLStorm, queryURLGoogle,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  })
})

}) 







