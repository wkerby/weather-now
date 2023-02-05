//create variables for elements that will be targeted in document.body
var currentCityEl = $("#current-city");
var currentStateEl = $("#current-state");
var currentDateEl = $("#current-date");
var currentTempEl = $("#current-temp");
var currentWindEl = $("#current-wind");
var currentHumidEl = $("#current-humidity");
var forecastCityEl = $("#forecast-city");
var forecastStateEl = $("#forecast-state");
var out1Date = $("#out-1-date");
var out1Weather = $("#out-1-weather");
var out1Temp = $("#out-1-temp");
var out1Wind = $("#out-1-wind");
var out1Humidity = $("#out-1-humidity");
var out2Date = $("#out-2-date");
var out2Weather = $("#out-2-weather");
var out2Temp = $("#out-2-temp");
var out2Wind = $("#out-2-wind");
var out2Humidity = $("#out-2-humidity");
var out3Date = $("#out-3-date");
var out3Weather = $("#out-3-weather");
var out3Temp = $("#out-3-temp");
var out3Wind = $("#out-3-wind");
var out3Humidity = $("#out-3-humidity");
var out4Date = $("#out-4-date");
var out4Weather = $("#out-4-weather");
var out4Temp = $("#out-4-temp");
var out4Wind = $("#out-4-wind");
var out4Humidity = $("#out-4-humidity");
var out5Date = $("#out-5-date");
var out5Weather = $("#out-5-weather");
var out5Temp = $("#out-5-temp");
var out5Wind = $("#out-5-wind");
var out5Humidity = $("#out-5-humidity");

console.log("test");

//fetch weather data for Atlanta, GA
var myKey = "c55febd7847bed4a6181dc26dc5779cf";
var atlantaCoord = [33.75, -84.39];

//create function that returns latitued and logitude of an input city
function getLatLon(key, city) {
    var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + key;
    // var lat = undefined;
    // var lon = undefined;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var state = data[0].state;
            currentStateEl.text(state);
            forecastStateEl.text(state);

            getWeather(myKey, data[0]) //assuming that we want the most populous city in the event that there are multiple cities in US with the same name
            // var lat = (Math.round(data[0]['lat'] * 100) / 100).toString();
            // var lon = (Math.round(data[0]['lon'] * 100) / 100).toString();
        });

}

console.log(getLatLon(myKey, "Atlanta"));

//create function that returns JSON weather data when provided with valid degrees for longitued and latitude
function getWeather(key, weathData) { //parameter passed in getWeather is the object that is returned from getLatLon
    var { lat, lon, city } = weathData; //use weather
    var lat = weathData.lat; //round to two decimal places
    var lon = weathData.lon; //round to two decimal places
    // var city = weathData.name; do I need city if I am passing as a parameter in getLatLon

    // console.log(weathData);
    requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon="
        + lon + "&appid=" + key + "&units=imperial";

    fetch(requestUrl)
        .then(function (response) {
            console.log(response.status);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log("Forecast for: " + data.list[0].dt_txt);
            console.log("Temperature: " + data.list[0].main.temp);
            var city = data.city.name;
            var current_date = dateReturn(data.list[0].dt_txt.substring(0, 10).split("-"));
            var current_temp = data.list[0].main.temp;
            var current_wind = data.list[0].wind.speed;
            var current_humidity = data.list[0].main.humidity;
            currentCityEl.text(city);
            currentDateEl.text(current_date);
            currentTempEl.text(current_temp);
            currentWindEl.text(current_wind);
            currentHumidEl.text(current_humidity);

            forecastCityEl.text(city);
            postWeatherOut(data, 2);
            // var out1Date = 




        });








}

//create a function to format date from [YYYY,MM,DD] to DD/MM/YYYY
function dateReturn(dateList) {
    var dateStr = ["", "", ""];

    for (var i = 0; i < dateList.length; i++) {
        if (i == 0) {
            dateStr[2] = dateList[i];
        }

        else {
            if (dateList[i] > 1) {
                dateStr[i - 1] = dateList[i][1];
            }
            else {
                dateStr[i - 1] = dateList[i];
            }
        }
    }

    return dateStr.join("/")


}

//create a function that provides

function postWeatherOut(data, numDays) {
    var currentMonth = parseInt(data.list[0].dt_txt.substring(0, 10).split("-")[1]);
    var currentDay = parseInt(data.list[0].dt_txt.substring(0, 10).split("-")[2]);
    var postDay = currentDay + numDays;
    console.log(postDay);
    // var city = data.city.name;
    // var current_date = dateReturn(data.list[0].dt_txt.substring(0, 10).split("-"));
    // var current_temp = data.list[0].main.temp;
    // var current_wind = data.list[0].wind.speed;
    // var current_humidity = data.list[0].main.humidity;
    // currentCityEl.text(city);
    // currentDateEl.text(current_date);
    // currentTempEl.text(current_temp);
    // currentWindEl.text(current_wind);
    // currentHumidEl.text(current_humidity);




}

