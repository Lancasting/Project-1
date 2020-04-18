// Sams Stormglass API key: 8aca6f50-7acf-11ea-98e7-0242ac130002-8aca6ff0-7acf-11ea-98e7-0242ac130002
// Sams Google API key: AIzaSyA60E-7YODoqYm16Aanxh8PoR4OXJugr_U
// Jonathan's Stormglass API key: f08e28ca-793c-11ea-a900-0242ac130002-f08e2a5a-793c-11ea-a900-0242ac130002
// Jordan's Stormglass API key: 4470429a-793b-11ea-98e7-0242ac130002-4470434e-793b-11ea-98e7-0242ac130002

// *Push all checked item boxes into array*
// var checkboxes = document.querySelectorAll("input[type=checkbox]");
// var submit = document.getElementById("submit");

// function getChecked() {
//   var userParams = [];

//   for (var i = 0; i < checkboxes.length; i++) {
//     var checkbox = checkboxes[i];
//     if (checkbox.checked) userParams.push(checkbox.value);
//   }

//   return userParams;
// }

// submit.addEventListener("click", function () {
//   var checked = getChecked();
//   console.log(checked);
// });

// Stormglass API call
function newfunction(lat, lng) {

  var APIKey = "8aca6f50-7acf-11ea-98e7-0242ac130002-8aca6ff0-7acf-11ea-98e7-0242ac130002"

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
    for (let i = 0; i < 24; i++) {
      // use for 6 hour or 12 or 24
      let dateArr = jsonData.hours[i].time.split('T')
      dateArrTime = dateArr[1].substring(0, dateArr[1].length - 9); // removes strings from time to display as "00:00".
      dateArrDate = moment(dateArr[0]).format("MMM Do YYYY"); // changes date format to month/day/year
      let waveHeightFt = jsonData.hours[i].waveHeight.icon * 3.281 //convert from meters to ft

      // console.log(jsonData.hours[i]); //logs object data for [i]

      let cardBody = $("<div>").addClass("card-body card results-cards col-md-4")
      let dateEl = $("<p>").addClass("title-text").text(dateArrDate);
      let timeEl = $("<p>").addClass("title-text").text(dateArrTime);
      let watertemp = $("<p>").addClass("card-subtitle").text("Water temp: " + jsonData.hours[i].waterTemperature.noaa + " °C");
      let windspeed = $("<p>").addClass("card-subtitle").text("Wind speed: " + jsonData.hours[i].windSpeed.icon + " (m/s)");
      let gustEl = $("<p>").addClass("card-subtitle").text("Gust: " + jsonData.hours[i].gust.noaa + " (m/s)")
      let windDirectionEl = $("<p>").addClass("card-subtitle").text("Wind direction: " + jsonData.hours[i].windDirection.icon)
      let wavePeriodEl = $("<p>").addClass("card-subtitle").text("Wave period: " + jsonData.hours[i].wavePeriod.icon)
      let waveHeightEl = $("<p>").addClass("card-subtitle").text("Wave height: " + waveHeightFt + " ft")
      let swellPeriodEl = $("<p>").addClass("card-subtitle").text("Swell period: " + jsonData.hours[i].swellPeriod.icon)
      let swellHeightEl = $("<p>").addClass("card-subtitle").text("Swell height: " + jsonData.hours[i].swellHeight.icon + " meters")
      let swellDirectionEl = $("<p>").addClass("card-subtitle").text("Swell  direction: " + jsonData.hours[i].swellDirection.icon)
      let windWavePeriodEl = $("<p>").addClass("card-subtitle").text("Wind wave period: " + jsonData.hours[i].windWavePeriod.icon)
      let windWaveHeightEl = $("<p>").addClass("card-subtitle").text("Wind wave height: " + jsonData.hours[i].windWaveHeight.icon + " meters")
      let windWaveDirectionEl = $("<p>").addClass("card-subtitle").text("Wind wave direction: " + jsonData.hours[i].windWaveDirection.icon)
      let secondarySwellPeriodEl = $("<p>").addClass("card-subtitle").text("Secondary swell period: " + jsonData.hours[i].secondarySwellPeriod.noaa)
      let secondarySwellHeightEl = $("<p>").addClass("card-subtitle").text("Secondary swell height: " + jsonData.hours[i].secondarySwellHeight.noaa)
      let secondarySwellDirectionEl = $("<p>").addClass("card-subtitle").text("Secondary swell direction: " + jsonData.hours[i].secondarySwellDirection.noaa + " meters")

      let difficulty = ""
      if (waveHeightFt < 5) {
        difficulty = "beginner"

      }
      else if (waveHeightFt > 5 && waveHeightFt < 12) {
        difficulty = "intermediate"
      }
      else {
        difficulty = "advanced"
      }

      let progress = $("<div>").addClass("progress");
      let progressBar = $("<div>").addClass("progress-bar").attr("style", "width: " + waveHeightFt * 10 + "%").text(difficulty);

      // append object data to results 
      $(".results").append(cardBody.append(dateEl, timeEl, watertemp, windspeed, gustEl, windDirectionEl, wavePeriodEl, waveHeightEl, swellPeriodEl, swellHeightEl, swellDirectionEl, windWavePeriodEl, windWaveHeightEl, windWaveDirectionEl, secondarySwellPeriodEl, secondarySwellHeightEl, secondarySwellDirectionEl, progress.append(progressBar)));

    }

    // console.log(fiveDay)
    // console.log(jsonData); //displays object data in console

  });

}

// function to clear results after each click
function renderButtons() {
  $(".results").empty();
}

// Google Maps API
function initMap() {
  var myLatlng = { lat: 37.7749, lng: -122.4194 };

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
    // console.log(coordsArr);
    var lat = coordsArr[0];
    var lng = coordsArr[1];

    // make api call here to take in lat lng
    newfunction(lat, lng)
    renderButtons();

  });
}