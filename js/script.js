//fetch weather data for Atlanta, GA
myKey = "c55febd7847bed4a6181dc26dc5779cf";
atlantaCoord = [33.75, -84.39];

//create function that returns JSON weather data when provided with valid degrees for longitued and latitude
function getWeather(key, coordinates) {
    requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + coordinates[0].toString() + "&lon="
        + coordinates[1].toString() + "&appid=" + key + "&units=imperial";

    fetch(requestUrl)
        .then(function (response) {
            console.log(response.status);
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        });


}

