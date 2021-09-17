var searchBtnEl = document.querySelector("#city-search");
var cityEl = document.querySelector("#city");
var searchedCityName = document.querySelector("#searched-city-name");
var currentDateEl = document.querySelector("#currentDate");
var weatherIconEl = document.querySelector("#weather-icon");
var currentTempEl = document.querySelector("#temperature");
var currentHumidityEl = document.querySelector("#humidity");
var currentWindSpeedEl = document.querySelector("#wind-speed");
var currentUVIndexEl = document.querySelector("#uv-index");

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

                    currentTempEl.innerHTML = "Temperature: " + data.current.temp + "°F";
                    currentHumidityEl.innerHTML = "Humidity: " + data.current.humidity + "%";
                    currentWindSpeedEl.innerHTML = "Wind Speed: " + data.current.wind_speed + "MPH";
                    currentUVIndexEl.innerHTML = "UV-Index: " + data.current.uvi; 
                })
        })

}

searchBtnEl.addEventListener("click", function(event) {
    event.preventDefault();
    var searchedCity = cityEl.value;
    getWeather(searchedCity);
    searchedCityName.innerHTML = searchedCity;

});
