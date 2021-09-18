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

var forecastContainerEl = document.querySelector("#weather-forecast-container");
forecastContainerEl.addClass = "row";

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

                    var currentWeatherIcon = data.current.weather[0].icon;
                    currentWeatherIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png");
                   
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


                    // loop through creating the card for each data value needed for card

                    function addCard() {

                        for (i= 0; i <=4; i++) {
                            // create a new card
                            var newCard = document.createElement("div");
                            newCard.className = "card";
                            newCard.setAttribute("id", "card-style");
                            forecastContainerEl.appendChild(newCard);

                            // create the card body for card
                            var cardBody = document.createElement("div");
                            cardBody.className = "card-body";

                            // create title element for card
                            var cardTitle = document.createElement("h5");
                            cardTitle.className = "day-title";
                            cardTitle.innerHTML = "";

                            // create img element for card
                            var cardIcon = document.createElement("img");
                            cardIcon.className = "day-icon";
                            var dailyWeatherIcon = data.daily[i].weather[0].icon;
                            cardIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + dailyWeatherIcon + "@2x.png");


                            // create temp element for card
                            var cardTemp = document.createElement("p");
                            cardTemp.className = "day-temp";
                            cardTemp.innerHTML = "Temp: " + data.daily[i].temp.max + " °F";

                            // create wind element for card
                            var cardWind = document.createElement("p");
                            cardWind.className = "day-wind";
                            cardWind.innerHTML = "Wind: " + data.daily[i].wind_speed + "mph";
                            console.log(data.daily[i].wind_speed);

                            // create humidity element for card
                            var cardHumidity = document.createElement("p");
                            cardHumidity.className = "day-humidity";
                            cardHumidity.innerHTML = "Humidity: " + data.daily[i].humidity + "%";


                            // append elements to each card
                            newCard.appendChild(cardBody);
                            cardBody.appendChild(cardTitle);
                            cardBody.appendChild(cardIcon);
                            cardBody.appendChild(cardTemp);
                            cardBody.appendChild(cardWind);
                            cardBody.appendChild(cardHumidity);

                        }


                    }
                    addCard();

                })
        })

}

searchBtnEl.addEventListener("click", function(event) {
    event.preventDefault();
    var searchedCity = cityEl.value;
    getWeather(searchedCity);
    searchedCityName.innerHTML = searchedCity;



});
