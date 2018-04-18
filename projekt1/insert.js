var MongoClient = require('mongodb').MongoClient;
var replicaSet = require("./variables");
//var dane = require("./data.js");
var file = process.argv[2];

MongoClient.connect(replicaSet.url, function(err, db) {
	if(!err) {
		var dbc = db.db(replicaSet.database).collection(replicaSet.collection);
		if(file == undefined) console.log("\nPlease pass data path file!!!\n")
		else{
			var data = require(file);
			dbc.insertMany(data.data, function(err, result) {
				if (err) throw err;
				console.log("\ninsert success\n");
				console.log(result.insertedIds);
			});
		}
  	
		db.close();
	}  
});
