var searchBtnEl = document.querySelector("#city-search");
var cityEl = document.querySelector("#city");
var searchedCityName = document.querySelector("#searched-city-name");
var updatedForecastEl = document.querySelector("#updated-forecast");
var currentDateEl = document.querySelector("#currentDate");
var currentWeatherIconEl = document.querySelector("#weather-icon");
var currentTempEl = document.querySelector("#temperature-value");
var currentHumidityEl = document.querySelector("#humidity-value");
var currentWindSpeedEl = document.querySelector("#wind-speed-value");
var currentUVIndexEl = document.querySelector("#uv-index-value");
var dayOneForecastEl = document.querySelector("#day-one-forecast");
var dayTwoForecastEl = document.querySelector("#day-two-forecast");
var dayThreeForecastEl = document.querySelector("#day-three-forecast");
var dayFourForecastEl = document.querySelector("#day-four-forecast");
var dayFiveForecastEl = document.querySelector("#day-five-forecast");


function getWeather(city) {

    var apiKey = '91d4161a1433d45e7d7152f7adf492fd'

    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`

    fetch(requestUrl)
        .then(function(response) {
           return response.json()
        })
        .then(function(data){
            console.log("location", data)
            var lon = data[0].lon
            var lat= data[0].lat

            var cityWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
        
            fetch(cityWeatherUrl)
                .then(function(response) {
                    return response.json()
                })
                .then(function(data) {
                    console.log("weather", data);

                    var weatherIcon = data.current.weather[0].icon;
                    currentWeatherIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
                   
                    currentTempEl.innerHTML = data.current.temp + " °F";
                    currentHumidityEl.innerHTML = data.current.humidity + " %";
                    currentWindSpeedEl.innerHTML = data.current.wind_speed + " mph";

                    currentUVIndexEl.innerHTML = data.current.uvi; 
                    console.log("UVI", data.current.uvi);
                    if (data.current.uvi <= 3) {
                        currentUVIndexEl.style.backgroundColor = "green";
                    } else if (data.current.uvi > 3 && data.current.uvi <= 6) {
                        currentUVIndexEl.style.backgroundColor = "yellow";
                    } else if (data.current.uvi > 6 && data.current.uvi <= 8) {
                        currentUVIndexEl.style.backgroundColor = "orange";
                    } else {
                        currentUVIndexEl.style.backgroundColor = "red";
                    }

                    // 5 cards created for each day of forecast with unique id
                    var cardBody = document.createElement("div");
                    var cardTitle = document.createElement("h5");
                    var cardIcon = document.createElement("img");
                    var cardTemp = document.createElement("p");
                    var cardWind = document.createElement("p");
                    var cardHumidity = document.createElement("p");

                    // loop through creating the card for each data value needed for card
                    for (i= 0; i <=4; i++) {
                        
                    }


                })
        })

}

searchBtnEl.addEventListener("click", function(event) {
    event.preventDefault();
    var searchedCity = cityEl.value;
    getWeather(searchedCity);
    searchedCityName.innerHTML = searchedCity;



});
