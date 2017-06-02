var express=require("express");
var schema=require("./domain/schema.js");
//var bodyparser=require("body-parser");
var app=express();



var cabs = [{
    id: 1,
    driverName: "Kishore",
    driverNumber: "9898987562",
    location: {
      lattitude: 10,
      longitude: 20
    },
    isBooked: false,
    color: "WHITE"
  },{
    id: 2,
    driverName: "Ravikumar",
    driverNumber: "9807654678",
    location: {
      lattitude: 40,
      longitude: 50
    },
    isBooked: false,
    color: "PINK"
  },{
    id: 3,
    driverName: "Akshay",
    driverNumber: "9087678908",
    location: {
      lattitude: 60,
      longitude: 20
    },
    isBooked: false,
    color: "PINK"
  },{
    id: 4,
    driverName: "Kiran",
    driverNumber: "9087989087",
    location: {
      lattitude: 90,
      longitude: 20
    },
    isBooked: false,
    color: "WHITE"
  }];


app.get('/', function(req, res, next) 
{
  res.send('Book a Taxi');
});

app.get('/book', function(req, res) {
  if (req.query.lattitude && req.query.longitude && !isNaN(req.query.lattitude) && !isNaN(req.query.longitude))
   {
    var lattitude = parseInt(req.query.lattitude);
    var longitude = parseInt(req.query.longitude);
    
    var userLocation = {
      lattitude: lattitude,
      longitude: longitude
    };
    var color = req.query.color || null;
    var cab = getClosestCab(userLocation, color);
    if (cab) {
      cab.isBooked = true;
      res.json({
        message: "Cab booked!",
        cabID: cab.id,
        driverName: cab.driverName,
        driverNumber: cab.driverNumber,
        location: cab.location
      });
    } else {
       res.json({
         message: "No cabs available!"
       });
    }

  } else {
    res.json({
      message: "Invalid/Missing parameters"
    });
  }
});
app.get('/complete', function(req, res, next) {
  if (req.query.id && !isNaN(req.query.id) && req.query.lattitude && req.query.longitude && !isNaN(req.query.lattitude) && !isNaN(req.query.longitude)) {
    var cabID = parseInt(req.query.id);
    var lattitude = parseInt(req.query.lattitude);
    var longitude = parseInt(req.query.longitude);
    var location = {
      lattitude: lattitude,
      longitude: longitude
    };
    var userCab = null;
    cabs.forEach(function(cab) {
      if (cabID === cab.id) {
        userCab = cab;
      }
    });
    if (userCab) {
      if (userCab.isBooked) {
        userCab.isBooked = false;
        var distance = getDistance(userCab.location, location);
        userCab.location = location;
        res.json({
          message: "Ride completed!",
          distance: distance
        })
      } else {
        res.json({
          message: "Can't complete ride for a cab which is not booked!"
        });
      }
    } else {
      res.json({
        message: "Could not find cab with id " + cabID
      });
    }
  } else {
    res.json({
      message: "Invalid/Missing parameters"
    });
  }
});




app.get('/showall', function(req, res, next) {
  res.json({
    cabs: cabs
  });
});

function getDistance(location1, location2) {
  var a = location1.lattitude - location2.lattitude;
  var b = location1.longitude - location2.longitude;
  var c = Math.sqrt(a*a + b*b);
  return c;
}

function getClosestCab (location, color) {
  var closest = null;
  var closestDistance = Infinity;
  cabs.forEach(function(cab) {
    if (!cab.isBooked) {
      if (color) {
        if (color.toUpperCase() === cab.color) {
          var distance = getDistance(cab.location, location);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = cab;
          }
        }
      } else {
        var distance = getDistance(cab.location, location);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = cab;
        }
      }

    }
  });
  return closest;
}



app.listen(3000,function(){
	console.log("server is running");
});