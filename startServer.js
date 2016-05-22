/*
 http://localhost:8080/
*/


//start server routing similar to what apache will do but it give you a socket io if you want to use later
var experimentServerRouting = require(__dirname + '/lib/experimentServerRouting.js');
experimentServerRouting.experimentServerRoutingInit(__dirname);
var io =experimentServerRouting.getSocketIo();



// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
    if(err) { return console.dir(err); }

    var collection = db.collection('test');
    var docs = [{mykey:1}, {mykey:2}, {mykey:3}];

    collection.insert(docs, {w:1}, function(err, result) {

        collection.find().toArray(function(err, items) {});

        var stream = collection.find({mykey:{$ne:2}}).stream();
        stream.on("data", function(item) {
            console.log("ddd:" + item["mykey"] )
        });
        stream.on("end", function() {});

        collection.findOne({mykey:1}, function(err, item) {
            console.log("item: " + item)
        });

    });
});








