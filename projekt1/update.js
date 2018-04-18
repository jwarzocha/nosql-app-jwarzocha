var MongoClient = require('mongodb').MongoClient;
var replicaSet = require("./variables");

MongoClient.connect(replicaSet.url, function(err, db) {
	if(!err) {
		var dbc = db.db(replicaSet.database).collection(replicaSet.collection);
		
		dbc.find({_id: "1234b"}).toArray(function(err, items) {
			if (err) throw err;
			console.log("\nBefore update: \n");			
			console.log(items);
		});
		
		dbc.update({_id:"1234b"}, {$set: {year: 2018, month: 2, major_category: 'GTA', minor_category: 'Grand Theft Auto'}});
		
		
		dbc.find({_id: "1234b"}).toArray(function(err, items) {
			if (err) throw err;
			console.log("\n\nAfter update: \n");			
			console.log(items);
			console.log("\n");		
		});
		  	
		db.close();
	}  
});
