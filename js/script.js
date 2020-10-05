console.log("hello");
/*
1. Create divs for search bar and lists, these lists should be active. Once clicked they will be shown on the weather.
    Search bar and list items should be on the L side, when screen is small, it will collapse
    List items only hold 5 cities that users can click on to go back to that city
<div class="container">
  <div class="row">
   <div class="list-group">
    <a href="#" class="list-group-item list-group-item-action"> Cras justo odio
    </a>
    <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
    <a href="#" class="list-group-item list-group-item-action">Morbi leo risus</a>
    <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
    <a href="#" class="list-group-item list-group-item-action">Vestibulum at eros</a>
    </div>
    <div class="col-sm-10">
      <div class="col-12 hourly"></div>
      <div class="col-12 sevenDay"></div>
    </div>
  </div>
</div>
2. Create a div to show searched city, should be on R side.
3. Create another div to should 5 day weather for searched city.
4. 


*/

$(document).ready(function () {


  var apiKey = "dd68b4014d2e771287d9ab99ce0ac633";
 
  
  function fiveDay(city){
    // 5 day api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
  
  
  var url= "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey;
  console.log(url)
  $.ajax({
    url: url,
    method: "GET"
  }).then(function(response) {
    for(var i=0;i<5;i++)
    {
    console.log(response.list[i*8].main.temp)
    console.log(moment(response.list[i*8].dt_txt).format("LLL"))
    }
   

    
  });

  //3. get all your data, cityname, lon lat, temp hum, wind
  //4. dynamically append everything together
  //update this into a forloop
    //run a for loop and mult i*8 =24hrs
  
  }

  function oneday(city){
     //One day api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
     var onedayurl= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
     console.log(onedayurl)
     $.ajax({
      url: onedayurl,
      method: "GET"
    }).then(function(response) {
     var lon = response.coord.lon;
     var lat = response.coord.lat;
       //lon and lat => uv (another ajax request) 
     var uvUrl="http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
     console.log(uvUrl)
     $.ajax({
      url: uvUrl,
      method: "GET"
    }).then(function(uvObj) {
      console.log(uvObj.value)
     
     
  
    });
     
    
    });

  }

  oneday("Reno");
});