var MongoClient = require('mongodb').MongoClient;
var replicaSet = require("./variables");

MongoClient.connect(replicaSet.url, function(err, db) {
	if(!err) {
		var dbc = db.db(replicaSet.database).collection(replicaSet.collection);
		
		var asc = -1;
		var desc = 1;
		
		dbc.aggregate(
		  { $group: {_id: "$borough", crimesNumber: {$sum: "$value"}} },
		  { $sort: {crimesNumber: asc} },
		  { $limit: 5 }
		).toArray(function(err, result) {
			if (err) throw err;
			console.log("\nTop 5 crimes London Districts:");
			console.log("--------------------------------------------------------------------");
			for(let i=0; i<5; i++){ 
				console.log((i+1)+") Districts: "+result[i]._id+"\n   crimes comitted: "+ result[i].crimesNumber+"\n");
			}
		});
		
		dbc.aggregate(
		  { $group: {_id: {borough: "$borough", major_category: "$major_category"} , crimesNumber: {$sum: "$value"}} },
		  { $sort: {crimesNumber: asc} },
		  { $limit: 5 }
		).toArray(function(err, result) {
			if (err) throw err;
			console.log("\nTop 5 crimes London Districts by categories:");
			console.log("--------------------------------------------------------------------");
			for(let i=0; i<5; i++){ 
				console.log((i+1)+") Districts: "+result[i]._id.borough+"\n   category: "+ result[i]._id.major_category+"\n   crimes comitted: "+ result[i].crimesNumber+"\n");
			}
		});
		
		dbc.aggregate(
		  { $group: {_id: { year: "$year" } , crimesNumber: {$sum: "$value"}} },
		  { $sort: {crimesNumber: asc} },
		  { $limit: 9 }
		).toArray(function(err, result) {
			if (err) throw err;
			console.log("\nYears with the most crimes:");
			console.log("--------------------------------------------------------------------");
			for(let i=0; i<9; i++){ 
				console.log((i+1)+") Year: "+result[i]._id.year+"\t\tcrimes comitted: "+ result[i].crimesNumber);
			}
		});

  	
		db.close();
	}  
});
