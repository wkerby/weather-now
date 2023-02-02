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
            getWeather(myKey, data[0])
            // var lat = (Math.round(data[0]['lat'] * 100) / 100).toString();
            // var lon = (Math.round(data[0]['lon'] * 100) / 100).toString();
            console.log(lon);
        });
    return [lat, lon];

}

console.log(getLatLon(myKey, "Atlanta"));

//create function that returns JSON weather data when provided with valid degrees for longitued and latitude
function getWeather(key, weathData) {
    var { lat, lon, city } = weathData; //use weather
    // var lat = weathData.lat
    // var lon = weathData.lon;
    // var city = weathData.name;

    console.log(weathData);
    requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon="
        + lon + "&appid=" + key + "&units=imperial";

    fetch(requestUrl)
        .then(function (response) {
            console.log(response.status);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });


}

