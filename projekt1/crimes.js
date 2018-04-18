var MongoClient = require('mongodb').MongoClient;
var replicaSet = require("./variables");

MongoClient.connect(replicaSet.url, function(err, db) {
	if(!err) {
		var dbc = db.db(replicaSet.database).collection(replicaSet.collection);
		
		var asc = -1;
		var desc = 1;
/*		
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
*/		
		dbc.aggregate(
		  { $group: {_id: { minor_category: "$major_category", borough: "$borough"} , crimesNumber: {$sum: "$value"}} },
		  { $sort: {crimesNumber: asc} },
		  { $limit: 5 }
		).toArray(function(err, result) {
			if (err) throw err;
			console.log("\nAll crimes count and top 5 London Districts in which they occure most often:");
			console.log("--------------------------------------------------------------------");
			for(let j=0; j<result.length; j++){ 
				//console.log((j+1)+") Crimes category: "+ result[j]._id.minor_category+"\n   total: "+ result[j].crimesNumber+"\n");
				console.log(result);
				/* var Obj = {minor_category: result[j]._id.minor_category};
				dbc.find(Obj).sort({ value: asc}).limit(5).toArray(function(err, items) {
					if (err) throw err;
					else{			
						for(let i=0; i<5; i++){
							/*let string = (i+1) +")\tborough:\t\t\t\t"+items[i].borough + "\n\tmajor_category:\t\t\t\t"+items[i].major_category;
							string = string + "\n\tmajor_category:\t\t\t\t"+items[i].major_category + "\n\tnumber_occurences_in_month(value):\t"+items[i].value;
							string = string + "\n\tyear:\t\t\t\t\t"+items[i].year + "\n\tmonth:\t\t\t\t\t"+months[items[i].month -1];				
							console.log(string+"\n");
							console.log("\t\t"+(i+1) +")\tborough:\t\t\t\t"+items[i].borough +"\n");
						}
					}
				});*/
				
			}
		});
/*		
		dbc.aggregate(
		  { $group: {_id: { year: "$year" } , crimesNumber: {$sum: "$value"}} },
		  { $sort: {crimesNumber: asc} },
		  { $limit: 8 }
		).toArray(function(err, result) {
			if (err) throw err;
			console.log("\nYears with the most crimes:");
			console.log("--------------------------------------------------------------------");
			for(let i=0; i<8; i++){ 
				console.log((i+1)+") Year: "+result[i]._id.year+"\t\tcrimes comitted: "+ result[i].crimesNumber);
			}
		});
*/
  	
		db.close();
	}  
});
