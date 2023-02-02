//fetch weather data for Atlanta, GA
var myKey = "c55febd7847bed4a6181dc26dc5779cf";
var atlantaCoord = [33.75, -84.39];

//create function that returns latitued and logitude of an input city
function getLatLon(key, city) {
    var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + key;
    var lat = undefined;
    var lon = undefined;
    fetch(requestUrl)
        .then(function (response) {
            console.log(response.status)
            return response.json();
        })
        .then(function (data) {
            lat = data[0]['lat'];
            lon = data[0]['lon'];
            return [lat, lon];
        });
}

console.log(getLatLon(myKey, "London"));

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
            console.log(data);
        });


}

