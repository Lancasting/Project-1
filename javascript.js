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




// open weater API to grab lat and long coordinates

var APIKeyOpenWeather = "&appid=d67d379f19decbcad97f1f7549ca59f8"
// var city = $("#search-text").val()
// console.log(city)
var city = "Santa Monica"

var queryURLOpenWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + APIKeyOpenWeather

$.ajax({
  url: queryURLOpenWeather,
  method: "GET"
}).then(function (response) {
  console.log(response);
  console.log(response.coord.lon)
  console.log(response.coord.lat);;
  var lng = response.coord.lon
  console.log(lng);
  var lat = response.coord.lat
  console.log(lat);
})





// This fetches the data from our storm glass API
var APIKey = "8aca6f50-7acf-11ea-98e7-0242ac130002-8aca6ff0-7acf-11ea-98e7-0242ac130002"

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
  let fiveDay = {}
  for (let i = 0; i < jsonData.hours.length; i++) {
    // use for 6 hour or 12 or 24
    let dateArr = jsonData.hours[i].time.split('T')
    console.log(dateArr);
    if (!fiveDay[dateArr[0]]) {
      fiveDay[dateArr[0]] = jsonData.hours[i];
    }
  }
  console.log(fiveDay)
  console.log(jsonData); //displays object data in console
<<<<<<< HEAD
  
  let fiveDay = {}
        for(let i = 0; i < jsonData.hours.length; i++) {
          let dateArr = jsonData.hours[i].time.split('T')
          if(!fiveDay[dateArr[0]]) {
            fiveDay[dateArr[0]] = jsonData.hours[i];
          }
        }
        // console.log(jsonData)
  
=======

>>>>>>> 22a4556d900fa43f28a811872422523fa9049848
});

function newfunction(lat,lng) {

}

      function initMap() {
        var myLatlng = {lat: -25.363, lng: 131.044};

        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 4, center: myLatlng});

        // Create the initial InfoWindow.
        var infoWindow = new google.maps.InfoWindow(
            {content: 'Click the map to get Lat/Lng!', position: myLatlng});
        infoWindow.open(map);

        // Configure the click listener.
        map.addListener('click', function(mapsMouseEvent) {
          // Close the current InfoWindow.
          infoWindow.close();

          // Create a new InfoWindow.
          infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
          infoWindow.setContent(mapsMouseEvent.latLng.toString());
          infoWindow.open(map);
          var coords = mapsMouseEvent.latLng.toString().substring(1);
          var coordsArr = coords.substring(0, coords.length - 1).split(', ');
          console.log(coordsArr);
          var lat = coordsArr[0];
          var lng = coordsArr[1];

// make api call here to take in lat lng
newfunction(lat,lng)
        });
      }

