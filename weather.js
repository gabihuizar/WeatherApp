$(document).ready(function(){
    
  var latitude;
  var longitude;
  var temp;
  var isFahr; 
  
   function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showWeather);
      } else {
          $('#location').html("Geolocation is not supported by this browser.");
      }
   
  }
  
  
  function showWeather(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude; 
    /*weather api call*/
    var url = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + latitude + "&lon=" + longitude + "&APPID=d1e0afcb6a36e038a53695a1dfab650c";
    /*gets all weather data*/
    $.getJSON(url, function(json) {
      temp = Math.round(json.main.temp * (9/5) - 459.67); /*converts kelvin to fahr*/
      $("#city").html(json.name + ", " + json.sys.country);
      $("#temp").html(temp + "&deg;F");
      
      isFahr = true;
      
      var description = json.weather[0].description;
      $("#weatherdescription").html(description);
      
      var weatherImg ;
      
      switch(description) {
        case "clear sky": weatherImg = "http://res.cloudinary.com/gabihuizar/image/upload/v1458965362/sunny.png";
          break;
        case "few clouds": weatherImg = "http://res.cloudinary.com/gabihuizar/image/upload/v1458965361/partlycloudy.png";
          break;
        case "scattered clouds": weatherImg = "http://res.cloudinary.com/gabihuizar/image/upload/v1458965362/overcast.png";
          break;
        case "broken clouds": weatherImg = "http://res.cloudinary.com/gabihuizar/image/upload/v1458965362/overcast.png";
          break;
        case "shower rain": weatherImg = "http://res.cloudinary.com/gabihuizar/image/upload/v1458965361/showers.png";
          break;
        case "rain": weatherImg = "http://res.cloudinary.com/gabihuizar/image/upload/v1458965362/rain.png";
          break;
        case "light rain": weatherImg = "http://res.cloudinary.com/gabihuizar/image/upload/v1458965362/rain.png";
          break;
        case "thunderstorm": weatherImg = "http://res.cloudinary.com/gabihuizar/image/upload/v1458965362/thunderstorm.png";
          break;
        case "snow": weatherImg = "http://res.cloudinary.com/gabihuizar/image/upload/v1458965361/snow.png";
          break;
        case "mist": weatherImg = "http://res.cloudinary.com/gabihuizar/image/upload/v1458965361/cloudynight.png";
          break;
        default: weatherImg = "http://res.cloudinary.com/gabihuizar/image/upload/v1458965361/cloudynight.png";
          break;
          
          
          
      };
      $("#weatherImg").attr('src', weatherImg);
      
       $("#toggle a").click(function(){ /*link changes fahr to celsius*/
        if(isFahr) {
          isFahr = false;
          temp = Math.round(json.main.temp - 273.15) + " &deg;C";
          $("#temp").html(temp);
          $("#toggle a").html("Fahrenheit Me!");
        }
        else {
          isFahr = true;
          temp = Math.round(json.main.temp * (9/5) - 459.67) + " &deg;F";
          $("#temp").html(temp);
          $("#toggle a").html("Celsius Me!");
    }
  })
      

    }); /*end of JSON*/
    
  }; /*end of showWeather*/
  getLocation();
  
 
   
    
 
  }); /*end of document*/
