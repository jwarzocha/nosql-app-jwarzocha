//npm install mongodb

var MongoClient = require('mongodb').MongoClient;
var replicaSet = require("./variables");
var dane = require("./dane");

MongoClient.connect(replicaSet.url, function(err, db) {
	if(!err) {
		var dbc = db.db(replicaSet.database).collection(replicaSet.collection);


///////////////////sample_and_record_count.js

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

///////////////////top_10_crimes_by_month_in_2016.js
/*
		var asc = -1;
		var desc = 1;
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];	
		dbc.find({year: 2016}).sort({ value: asc, month: desc}).limit(10).toArray(function(err, items) {
			if (err) throw err;			
			for(let i=0; i<10; i++){
				let string = (i+1) +")\tborough:\t\t\t\t"+items[i].borough + "\n\tmajor_category:\t\t\t\t"+items[i].major_category;
				string = string + "\n\tmajor_category:\t\t\t\t"+items[i].major_category + "\n\tnumber_occurences_in_month(value):\t"+items[i].value;
				string = string + "\n\tyear:\t\t\t\t\t"+items[i].year + "\n\tmonth:\t\t\t\t\t"+months[items[i].month -1];				
				console.log(string+"\n");
			}
		});
*/
///////////////Top 5 crimes London Districts:
/*		
		var asc = -1;
		var desc = 1;
		
		dbc.aggregate(
		  { $group: {_id: "$borough", crimesNumber: {$sum: "$value"}} },
		  { $sort: {crimesNumber: asc} },
		  { $limit: 10 }
		).toArray(function(err, result) {
			if (err) throw err;
			console.log("Top 5 crimes London Districts:");
			for(let i=0; i<5; i++){ 
				console.log((i+1)+") "+result[i]._id+"\t\tcrimes comitted: "+ result[i].crimesNumber);
			}
		});
*/		

///////////////  
/*
		var asc = -1;
		var desc = 1;
		
		dbc.aggregate(
		  { $group: {_id: {borough: "$borough", major_category: "$major_category"} , crimesNumber: {$sum: "$value"}} },
		  { $sort: {crimesNumber: asc} },
		  { $limit: 10 }
		).toArray(function(err, result) {
			if (err) throw err;
			console.log("Top 5 crimes London Districts:");
			for(let i=0; i<5; i++){ 
				//console.log((i+1)+") "+result[i]._id+"\t\tcrimes comitted: "+ result[i].crimesNumber);
			}
			console.log(result);
		});
		
		dbc.aggregate(
		  { $group: {_id: { year: "$year" } , crimesNumber: {$sum: "$value"}} },
		  { $sort: {crimesNumber: desc} },
		  { $limit: 10 }
		).toArray(function(err, result) {
			if (err) throw err;
			console.log("Top 5 crimes London Districts:");
			for(let i=0; i<5; i++){ 
				//console.log((i+1)+") "+result[i]._id+"\t\tcrimes comitted: "+ result[i].crimesNumber);
			}
			console.log(result);
		});
*/


/////////////// 
		dbc.insertMany(dane.dane, function(err, result) {
			if (err) throw err;
			console.log(result);
		});
     
		dbc.find({year: 2017}).toArray(function(err, items) {
			if (err) throw err;			
			console.log(items);
		});
		
		dbc.update({_id:"1234b"}, {$set: {month: 2}});
		
		dbc.find({year: 2017}).toArray(function(err, items) {
			if (err) throw err;			
			console.log(items);
		});
		
		dbc.deleteMany({year: 2017}, function(err, obj) {
			if (err) throw err;
			//console.log(obj)
			console.log("1 document deleted");
		});
  	
		db.close();
	}  
});
