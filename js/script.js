var searchBar = $("#searchBar").value;
var currentDiv = $("<div class='row'></div>");
currentDiv.setAttribute("id", "current");

$(document).ready(function() {

    var apiKey = " ";

    function oneDay(city) {
        //One day api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
        var oneDayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

        $.ajax({
            url: oneDayUrl,
            method: "GET"

        }).then(function(weartherConditions) {

            var currentCity = $("<div class='col-12'></div>");
            currentCity.textContent = response.name;
            currentDiv.append(currentCity);
            var currentWind = $("<div class='col-12'></div>");
            currentWind.textContent = response.wind.speed;
            currentDiv.append(currentWind);
            var currentHumidity = $("<div class='col-12'></div>");
            currentHumidity.textContent = response.main.humidity;
            currentDiv.append(currentHumidity);
            // Convert the temp to fahrenheit
            var currentTemp = $("<div class='col-12'></div>");
            currentTemp.textContent = (response.main.temp - 273.15) * 1.80 + 32;;
            currentDiv.append(currentTemp);

        });

        $.ajax({
            url: oneDayUrl,
            method: "GET"

        }).then(function(lonAndLat) {

            var lon = lonAndLat.coord.lon;

            var lat = lonAndLat.coord.lat;

            //lon and lat => uv (another ajax request) 
            var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;


            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function(uvObj) {


                // Convert the temp to fahrenheit
                // var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            });

         });

     }

     function fiveDay(city) {

         var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

         $.ajax({
             url: url,
             method: "GET"
         }).then(function(response) {

            for (var i = 0; i < 5; i++) {

              var fiveDayDiv = $("#fiveDayWeather");

              var fiveDayForecast = $("<div>");

              fiveDayForecast.setAttribute("class", "col-sm-2 weather");

              fiveDayForecast.setAttribute("id", "weather" + i);

              fiveDayForecast.textContent = moment(response.list[i * 8].dt_txt).format("lll");

              fiveDayDiv.append(fiveDayForecast);


              console.log(response.list[i * 8].main.temp);

              console.log(moment(response.list[i * 8].dt_txt).format("lll"));

             }

         });

         //3. get all your data, cityname, lon lat, temp hum, wind
         //4. dynamically append everything together
         //update this into a forloop
         //run a for loop and mult i*8 =24hrs

     }


 });

 $("#searchBtn").click(function(event){

  var searchBar = $("#searchBar")
  event.preventDefault();

  if (searchBar != null) {
      var lastCity = $("<button class='btn btn-light city></button>");
      lastCity.attr("id", searchBar);

      lastCity.textContent = searchBar.val();

      $("#oldSearch").append(searchBar);
  } else {
      alert("Please type in a city name");
  }

  searchedCity.push(searchedCity);

  oneDay();

});