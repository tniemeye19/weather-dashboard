// Initialize variables from html for use in js
var searchBtnEl = document.querySelector("#city-search");
var cityEl = document.querySelector("#city");
var searchedCityName = document.querySelector("#searched-city-name");
var previousSearchContainerEl = document.querySelector("#previous-search-btns");
var updatedForecastEl = document.querySelector("#updated-forecast");
var currentDateEl = document.querySelector("#current-date");
var currentWeatherIconEl = document.querySelector("#weather-icon");
var currentTempEl = document.querySelector("#temperature-value");
var currentHumidityEl = document.querySelector("#humidity-value");
var currentWindSpeedEl = document.querySelector("#wind-speed-value");
var currentUVIndexEl = document.querySelector("#uv-index-value");
var forecastContainerEl = document.querySelector("#weather-forecast-container");
forecastContainerEl.addClass = "row";

// create function to get the weather
function getWeather(city) {

    var apiKey = '91d4161a1433d45e7d7152f7adf492fd'

    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    // this fetch refers to the lat/lon
    fetch(requestUrl)
        .then(function(response) {
           return response.json()
        })
        .then(function(data){
            if (data.length === 0) {
                alert("Please check your spelling!");

            } else {

            }
            console.log("location", data)
            var lon = data[0].lon
            var lat= data[0].lat

            var cityWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
            // using lat/lon, search for weather
            fetch(cityWeatherUrl)
                .then(function(response) {
                    return response.json()
                })
                .then(function(data) {
                    console.log("weather", data);

                    // set weather icon for current day
                    var currentWeatherIcon = data.current.weather[0].icon;
                    currentWeatherIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png");
                   
                    // set data for current day
                    currentTempEl.innerHTML = data.current.temp + " °F";
                    currentHumidityEl.innerHTML = data.current.humidity + " %";
                    currentWindSpeedEl.innerHTML = data.current.wind_speed + " mph";

                    // set uv index logic for current day
                    currentUVIndexEl.innerHTML = data.current.uvi; 
                    if (data.current.uvi <= 3) {
                        currentUVIndexEl.style.backgroundColor = "green";
                    } else if (data.current.uvi > 3 && data.current.uvi <= 6) {
                        currentUVIndexEl.style.backgroundColor = "yellow";
                    } else if (data.current.uvi > 6 && data.current.uvi <= 8) {
                        currentUVIndexEl.style.backgroundColor = "orange";
                    } else {
                        currentUVIndexEl.style.backgroundColor = "red";
                    }

                    // loop through creating the card for each data value needed for card
                    function addCards() {

                        // clear out any info when search initiated again
                        forecastContainerEl.innerHTML = "";

                        // dynamically created elements for 5 day forecast
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
                            var currentDate = moment().add(i + 1, 'days').format("(MM/DD/YYYY)");
                            cardTitle.innerHTML = currentDate;

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

                    addCards();

                })
        })
}

function searchForCityClick(event) {
    event.preventDefault();

    forecastContainerEl.innerHTML = ""; 

    // get value from input and set to appropriate html element
    var searchedCity = cityEl.value;
    getWeather(searchedCity);
    searchedCityName.innerHTML = searchedCity;
    console.log(searchedCityName);

    // get current date and set to appropriate hmtl element
    var currentDate = moment().format("(MM/DD/YYYY)");
    console.log("Current date: ", currentDate);
    currentDateEl.innerText = currentDate;

    // for each previous search, create new div that shows what was searched for
    var lastSearchEl = document.createElement("div");
    lastSearchEl.setAttribute("id", "previous-search");
    lastSearchEl.innerHTML = searchedCity;
    previousSearchContainerEl.appendChild(lastSearchEl);

    var cityArr = [];
    localStorage.setItem('city', JSON.stringify(searchedCity));
    
    function renderCityData() {
        var userCityInput = localStorage.getItem('city')

    }

    renderCityData();
}

// when search button is clicked, run this function
searchBtnEl.addEventListener("click", searchForCityClick);


