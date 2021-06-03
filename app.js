const express = require("express");
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
     res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = "8d75ec3c68e2d795555cb8be47ad6e3f";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey + "&units="+unit;
    https.get(url,function(response){
       console.log(response.statusCode);

       response.on("data",function(data){
           const weatherData = JSON.parse(data);
           const value = weatherData.weather[0].description;
           const temp = weatherData.main.temp;
           const icon = weatherData.weather[0].icon;
           const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
           res.write("<h1>temperature in "+query +" is " + temp + " degree celcius</h1>");
           res.write("<p> weather description is "+ value + "</p>");
           res.write("<img src ="+ image + ">");
           res.send();
       })
   })
});

app.listen(3000,function(){
    console.log("server is running on port number 3000");
})