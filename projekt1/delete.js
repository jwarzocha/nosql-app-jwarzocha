var MongoClient = require('mongodb').MongoClient;
var replicaSet = require("./variables");


MongoClient.connect(replicaSet.url, function(err, db) {
	if(!err) {
		var dbc = db.db(replicaSet.database).collection(replicaSet.collection);
		
		dbc.deleteMany({year: 2017,year: 2018}, function(err, obj) {
			if (err) throw err;
			console.log("\ndelete success\n");
		});
  	
		db.close();
	}  
});
