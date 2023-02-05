//create variables for elements that will be targeted in document.body
var currentCityEl = $("#current-city");
var currentStateEl = $("#current-state");
var currentDateEl = $("#current-date");
var currentWeatherEl = $("#current-weather")
var currentTempEl = $("#current-temp");
var currentWindEl = $("#current-wind");
var currentHumidEl = $("#current-humidity");
var forecastCityEl = $("#forecast-city");
var forecastStateEl = $("#forecast-state");
var out1DateEl = $("#out-1-date");
var out1WeatherEl = $("#out-1-weather");
var out1TempEl = $("#out-1-temp");
var out1WindEl = $("#out-1-wind");
var out1HumidityEl = $("#out-1-humidity");
var out2DateEl = $("#out-2-date");
var out2WeatherEl = $("#out-2-weather");
var out2TempEl = $("#out-2-temp");
var out2WindEl = $("#out-2-wind");
var out2HumidityEl = $("#out-2-humidity");
var out3DateEl = $("#out-3-date");
var out3WeatherEl = $("#out-3-weather");
var out3TempEl = $("#out-3-temp");
var out3WindEl = $("#out-3-wind");
var out3HumidityEl = $("#out-3-humidity");
var out4DateEl = $("#out-4-date");
var out4WeatherEl = $("#out-4-weather");
var out4TempEl = $("#out-4-temp");
var out4WindEl = $("#out-4-wind");
var out4HumidityEl = $("#out-4-humidity");
var out5DateEl = $("#out-5-date");
var out5WeatherEl = $("#out-5-weather");
var out5TempEl = $("#out-5-temp");
var out5WindEl = $("#out-5-wind");
var out5HumidityEl = $("#out-5-humidity");
var forecastDates = [out1DateEl, out2DateEl, out3DateEl, out4DateEl, outDate5El];
var monthDays = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
}

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
            var currentDate = dateReturn(data.list[0].dt_txt.substring(0, 10).split("-"));
            var currentWeather = data.list[0].weather[0].main;
            var currentTemp = data.list[0].main.temp;
            var currentWind = data.list[0].wind.speed;
            var currentHumidity = data.list[0].main.humidity;
            currentCityEl.text(city);
            currentDateEl.text(currentDate);
            currentWeatherEl.text(currentWeather);
            currentTempEl.text(currentTemp);
            currentWindEl.text(currentWind);
            currentHumidEl.text(currentHumidity);

            forecastCityEl.text(city);
            postWeatherOut1(data);
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

//create a function places the forecasted weather from 1 day in advance on the page

function postWeatherOut1(data) {
    var currentMonth = parseInt(data.list[0].dt_txt.substring(0, 10).split("-")[1]);
    var currentDay = parseInt(data.list[0].dt_txt.substring(0, 10).split("-")[2]);
    var postDay = currentDay + 1;
    if (postDay > monthDays[currentMonth]) {
        postDay = postDay - monthDays[currentMonth];

    }

    for (var i = 0; i < data.list.length; i++) {
        if (parseInt(data.list[i].dt_txt.substring(0, 10).split("-")[2]) == postDay) {
            var out1Date = dateReturn(data.list[i].dt_txt.substring(0, 10).split("-"));
            var out1Weather = data.list[i].weather[0].main;
            var out1Temp = data.list[i].main.temp;
            var out1Wind = data.list[i].wind.speed;
            var out1Humidity = data.list[i].main.humidity
            break;
        }
    }

    console.log("Out 1 Forecast Date: " + out1Date);
    console.log("Out 1 Weather: " + out1Weather);
    console.log("Out 1 Temperature: " + out1Temp);
    console.log("Out 1 Wind: " + out1Wind);
    console.log("Out 1 Humidity: " + out1Humidity);

    out1DateEl.text(out1Date);
    out1WeatherEl.text(out1Weather);
    out1TempEl.text(out1Temp);
    out1WindEl.text(out1Wind);
    out1HumidityEl.text(out1Humidity);

}




