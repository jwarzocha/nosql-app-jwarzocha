var MongoClient = require('mongodb').MongoClient;
var replicaSet = require("./variables");

MongoClient.connect(replicaSet.url, function(err, db) {
	if(!err) {
		var dbc = db.db(replicaSet.database).collection(replicaSet.collection);

		dbc.count({}, function(err, result) {
			if (err) throw err;
			console.log("\n\t\t\tNumber of records: "+result);
		});      
  
		dbc.findOne({}, function(err, result) {
			if (err) throw err;
			console.log("\n\t\t\tSample record:\n");
			console.log(result);
			console.log("\n\n");
		});
  	
		db.close();
	}  
});
