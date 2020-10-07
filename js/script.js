/*
1. Create divs for search bar and lists, these lists should be active. Once clicked they will be shown on the weather.

<div class="container">
  <div class="row">
      <div class="list-group col-sm-3">
        <div class="input-group mb-3">
          <form id="searchArea">
            <input type="text" class="form-control" id="searchBar" placeholder="Search for a city" aria-label="Search Bar" aria-describedby="basic-addon2">
            <input id="searchBtn" type="submit" value="Search">
          </form>
          <div class="col-12" id="oldSearch">
              <button class="btn btn-light">hello</button>
              <button class="btn btn-light">hello</button>
              <button class="btn btn-light">hello</button>
              <button class="btn btn-light">hello</button>
              <button class="btn btn-light">hello</button>
          </div>
        </div>
      </div>
        <div class="col-sm-9">
          <div class="row" id="current">
            <div class="col-12">Date</div>
            <div class="col-12">Weather</div>
            <div class="col-12">Wind</div>
            <div class="col-12">UV</div>
          </div>
          <div class="row" id="fiveDayWeather">
            <div class="col-sm-2 weather"></div>
            <div class="col-sm-2 weather"></div>
            <div class="col-sm-2 weather"></div>
            <div class="col-sm-2 weather"></div>
            <div class="col-sm-2 weather"></div>
          </div>
      </div>
  </div>
</div>

3. Create another div to hold 5 day weather for searched city.

*/

$(document).ready(function() {

    var apiKey = "dd68b4014d2e771287d9ab99ce0ac633";

    var searchBar = $("#searchBar").value.trim();

    function oneDay(city) {
        //One day api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
        var oneDayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;


        $.ajax({
            url: oneDayUrl,
            method: "GET"

        }).then(function(weartherConditions) {

            // var currentCity = ;

            $(".city").html("<h1>" + response.name + " Weather Details</h1>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);

            // Convert the temp to fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        });

        $("#searchBtn").on("click", function(event) {

            event.preventDefault();

            if (searchBar != null) {
                var lastCity = $("<button class='btn btn-light city></button>");
                astCity.attr("id", searchBar);

                lastCity.textContent = searchBar.val();

                $("#oldSearch").append(searchBar);
            } else {
                alert("Please type in a city name");
            }

            // This line will grab the text from the input box


            searchedCity.push(searchedCity);

            oneDay();

        });

        $.ajax({
            url: oneDayUrl,
            method: "GET"

        }).then(function(lonAndLat) {

            var lon = lonAndLat.coord.lon;

            var lat = lonAndLat.coord.lat;

            //lon and lat => uv (another ajax request) 
            var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
            console.log(uvUrl)

            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function(uvObj) {

                console.log(uvObj.value)


                // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
                // $(".wind").text("Wind Speed: " + response.wind.speed);
                // $(".humidity").text("Humidity: " + response.main.humidity);

                // Convert the temp to fahrenheit
                // var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            });


        });

    }

    function fiveDay(city) {

        var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
        console.log(url);

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


    oneDay("Reno");
});