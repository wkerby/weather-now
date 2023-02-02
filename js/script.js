//fetch weather data for Atlanta, GA
myKey = "c55febd7847bed4a6181dc26dc5779cf";
atlantaCoord = [44.34, 10.99];

function getApi(key, coordinates) {
    requestUrl = "api.openweathermap.org/data/2.5/forecast?lat=" + coordinates[1].toString() + "&lon="
        + coordinates[0].toString() + "&appid=" + key;

    // requestUrl = "api.openweathermap.org/data/2.5/forecast?lat=33.75&lon=84.39&appid=c55febd7847bed4a6181dc26dc5779cf"

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })


}

getApi(myKey, atlantaCoord);

