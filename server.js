var express = require('express');
var bodyParser = require('body-parser');
var sampleData = require('./data/sampleData.js');
var helper = require('./helper/helper.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//load static files
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/node_modules`));

var port = process.env.PORT || 3000;

app.post('/filter_locations', function(req, res) {
  var lat = Number(req.body.lat);
  var lng = Number(req.body.lng);
  var radius = Number(req.body.radius || 60);
  console.log("user's input", lat, lng, radius);

  var systemLat;
  var systemLng;
  var filteredData = {};

  for (var i = 0; i < sampleData.length; i++) {
    for (var j = 0; j < sampleData[i].addresses.length; j++) {
      systemLat = sampleData[i].addresses[j].lat;
      systemLng = sampleData[i].addresses[j].lng;

      if (helper.distanceInMilesBetweenEarthCoordinates(lat, lng, systemLat, systemLng) <= radius) {
        if (!filteredData[sampleData[i].npi]) {
          var current = sampleData[i];
          current.filteredAddress = [sampleData[i].addresses[j]];
          filteredData[sampleData[i].npi] = current;
        } else {
          filteredData[sampleData[i].npi].filteredAddress.push(sampleData[i].addresses[j]);
        }
      }

    }
  }

  res.send(200, filteredData);
});

app.listen(port);

console.log('Server listening on port ' + port);
