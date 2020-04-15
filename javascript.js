// Sams Stormglass API key: 8aca6f50-7acf-11ea-98e7-0242ac130002-8aca6ff0-7acf-11ea-98e7-0242ac130002
// Sams Google API key: AIzaSyA60E-7YODoqYm16Aanxh8PoR4OXJugr_U
// Jonathan's Stormglass API key: f08e28ca-793c-11ea-a900-0242ac130002-f08e2a5a-793c-11ea-a900-0242ac130002
// Jordan's Stormglass API key: 4470429a-793b-11ea-98e7-0242ac130002-4470434e-793b-11ea-98e7-0242ac130002

// open weather API to grab latitude and longitude coordinates

// var APIKeyOpenWeather = "&appid=d67d379f19decbcad97f1f7549ca59f8"
// // var city = $("#search-text").val()
// // console.log(city)
// var city = "San Clemente"

// var queryURLOpenWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + APIKeyOpenWeather

// $.ajax({
//   url: queryURLOpenWeather,
//   method: "GET"
// }).then(function (response) {
//   console.log(response);
//   console.log(response.coord.lon)
//   console.log(response.coord.lat);;
//   var lng = response.coord.lon
//   console.log(lng);
//   var lat = response.coord.lat
//   console.log(lat);
// })

// This fetches the data from our storm glass API
function newfunction(lat, lng) {

  var APIKey = "4470429a-793b-11ea-98e7-0242ac130002-4470434e-793b-11ea-98e7-0242ac130002"
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
    for (let i = 0; i < 2; i++) {
      // use for 6 hour or 12 or 24
      //let dateArr = jsonData.hours[i].time.split('T')
      // console.log(dateArr);
      // if (!fiveDay[dateArr[0]]) {
      //   fiveDay[dateArr[0]] = jsonData.hours[i];
      // }

      console.log(jsonData.hours[i]);

      let cardBody = $("<div>").addClass("card-body")
      let watertemp = $("<p>").addClass("card-subtitle").text("Water temp: " + jsonData.hours[i].waterTemperature.noaa);
      $(".results").append(cardBody.append(watertemp));
      
      let windspeed = $("<p>").addClass("card-subtitle").text("Wind speed: " + jsonData.hours[i].windSpeed.icon + " MPH");
      $(".results").append(cardBody.append(windspeed));

    }
    console.log(fiveDay)
    console.log(jsonData); //displays object data in console

  });

}

function initMap() {
  var myLatlng = { lat: -25.363, lng: 131.044 };

  var map = new google.maps.Map(
    document.getElementById('map'), { zoom: 4, center: myLatlng });

  // Create the initial InfoWindow.
  var infoWindow = new google.maps.InfoWindow(
    { content: 'Click the map to get Lat/Lng!', position: myLatlng });
  infoWindow.open(map);

  // Configure the click listener.
  map.addListener('click', function (mapsMouseEvent) {
    // Close the current InfoWindow.
    infoWindow.close();

    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
    infoWindow.setContent(mapsMouseEvent.latLng.toString());
    infoWindow.open(map);
    var coords = mapsMouseEvent.latLng.toString().substring(1);
    var coordsArr = coords.substring(0, coords.length - 1).split(', ');
    console.log(coordsArr);
    var lat = coordsArr[0];
    var lng = coordsArr[1];

    // make api call here to take in lat lng
    newfunction(lat, lng)

  });
}