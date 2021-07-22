const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res) {
    var city = req.body.cityName;
    const apiKey = "ed473eec9e7cda8796a886abe63fc9fd";
    var unit = "metric";

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        response.on("data", function(data) {
            var weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var desc = weatherData.weather[0].description;
            var iconUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

            res.write("<h1>The temperature of " + city + " is " + temp + " degree celcius.</h1>");
            res.write("<h2>Weather Description: " + desc + "</h2>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
        });
    });
});

app.listen("3000", function() {
    console.log("Server is running at port 3000.");
});