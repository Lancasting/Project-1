// Sams stormglass API key 8aca6f50-7acf-11ea-98e7-0242ac130002-8aca6ff0-7acf-11ea-98e7-0242ac130002
// Sams Google API key AIzaSyA60E-7YODoqYm16Aanxh8PoR4OXJugr_U
// $(document).ready(function(){

// var queryURLStorm = "https://api.stormglass.io/v2/weather/point";
// var queryURLGoogle = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY";
// var searchresults = $()
// $("search-button").on(click, function() {
// $.ajax({
//     url: queryURLStorm, queryURLGoogle,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//   })
// })

// }) 


// This fetches the data from our storm glass API
var APIKey="4470429a-793b-11ea-98e7-0242ac130002-4470434e-793b-11ea-98e7-0242ac130002"

const lat = 45.7;
const lng = -6.0;
const params = [
  'secondarySwellDirection', 'secondarySwellHeight', 'secondarySwellPeriod',
  'windWaveDirection', 'windWaveHeight', 'windWavePeriod',
  'swellDirection', 'swellHeight', 'swellPeriod',
  'waveDirection', 'waveHeight', 'wavePeriod',
  'windDirection', 'windSpeed', 'gust',
  'waterTemperature',
].join(',');

fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
  headers: {
    'Authorization': APIKey
  }
}).then((response) => response.json()).then((jsonData) => {
  console.log(jsonData); //displays object data in console
  
});

function initMap() {
  var uluru = {lat: -25.344, lng: 131.036}
  var map = new google.maps.Map(
  document.getElementById('map'), {zoom: 4, center: uluru});
  var marker = new google.maps.Marker({position: uluru, map: map});
}