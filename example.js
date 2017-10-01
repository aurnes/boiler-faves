var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://boileradmin:defenders@boiler0-shard-00-00-oe8zu.mongodb.net:27017,boiler0-shard-00-01-oe8zu.mongodb.net:27017,boiler0-shard-00-02-oe8zu.mongodb.net:27017/test?ssl=true&replicaSet=Boiler0-shard-0&authSource=admin"
MongoClient.connect(uri, function(err, db){
  if (err) {console.error(err); }

  var doc = {phone: "3147040611", provider: "vtext.com", faves: ["Bacon", "Thincut Fries"]}
  db.collection('boilers').update({phone: "3147040611"}, doc, {upsert: true})
.then(function(result) {
  // process result
})

  var cursor = db.collection('boilers').find({faves: "Thincut Fries"}).toArray( function(err, result){
    if (err) {console.error(err);}
    console.log(result);
  });


  db.close();





});
