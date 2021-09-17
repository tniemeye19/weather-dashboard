var searchBtnEl = document.querySelector("#city-search");
var cityEl = document.querySelector("#city");

function getWeather(city) {

    var apiKey = '91d4161a1433d45e7d7152f7adf492fd'

    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`

    fetch(requestUrl)
        .then(function(response) {
           return response.json()
        })
        .then(function(data){
            console.log("location", data)
        //     var lon = data[0].lon
        //     var lat= data[0].lat

        //     var cityWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
        
        //     fetch(cityWeatherUrl)
        //         .then(function(response) {
        //             return response.json()
        //         })
        //         .then(function(data) {
        //             console.log(data);
        //         })
        })

}

searchBtnEl.addEventListener("click", function(event) {
    event.preventDefault();
    var searchedCity = cityEl.value;
    getWeather(searchedCity);

});
