var mailer = require('./sendEmail.js');
var dining = require('./diningAPI.js');
var https = require('https');
var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyAGKKmJCm9wchBPEUizbdxlCoxI18ibV84",
    authDomain: "boiler-faves.firebaseapp.com",
    databaseURL: "https://boiler-faves.firebaseio.com",
    projectId: "boiler-faves",
    storageBucket: "boiler-faves.appspot.com",
    messagingSenderId: "93674517189"
  };
  firebase.initializeApp(config);


var diningCourts = ["Earhart", "Ford", "Hillenbrand", "Wiley", "Windsor"];

var today = new Date();

var date = (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();

console.log(date);

//Loop through dining courts, send text if favorite food is found
for(var i = 0; i<diningCourts.length; i++){

    var url = 'https://api.hfs.purdue.edu/menus/v1/locations/' + diningCourts[i] + '/' + date;

    var boundCallback = callback.bind(null, diningCourts[i]);
    var req = https.get(url, boundCallback);
}

function sendAtTime(phone, message, provider, hour){
    var releaseTime = new Date();
    releaseTime.setHours(23, 0, 0, 0);
    var wait = releaseTime.getTime() - new Date().getTime();

    setTimeout(function(){
        mailer.mail(phone, message, provider);
    }, wait)
}

function scanMenu(menu, meal, court){
    for(var i = 0; i<menu.length; i+=1){
        var items = menu[i].Items;
        findUsers(items, meal, court)
    }
}

function callback(court, res){
    var json = '';

    res.on('data', function(chunk){
        json += chunk;
    });

    res.on('end', () => {

        menu = JSON.parse(json);


        var breakfast = menu.Breakfast;
        var lunch = menu.Lunch;
        var dinner = menu.Dinner;

        if(breakfast){
            scanMenu(breakfast, "breakfast", court);
        }

        if(lunch){
            scanMenu(lunch, "lunch", court);
        }

        if(dinner){
            scanMenu(dinner, "dinner", court);
        }

    });

}

function findUsers(items, meal, court){
  var favs = [];
  for(var i=0; i<items.length; i+=1){
    favs[i]=items[i].Name;

    var it = favs[i];

    firebase.database().ref().orderByChild("fave").equalTo(it).on("child_added", handlefb(it, meal, court) );

}
}


function handlefb(fav, meal, court){
    return function(snapshot) {
        var message = court + " Dining Court has " + fav + " for " + meal + " today!";
        console.log(message);
          //sendAtTime(result[m].phone, message, result[m].provider);
          //mailer.mail(snapshot.val().number, message, snapshot.val().carrier);
          firebase.database().goOffline();
      }



}
