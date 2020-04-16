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


// Push all checked item boxes into array

var checkboxes = document.querySelectorAll("input[type=checkbox]");
var submit = document.getElementById("submit");

function getChecked() {
  var userParams = [];

  for (var i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];
    if (checkbox.checked) userParams.push(checkbox.value);
  }

  return userParams;
}

submit.addEventListener("click", function () {
  var checked = getChecked();
  console.log(checked);
});

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
      let dateArr = jsonData.hours[i].time.split('T')
      console.log(dateArr);
      console.log(dateArr[1]) //consoles time

      dateArrTime = dateArr[1].substring(0, dateArr[1].length - 9); //removes strings from time to display as "00:00". can be used for easier conversion to MST
      console.log(dateArrTime);
      dateArrDate = moment(dateArr[0]).format("MMM Do YYYY"); // changes date format to month/day/year
      // if (!fiveDay[dateArr[0]]) {
      //   fiveDay[dateArr[0]] = jsonData.hours[i];
      // }

      console.log(jsonData.hours[i]);

      let cardBody = $("<div>").addClass("card-body")
      let dateEl = $("<p>").addClass("title-text").text(dateArrDate); // date
      let timeEl = $("<p>").addClass("title-text").text(dateArrTime); // time
      let watertemp = $("<p>").addClass("card-subtitle").text("Water temp: " + jsonData.hours[i].waterTemperature.noaa);
      let windspeed = $("<p>").addClass("card-subtitle").text("Wind speed: " + jsonData.hours[i].windSpeed.icon + " MPH");
      let gustEl = $("<p>").addClass("card-subtitle").text("Gust: " + jsonData.hours[i].gust.noaa)
      let windDirectionEl = $("<p>").addClass("card-subtitle").text("Wind direction: " + jsonData.hours[i].windDirection.icon)
      let wavePeriodEl = $("<p>").addClass("card-subtitle").text("Wave period: " + jsonData.hours[i].wavePeriod.icon)
      let waveHeightEl = $("<p>").addClass("card-subtitle").text("Wave height: " + jsonData.hours[i].waveHeight.icon)
      let swellPeriodEl = $("<p>").addClass("card-subtitle").text("Swell period: " + jsonData.hours[i].swellPeriod.icon)
      let swellHeightEl = $("<p>").addClass("card-subtitle").text("Swell height: " + jsonData.hours[i].swellHeight.icon)
      let swellDirectionEl = $("<p>").addClass("card-subtitle").text("Swell  direction: " + jsonData.hours[i].swellDirection.icon)
      let windWavePeriodEl = $("<p>").addClass("card-subtitle").text("Wind wave period: " + jsonData.hours[i].windWavePeriod.icon)
      let windWaveHeightEl = $("<p>").addClass("card-subtitle").text("Wind wave height: " + jsonData.hours[i].windWaveHeight.icon)
      let windWaveDirectionEl = $("<p>").addClass("card-subtitle").text("Wind wave direction: " + jsonData.hours[i].windWaveDirection.icon)
      let secondarySwellPeriodEl = $("<p>").addClass("card-subtitle").text("Secondary swell period: " + jsonData.hours[i].secondarySwellPeriod.noaa)
      let secondarySwellHeightEl = $("<p>").addClass("card-subtitle").text("Secondary swell height: " + jsonData.hours[i].secondarySwellHeight.noaa)
      let secondarySwellDirectionEl = $("<p>").addClass("card-subtitle").text("Secondary swell direction: " + jsonData.hours[i].secondarySwellDirection.noaa)

      // append object data to results 
      $(".results").append(cardBody.append(dateEl, timeEl, watertemp, windspeed, gustEl, windDirectionEl, wavePeriodEl, waveHeightEl, swellPeriodEl, swellHeightEl, swellDirectionEl, windWavePeriodEl, windWaveHeightEl, windWaveDirectionEl, secondarySwellPeriodEl, secondarySwellHeightEl, secondarySwellDirectionEl));

    }
    console.log(fiveDay)
    console.log(jsonData); //displays object data in console

  });

}

// function to clear results after each click
function renderButtons() {
  $(".results").empty();
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
    renderButtons();

  });
}